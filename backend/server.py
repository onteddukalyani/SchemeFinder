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
print("Loading dataset and fitting TF-IDF vectorizer from backend/dataset/updated_data.csv...")

# Global dataset and retrieval engine
data: pd.DataFrame = load_and_preprocess_data()
search_engine: SchemeSearch = SchemeSearch(data)

print(f"Retrieval Engine Ready! Indexed {len(data)} unique government schemes from dataset/updated_data.csv.")


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Government Scheme Retrieval API",
        "schemes_indexed": int(len(data)),
        "dataset_source": "backend/dataset/updated_data.csv"
    })


@app.route("/api/schemes", methods=["GET"])
def get_all_schemes():
    """Endpoint returning all schemes for discovery and category browsing."""
    cleaned_df: pd.DataFrame = data.fillna("")
    results: List[Dict[str, Any]] = []
    
    for _, row in cleaned_df.iterrows():
        row_dict: Dict[str, Any] = dict(row)
        name = str(row_dict.get("scheme_name", "")).strip()
        if not name:
            continue
        results.append(format_scheme_row(row_dict, score=0.85, query_tokens=[]))
    
    return jsonify({
        "total": len(results),
        "results": results
    })


def format_scheme_row(row_dict: Dict[str, Any], score: float, query_tokens: List[str]) -> Dict[str, Any]:
    scheme_name = str(row_dict.get("scheme_name", "")).strip()
    slug = str(row_dict.get("slug", scheme_name)).strip()
    
    raw_score = float(score)
    name_lower = scheme_name.lower()
    tags_lower = str(row_dict.get("tags", "")).lower()
    details_lower = str(row_dict.get("details", "")).lower()

    # Check for exact token presence in title or primary tags
    exact_title_match = all(token in name_lower for token in query_tokens) if query_tokens else False
    partial_title_match = any(token in name_lower for token in query_tokens) if query_tokens else False
    exact_tag_match = any(token in tags_lower for token in query_tokens) if query_tokens else False
    
    # Compute intuitive relevance percentage
    if not query_tokens:
        match_percentage = 85
        match_type = "Latest"
    elif exact_title_match:
        match_percentage = max(92, min(99, int(round(80 + raw_score * 35))))
        match_type = "Exact Match"
    elif partial_title_match or exact_tag_match or raw_score >= 0.20:
        match_percentage = max(75, min(91, int(round(65 + raw_score * 35))))
        match_type = "Highly Similar"
    elif raw_score >= 0.05 or any(t in details_lower for t in query_tokens):
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

    # Category key determination
    cat_check = f"{category} {scheme_name} {tags_lower}".lower()
    if any(k in cat_check for k in ["student", "education", "scholarship", "matric", "college", "school"]):
        category_key = "Students"
    elif any(k in cat_check for k in ["farmer", "kisan", "agri", "crop", "fisherman", "fisheries"]):
        category_key = "Farmers"
    elif any(k in cat_check for k in ["women", "girl", "mahila", "mother", "widow", "maternity", "shakti"]):
        category_key = "Women"
    elif any(k in cat_check for k in ["unemploy", "skill", "job", "labor", "shram", "startup", "powerloom"]):
        category_key = "Unemployed"
    elif any(k in cat_check for k in ["senior", "pension", "elder", "old age"]):
        category_key = "Senior Citizens"
    else:
        category_key = "Social Welfare"

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
        app_pts = [p.strip() for p in re.split(r"[\n\r•\*\;\–\-]+|\d+\.\s*", application) if len(p.strip()) > 5]
        if app_pts:
            app_steps = [{"step": i + 1, "title": f"Step {i + 1}", "desc": p} for i, p in enumerate(app_pts[:6])]
        else:
            app_steps = [
                {
                    "step": 1,
                    "title": "Online Registration",
                    "desc": application if application else "Visit the official portal or nearest CSC Center to apply."
                }
            ]

    # Parse eligibility
    eligibility_items = [e.strip() for e in re.split(r"[\n\r•\*\;\–\-]+|\d+\.\s*", eligibility) if len(e.strip()) > 5]
    if not eligibility_items:
        eligibility_items = ["Open to eligible Indian citizens meeting prescribed category norms."]

    # Parse benefits
    benefits_items = [b.strip() for b in re.split(r"[\n\r•\*\;\–\-]+|\d+\.\s*", benefits) if len(b.strip()) > 5]
    if not benefits_items:
        benefits_items = ["Financial subsidy, support grant, or direct welfare assistance provided to eligible applicant."]

    # Parse documents
    doc_items = [d.strip() for d in re.split(r"[\n\r•\*\;\–\-,]+|\d+\.\s*", documents) if len(d.strip()) > 3]
    if not doc_items:
        doc_items = [
            "Aadhaar Card / Government Photo ID",
            "Proof of Residence / Domicile Certificate",
            "Bank Account Passbook / Statement",
            "Category or Income Certificate (if applicable)"
        ]

    # Quick overview bullets
    overview_bullets = [b.strip() for b in re.split(r"[\n\r•\*\;\–\-]+|\d+\.\s*", details) if len(b.strip()) > 8][:4]
    if not overview_bullets:
        overview_bullets = [
            f"Government scheme initiated by {offered_by}.",
            f"Category: {category}",
            "Direct beneficiary assistance and citizen empowerment."
        ]

    return {
        "id": slug or re.sub(r'[^a-z0-9]+', '-', scheme_name.lower()),
        "name": scheme_name,
        "category": category,
        "categoryKey": category_key,
        "score": match_percentage,
        "rawScore": round(raw_score, 4),
        "matchType": match_type,
        "shortDescription": details[:220] + "..." if len(details) > 220 else (details or f"Government assistance initiative: {scheme_name}"),
        "fullDescription": details or scheme_name,
        "department": category,
        "ministry": f"Ministry / Department of {category}",
        "offeredBy": offered_by,
        "officialWebsite": "https://www.myscheme.gov.in",
        "state": state_name,
        "targetBeneficiaries": ", ".join(tags_list[:3]) if tags_list else category,
        "familyIncomeLimit": "As per scheme criteria",
        "incomeRange": "all",
        "ageGroup": "All eligible age groups",
        "beneficiaryType": category_key,
        "applicationMode": "Online / CSC Centers",
        "lastDateToApply": "Active & Ongoing",
        "quickSummary": {
            "eligibility": eligibility[:100] + "..." if len(eligibility) > 100 else (eligibility or "Eligible Citizens"),
            "benefits": benefits[:100] + "..." if len(benefits) > 100 else (benefits or "Direct Government Assistance"),
            "incomeLimit": "As per scheme norms",
            "level": level
        },
        "overview": {
            "intro": details or f"The {scheme_name} is a vital government initiative offering comprehensive support to beneficiaries.",
            "highlights": overview_bullets
        },
        "eligibilityDetails": eligibility_items,
        "benefitsDetails": benefits_items,
        "applicationProcess": app_steps,
        "documentsRequired": doc_items,
        "tags": tags_list if tags_list else [category, category_key, "Government Scheme"]
    }


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
        # Return all schemes from the 3,400 dataset
        sample_df: pd.DataFrame = data.head(top_k).copy()
        sample_df["score"] = 0.85
        results_df: pd.DataFrame = sample_df
    else:
        # Retrieve ranked matches using TF-IDF + Cosine Similarity
        full_results = search_engine.search(query, top_k=min(top_k, len(data)))
        
        # Include schemes with positive similarity score
        matching_mask = full_results["score"] > 0.0001
        if matching_mask.any():
            results_df = full_results[matching_mask].copy()
            # If matches are fewer than 15, supplement with additional substring/category matches
            if len(results_df) < 15 and query_tokens:
                existing_names = set(results_df["scheme_name"].astype(str).str.lower())
                additional_rows = []
                for _, row in data.iterrows():
                    r_name = str(row.get("scheme_name", "")).strip()
                    r_text = f"{r_name} {row.get('tags', '')} {row.get('schemeCategory', '')} {row.get('details', '')}".lower()
                    if any(tok in r_text for tok in query_tokens):
                        if r_name.lower() not in existing_names:
                            r_copy = row.copy()
                            r_copy["score"] = 0.02
                            additional_rows.append(r_copy)
                            existing_names.add(r_name.lower())
                if additional_rows:
                    add_df = pd.DataFrame(additional_rows)
                    results_df = pd.concat([results_df, add_df], ignore_index=True)
        else:
            # Fallback to keyword matching across the 3,400 dataset
            fallback_rows = []
            for _, row in data.iterrows():
                r_name = str(row.get("scheme_name", "")).strip()
                r_text = f"{r_name} {row.get('tags', '')} {row.get('schemeCategory', '')} {row.get('details', '')}".lower()
                if any(tok in r_text for tok in query_tokens):
                    r_copy = row.copy()
                    r_copy["score"] = 0.05
                    fallback_rows.append(r_copy)
            
            if fallback_rows:
                results_df = pd.DataFrame(fallback_rows)
            else:
                results_df = full_results.head(20).copy()

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

        score_val = float(row_dict.get("score", 0.0))
        results.append(format_scheme_row(row_dict, score=score_val, query_tokens=query_tokens))

    return jsonify({
        "query": query,
        "total": len(results),
        "dataset_total": len(data),
        "results": results
    })


if __name__ == "__main__":
    print(f"API Server listening on http://0.0.0.0:5000 (Schemes indexed: {len(data)})")
    app.run(host="0.0.0.0", port=5000, debug=False)
