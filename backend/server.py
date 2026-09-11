import os
import sys
import re
from typing import Any, Dict, List, Set
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# Ensure backend and code directories are in Python path
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
CODE_DIR = os.path.join(BACKEND_DIR, "code")

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if CODE_DIR not in sys.path:
    sys.path.insert(0, CODE_DIR)

os.chdir(BACKEND_DIR)

try:
    from preprocess import load_and_preprocess_data
    from search import SchemeSearch
except ImportError:
    try:
        from code.preprocess import load_and_preprocess_data
        from code.search import SchemeSearch
    except ImportError:
        from backend.code.preprocess import load_and_preprocess_data
        from backend.code.search import SchemeSearch

app = Flask(__name__)
CORS(app)

print("Starting Government Scheme Retrieval API Server...")
print("Loading dataset and fitting TF-IDF vectorizer...")

# Global dataset and retrieval engine
data: pd.DataFrame = load_and_preprocess_data()
search_engine: SchemeSearch = SchemeSearch(data)

print(f"Retrieval Engine Ready! Indexed {len(data)} unique government schemes.")


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Government Scheme Retrieval API",
        "schemes_indexed": int(len(data))
    })


@app.route("/api/search", methods=["GET"])
def search():
    query_param = request.args.get("q", "")
    query = str(query_param).strip() if query_param else ""
    query_lower = query.lower()
    query_tokens = [t for t in re.split(r"\s+", query_lower) if len(t) > 1]

    top_k_param = request.args.get("top_k")
    if top_k_param:
        try:
            top_k = int(top_k_param)
        except (ValueError, TypeError):
            top_k = len(data)
    else:
        top_k = len(data)

    if not query:
        sample_df: pd.DataFrame = data.head(top_k).copy()
        sample_df["score"] = 0.85
        results_df: pd.DataFrame = sample_df
    else:
        # Retrieve ranked matches using TF-IDF + Cosine Similarity
        full_results = search_engine.search(query, top_k=min(top_k, len(data)))
        
        # Include schemes with positive similarity score
        matching_mask = full_results["score"] > 0.001
        if matching_mask.any():
            results_df = full_results[matching_mask].copy()
        else:
            results_df = full_results.head(15).copy()

    # Clean NaN values
    cleaned_df: pd.DataFrame = results_df.fillna("")

    results: List[Dict[str, Any]] = []
    seen_ids: Set[str] = set()
    
    for _, row in cleaned_df.iterrows():
        row_dict: Dict[str, Any] = dict(row)
        scheme_name = str(row_dict.get("scheme_name", "")).strip()
        slug = str(row_dict.get("slug", scheme_name)).strip()
        
        # Deduplication check for unique schemes
        dedup_key = (slug or scheme_name).lower()
        if dedup_key in seen_ids or not scheme_name:
            continue
        seen_ids.add(dedup_key)

        raw_score = float(row_dict.get("score", 0.0))
        name_lower = scheme_name.lower()
        tags_lower = str(row_dict.get("tags", "")).lower()

        # Check for exact token presence in title or primary tags
        exact_title_match = any(token in name_lower for token in query_tokens) if query_tokens else False
        exact_tag_match = any(token in tags_lower for token in query_tokens) if query_tokens else False
        
        # Compute intuitive relevance percentage
        if not query:
            match_percentage = 85
            match_type = "Latest"
        elif exact_title_match:
            match_percentage = max(88, min(99, int(round(75 + raw_score * 40))))
            match_type = "Exact Match"
        elif exact_tag_match or raw_score >= 0.20:
            match_percentage = max(75, min(92, int(round(65 + raw_score * 35))))
            match_type = "Highly Similar"
        elif raw_score >= 0.08:
            match_percentage = max(60, min(74, int(round(50 + raw_score * 30))))
            match_type = "Related Scheme"
        else:
            match_percentage = max(45, min(59, int(round(40 + raw_score * 25))))
            match_type = "Approximate Match"

        details = str(row_dict.get("details", ""))
        eligibility = str(row_dict.get("eligibility", ""))
        benefits = str(row_dict.get("benefits", ""))
        application = str(row_dict.get("application", ""))
        documents = str(row_dict.get("documents", ""))
        level = str(row_dict.get("level", "Central Government"))
        category = str(row_dict.get("schemeCategory", "Social Welfare")).strip() or "Social Welfare"
        tags_list = [t.strip() for t in str(row_dict.get("tags", "")).split(",") if t.strip()]

        is_central = level.lower() == "central" or "central" in level.lower()
        offered_by = "Central Government" if is_central else "State Government"
        state_name = "All India" if is_central else "State Specific"

        # Parse application steps
        if "Step" in application:
            app_steps = [
                {
                    "step": idx + 1,
                    "title": f"Step {idx + 1}",
                    "desc": step_text.strip()
                }
                for idx, step_text in enumerate(application.split("Step "))
                if step_text.strip()
            ]
        else:
            app_steps = [
                {
                    "step": 1,
                    "title": "Online Registration",
                    "desc": application if application else "Visit the official portal or nearest CSC Center to apply."
                }
            ]

        # Parse eligibility
        eligibility_items = [e.strip() for e in eligibility.split(". ") if e.strip()]
        if not eligibility_items:
            eligibility_items = ["Open to eligible citizens meeting prescribed guidelines."]

        # Parse benefits
        benefits_items = [b.strip() for b in benefits.split(". ") if b.strip()]
        if not benefits_items:
            benefits_items = ["Financial subsidy and government assistance provided directly to beneficiary."]

        # Parse documents
        doc_items = [d.strip() for d in documents.split("  ") if d.strip()]
        if not doc_items:
            doc_items = ["Aadhaar Card", "Identity Proof", "Residence Certificate", "Bank Passbook"]

        scheme_obj: Dict[str, Any] = {
            "id": slug if slug else f"scheme-{len(results)}",
            "name": scheme_name,
            "category": category,
            "matchScore": match_percentage,
            "score": match_percentage,
            "matchType": match_type,
            "shortDescription": details[:200] + ("..." if len(details) > 200 else ""),
            "fullDescription": details,
            "department": f"{level} Scheme",
            "offeredBy": offered_by,
            "officialWebsite": "https://www.myscheme.gov.in",
            "state": state_name,
            "targetBeneficiaries": eligibility[:120] if eligibility else "Citizens",
            "familyIncomeLimit": "As per scheme criteria",
            "applicationMode": "Online / CSC Portal",
            "lastDateToApply": "Active enrollment",
            "quickSummary": {
                "eligibility": eligibility[:80] if eligibility else "Eligible citizens",
                "benefits": benefits[:80] if benefits else "Financial / welfare support",
                "incomeLimit": "Income criteria applies",
                "level": f"{level.capitalize()} Government" if level else "Central Government"
            },
            "overview": {
                "intro": details,
                "highlights": [
                    "Direct benefit transfer or government welfare provision",
                    "Official indexed scheme under national repository"
                ]
            },
            "eligibilityDetails": eligibility_items,
            "benefitsDetails": benefits_items,
            "applicationProcess": app_steps,
            "documentsRequired": doc_items,
            "tags": tags_list
        }
        results.append(scheme_obj)

    # Sort results with Exact and Highest matches first
    results.sort(key=lambda x: x["score"], reverse=True)

    # Summary counts
    exact_count = sum(1 for r in results if r["matchType"] == "Exact Match")
    similar_count = sum(1 for r in results if r["matchType"] == "Highly Similar")
    related_count = sum(1 for r in results if r["matchType"] == "Related Scheme")
    approx_count = sum(1 for r in results if r["matchType"] == "Approximate Match")

    return jsonify({
        "query": query,
        "count": len(results),
        "exact_count": exact_count,
        "similar_count": similar_count,
        "related_count": related_count,
        "approx_count": approx_count,
        "results": results
    })


if __name__ == "__main__":
    # Listen on all network interfaces (0.0.0.0) on port 5000
    app.run(host="0.0.0.0", port=5000, debug=False)
