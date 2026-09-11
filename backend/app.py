import sys
import re
from colorama import Fore, Style, init
sys.path.append("code")

from preprocess import load_and_preprocess_data
from search import SchemeSearch
def highlight_words(text, query):
    words = query.split()

    for word in words:
        text = re.sub(
            f"({word})",
            Fore.GREEN + r"\1" + Style.RESET_ALL,
            text,
            flags=re.IGNORECASE
        )

    return text


print("\n==============================")
print(" GOVERNMENT SCHEME RETRIEVAL ")
print("==============================\n")


data = load_and_preprocess_data()

search_engine = SchemeSearch(data)


query = input("Enter your search query: ")

results = search_engine.search(query)
print("\nTop Matching Government Schemes:\n")


for index, row in results.iterrows():

    print("Scheme:", highlight_words(row["scheme_name"], query))

    print("Description:", highlight_words(row["details"], query))

    print("Eligibility:", highlight_words(row["eligibility"], query))

    print("Similarity Score:", round(row["score"], 2))

    print("-" * 50)