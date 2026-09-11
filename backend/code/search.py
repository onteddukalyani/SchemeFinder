from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class SchemeSearch:

    def __init__(self, data):
        self.data = data

        self.vectorizer = TfidfVectorizer()

        self.tfidf_matrix = self.vectorizer.fit_transform(
            self.data["combined_text"]
        )

    def search(self, query, top_k=5):

        query_vector = self.vectorizer.transform([query])

        similarity_scores = cosine_similarity(
            query_vector,
            self.tfidf_matrix
        ).flatten()

        top_indices = similarity_scores.argsort()[-top_k:][::-1]

        results = self.data.iloc[top_indices].copy()

        results["score"] = similarity_scores[top_indices]

        return results