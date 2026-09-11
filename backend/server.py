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

STOP_WORDS = {"for", "the", "and", "in", "of", "to", "a", "an", "on", "with", "by", "at", "from", "is", "are", "as"}

INDIAN_STATES = {
    "andhra", "arunachal", "assam", "bihar", "chhattisgarh", "goa", "gujarat",
    "haryana", "himachal", "jharkhand", "karnataka", "kerala", "madhya pradesh",
    "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha",
    "punjab", "rajasthan", "sikkim", "tamil nadu", "telangana", "tripura",
    "uttar pradesh", "uttarakhand", "west bengal", "delhi", "jammu", "kashmir", "ladakh", "puducherry"
}


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
        row_dict = dict(row)
        name = str(row_dict.get("scheme_name", "")).strip()
        if name:
            results.append(format_scheme_row(row_dict, score_pct=85, match_type="Latest", raw_score=0.85, query_tokens=[]))
    
    return jsonify({
        "total": len(results),
        "results": results
    })


def format_scheme_row(row_dict: Dict[str, Any], score_pct: int, match_type: str, raw_score: float, query_tokens: List[str]) -> Dict[str, Any]:
    scheme_name = str(row_dict.get("scheme_name", "")).strip()
    slug = str(row_dict.get("slug", scheme_name)).strip()
    tags_lower = str(row_dict.get("tags", "")).lower()

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
    elif any(k in cat_check for k in ["unemploy", "skill", "job", "labor", "shram", "startup", "powerloom", "loan", "finance"]):
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
        "score": score_pct,
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
    raw_tokens = [t for t in re.split(r"\s+", query_lower) if len(t) > 1]
    query_tokens = [t for t in raw_tokens if t not in STOP_WORDS]
    if not query_tokens:
        query_tokens = raw_tokens

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
        results: List[Dict[str, Any]] = []
        for _, row in sample_df.iterrows():
            row_dict = dict(row)
            name = str(row_dict.get("scheme_name", "")).strip()
            if name:
                results.append(format_scheme_row(row_dict, score_pct=85, match_type="Latest", raw_score=0.85, query_tokens=[]))
        return jsonify({
            "query": query,
            "total": len(results),
            "dataset_total": len(data),
            "results": results
        })

    # Identify state in query if present
    state_in_query = [s for s in INDIAN_STATES if any(s in t or t in s for t in query_tokens)]
    target_state = state_in_query[0] if state_in_query else None

    # Retrieve candidate ranked matches using TF-IDF + Cosine Similarity
    full_results = search_engine.search(query, top_k=len(data))
    
    # Filter candidates with positive TF-IDF score
    matching_mask = full_results["score"] > 0.0001
    matched_df = full_results[matching_mask].copy() if matching_mask.any() else full_results.head(50).copy()

    # Strict Relevance Filter & Scorer
    relevant_rows = []
    seen_ids: Set[str] = set()

    for _, row in matched_df.iterrows():
        row_dict = dict(row)
        name = str(row_dict.get("scheme_name", "")).strip()
        slug = str(row_dict.get("slug", name)).strip()
        dedup_key = (slug or name).lower()
        if not name or dedup_key in seen_ids:
            continue

        r_name = name.lower()
        r_tags = str(row_dict.get("tags", "")).lower()
        r_details = str(row_dict.get("details", "")).lower()
        r_benefits = str(row_dict.get("benefits", "")).lower()
        r_eligibility = str(row_dict.get("eligibility", "")).lower()
        r_level = str(row_dict.get("level", "")).lower()
        r_cat = str(row_dict.get("schemeCategory", "")).lower()
        doc_text = f"{r_name} {r_tags} {r_cat} {r_level} {r_details} {r_benefits} {r_eligibility}"

        tokens_in_doc = [t for t in query_tokens if t in doc_text]
        tokens_in_title = [t for t in query_tokens if t in r_name]
        tokens_in_tags = [t for t in query_tokens if t in r_tags]

        hits = len(tokens_in_doc)
        title_hits = len(tokens_in_title)
        tag_hits = len(tokens_in_tags)

        is_central = "central" in r_level or "all india" in r_level or "central" in r_name or "national" in r_name
        base_tfidf = float(row_dict.get("score", 0.0))

        # Strict Relevance Filtering
        if target_state:
            is_target_state = target_state in doc_text
            other_states = [s for s in INDIAN_STATES if s != target_state and (s in r_name or s in r_tags or (s in r_level and not is_central))]
            
            # Reject if it explicitly belongs to another competing state
            if other_states and not is_target_state:
                continue

            non_state_tokens = [t for t in query_tokens if target_state not in t and t not in target_state]
            if non_state_tokens:
                has_intent = any(t in doc_text for t in non_state_tokens)
                if not has_intent:
                    continue
                if not (is_target_state or is_central):
                    continue
        else:
            if len(query_tokens) > 1:
                # Multi-word query: require at least 2 token hits OR full title match
                if hits < min(2, len(query_tokens)) and not any(t in r_name for t in query_tokens):
                    continue
            else:
                # Single token query: token must be present
                if hits == 0:
                    continue

        # Rank Calculation
        all_tokens_present = hits == len(query_tokens)
        if len(query_tokens) > 1 and all_tokens_present:
            rank = 1000 + (title_hits * 100) + (tag_hits * 50) + int(base_tfidf * 100)
            match_type = "Exact Match" if title_hits >= 1 else "Highly Similar"
            pct = max(90, min(99, int(round(88 + base_tfidf * 25))))
        elif len(query_tokens) == 1 and (title_hits >= 1 or tag_hits >= 1):
            rank = 900 + (title_hits * 50) + int(base_tfidf * 100)
            match_type = "Exact Match"
            pct = max(90, min(99, int(round(82 + base_tfidf * 30))))
        elif title_hits >= 1:
            rank = 500 + (title_hits * 50) + int(base_tfidf * 100)
            match_type = "Highly Similar"
            pct = max(78, min(90, int(round(72 + base_tfidf * 25))))
        elif hits >= 2:
            rank = 350 + int(base_tfidf * 100)
            match_type = "Highly Similar"
            pct = max(72, min(85, int(round(65 + base_tfidf * 25))))
        else:
            rank = 150 + int(base_tfidf * 100)
            match_type = "Related Scheme"
            pct = max(60, min(74, int(round(52 + base_tfidf * 25))))

        seen_ids.add(dedup_key)
        relevant_rows.append((rank, format_scheme_row(row_dict, score_pct=pct, match_type=match_type, raw_score=base_tfidf, query_tokens=query_tokens)))

    # Sort strictly by relevance rank desc
    relevant_rows.sort(key=lambda x: x[0], reverse=True)
    results = [r[1] for r in relevant_rows]

    return jsonify({
        "query": query,
        "total": len(results),
        "dataset_total": len(data),
        "results": results
    })


if __name__ == "__main__":
    print(f"API Server listening on http://0.0.0.0:5000 (Schemes indexed: {len(data)})")
    app.run(host="0.0.0.0", port=5000, debug=False)
