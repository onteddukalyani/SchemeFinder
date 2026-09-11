# ⚙️ Government Scheme Retrieval Backend

Python-based Information Retrieval (IR) engine powering the Government Scheme Retrieval System.

## Overview
Instead of requiring exact official scheme titles, the retrieval engine enables citizens to search using natural language queries like *"scholarship for students"* or *"financial support for farmers"*. The engine ranks all matching schemes using **TF-IDF Vector Space Representation** and **Cosine Angular Similarity**.

## Key Features
- **TF-IDF Vectorization**: Indexes 3,400+ scheme descriptions, eligibility criteria, and benefits.
- **Cosine Similarity Ranking**: Computes similarity scores between citizen queries and the scheme document corpus.
- **REST API (`server.py`)**: Flask API service providing live search endpoints (`/api/search` and `/api/health`).
- **Terminal CLI (`app.py`)**: Interactive CLI tool with keyword highlighting.

## Technologies Used
- Python 3.x
- Flask & Flask-CORS
- Scikit-learn (`TfidfVectorizer`, `cosine_similarity`)
- Pandas & NumPy
- Colorama

## Directory Structure
```text
backend/
├── code/
│   ├── preprocess.py        # Cleans text & builds combined document corpus
│   ├── search.py            # SchemeSearch class with TF-IDF & cosine similarity
│   └── evaluation.py        # IR evaluation metrics (Precision@K, Recall)
├── dataset/
│   └── updated_data.csv     # 3,400+ indexed government schemes
├── app.py                   # Terminal CLI search runner
├── server.py                # Flask REST API server
└── README.md
```

## Running the API Server
```bash
# Run Flask REST API
python server.py
```
*Accessible on `http://127.0.0.1:5000` / `http://0.0.0.0:5000`.*

## Running the Terminal CLI
```bash
python app.py
```
