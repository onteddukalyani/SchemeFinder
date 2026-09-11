import os
import sys
from typing import Any, Dict, List
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

# Global instances initialized at startup
data: pd.DataFrame = load_and_preprocess_data()
search_engine: SchemeSearch = SchemeSearch(data)

print(f"Retrieval Engine Ready! Indexed {len(data)} government schemes.")


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
        # Retrieve all ranked matching results using the search engine
        full_results = search_engine.search(query, top_k=min(top_k, len(data)))
        # Filter to all schemes that have positive relevance score
        matching_mask = full_results["score"] > 0.001
        if matching_mask.any():
            results_df = full_results[matching_mask].copy()
        else:
            results_df = full_results.head(10).copy()

    # Clean NaN values for JSON output
    cleaned_df: pd.DataFrame = results_df.fillna("")

    results: List[Dict[str, Any]] = []
    
    for _, row in cleaned_df.iterrows():
        row_dict: Dict[str, Any] = dict(row)
        score_val = float(row_dict.get("score", 0.0))
        match_percentage = max(10, min(99, int(round(score_val * 100))))
        
        # Scale gracefully for positive matching
        if score_val > 0.05 and match_percentage < 50:
            match_percentage = min(95, int(50 + score_val * 100))

        scheme_name = str(row_dict.get("scheme_name", "")).strip()
        slug = str(row_dict.get("slug", scheme_name))
        details = str(row_dict.get("details", ""))
        eligibility = str(row_dict.get("eligibility", ""))
        benefits = str(row_dict.get("benefits", ""))
        application = str(row_dict.get("application", ""))
        documents = str(row_dict.get("documents", ""))
        level = str(row_dict.get("level", "Central Government"))
        category = str(row_dict.get("schemeCategory", "Social Welfare")).strip() or "Social Welfare"
        tags = str(row_dict.get("tags", ""))

        is_central = level.lower() == "central" or "central" in level.lower()
        offered_by = "Central Government" if is_central else "State Government"
        state_name = "All India" if is_central else "State Specific"

        # Parse step-by-step application instructions
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

        # Parse eligibility list
        eligibility_items = [e.strip() for e in eligibility.split(". ") if e.strip()]
        if not eligibility_items:
            eligibility_items = ["Open to eligible citizens meeting prescribed guidelines."]

        # Parse benefits list
        benefits_items = [b.strip() for b in benefits.split(". ") if b.strip()]
        if not benefits_items:
            benefits_items = ["Financial subsidy and government assistance provided directly to beneficiary."]

        # Parse required documents
        doc_items = [d.strip() for d in documents.split("  ") if d.strip()]
        if not doc_items:
            doc_items = ["Aadhaar Card", "Identity Proof", "Residence Certificate", "Bank Passbook"]

        scheme_obj: Dict[str, Any] = {
            "id": slug,
            "name": scheme_name,
            "category": category,
            "matchScore": match_percentage,
            "score": match_percentage,
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
            "tags": [t.strip() for t in tags.split(",") if t.strip()]
        }
        results.append(scheme_obj)

    return jsonify({
        "query": query,
        "count": len(results),
        "results": results
    })


if __name__ == "__main__":
    # Listen on all network interfaces (0.0.0.0) on port 5000
    app.run(host="0.0.0.0", port=5000, debug=False)
