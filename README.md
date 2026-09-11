# 🏛️ Government Scheme Retrieval System

An intelligent, full-stack Information Retrieval (IR) web application designed to help citizens easily discover and explore relevant Indian Government Schemes tailored to their profile, needs, and eligibility.

Built with **React + Vite** for the frontend and a **Python TF-IDF + Cosine Similarity** search engine on the backend.

---

## 📌 Features

- **Intelligent Semantic Search**: Free-form search (e.g., *"scholarship for college students"*, *"financial assistance for farmers"*, *"women entrepreneurship loan"*).
- **Multi-Level Relevance Matching**:
  - 🎯 **Exact Match**: Direct token and title correlation.
  - ⚡ **Highly Similar**: Strong TF-IDF vector similarity across scheme details.
  - 💡 **Related Schemes**: Semantically related welfare initiatives.
  - 📌 **Approximate Match**: Broad associative matching.
- **3,400+ Indexed Schemes**: Comprehensive coverage of Central and State Government programs across education, agriculture, social welfare, health, and entrepreneurship.
- **Detailed Scheme Pages**: Tabbed walkthroughs for **Overview**, **Eligibility Criteria**, **Benefits Breakdown**, **Application Process**, and **Required Documents**.
- **Modern Responsive Design**: Fully responsive on desktop, tablet, and mobile screens.
- **Offline & Fallback Resilience**: Built-in fallback engine ensures search works seamlessly even when backend is offline.

---

## 🏗️ Technology Stack

### **Frontend**
- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Custom Design System with responsive tokens)
- **Icons**: Lucide Icons & Custom SVG Vector Illustrations (Ashoka Emblem, Sansad Bhavan, Certificate Graphic)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)

### **Backend & Information Retrieval**
- **Language**: Python 3.x
- **API Framework**: Flask + Flask-CORS
- **NLP & IR**: Scikit-Learn (`TfidfVectorizer`, `cosine_similarity`)
- **Data Processing**: Pandas, NumPy
- **Dataset**: 3,400+ indexed government schemes (`updated_data.csv`)

---

## 📁 Project Structure

```text
IR Project/
├── backend/
│   ├── code/
│   │   ├── preprocess.py        # Text preprocessing & corpus generation
│   │   ├── search.py            # TF-IDF Vectorizer & Cosine Similarity search engine
│   │   └── evaluation.py        # Retrieval evaluation metrics
│   ├── dataset/
│   │   └── updated_data.csv     # National & State Government scheme dataset (3400+ records)
│   ├── app.py                   # CLI terminal search interface
│   ├── server.py                # Flask REST API server (/api/search, /api/health)
│   └── README.md
├── src/
│   ├── api/
│   │   └── schemesApi.js        # Frontend API client with fallback handling
│   ├── assets/                  # Logos and static media
│   ├── components/
│   │   ├── Header.jsx           # Top navigation bar with Emblem & branding
│   │   ├── EmblemIcon.jsx       # Ashoka Lion Capital SVG vector
│   │   ├── ParliamentIllustration.jsx # Sansad Bhavan hero vector artwork
│   │   └── AboutIllustration.jsx# Government certificate & magnifying glass artwork
│   ├── data/
│   │   └── schemesData.js       # Curated schemes dataset & client-side search utility
│   ├── pages/
│   │   ├── HomePage.jsx         # Hero section, search input, quick categories, trust cards
│   │   ├── SearchResultsPage.jsx# Ranked result cards, relevance filter tabs, sort dropdown
│   │   ├── SchemeDetailsPage.jsx# 5 tabbed sections, metadata table & Quick Summary card
│   │   └── AboutPage.jsx        # Project overview, IR methodology, and technical architecture
│   ├── App.jsx                  # Main application routing and state coordinator
│   ├── index.css                # Global design system, CSS tokens, and layout styles
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template with Google Fonts
├── vite.config.js               # Vite bundler configuration & API proxy
└── package.json                 # Project dependencies & startup scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)

---


```bash
cd backend

# Create virtual environment (optional)
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install flask flask-cors pandas scikit-learn numpy colorama

# Run the API server
python server.py
```

*The backend server will start on `http://127.0.0.1:5000`.*

---

### 3. Setup and Run the React Frontend

Open a new terminal in the project root:

```bash
# Install frontend dependencies
npm install

# Start Vite dev server
npm run dev
```

*The application will be live at `http://localhost:5174/` (or `http://localhost:5173/`).*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Check API server status and total indexed schemes count |
| `GET` | `/api/search?q={query}` | Retrieve all matching schemes ranked by similarity score |

### Example Request
```http
GET /api/search?q=scholarship%20for%20students
```

### Example Response
```json
{
  "query": "scholarship for students",
  "count": 321,
  "exact_count": 227,
  "similar_count": 45,
  "related_count": 13,
  "approx_count": 36,
  "results": [
    {
      "id": "post-matric-scholarship-sc",
      "name": "Post Matric Scholarship for SC Students",
      "category": "Education",
      "matchScore": 92,
      "matchType": "Exact Match",
      "shortDescription": "Financial assistance provided to students from Scheduled Castes to pursue post matric education.",
      "department": "Central Government Scheme",
      "offeredBy": "Central Government",
      "state": "All India"
    }
  ]
}
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
