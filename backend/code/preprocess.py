import pandas as pd
import re


def preprocess_text(text):
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()

    return text


def load_and_preprocess_data():
    df = pd.read_csv("dataset/updated_data.csv")

    df["combined_text"] = (
        df["scheme_name"] + " " +
        df["details"] + " " +
        df["eligibility"]
    )

    df["combined_text"] = df["combined_text"].apply(preprocess_text)

    return df