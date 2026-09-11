// Complete 3,400+ Schemes Dataset & Offline Retrieval Engine
import SCHEMES_RAW from './schemes_dataset.json';

export const SCHEMES_DATA = SCHEMES_RAW;

// Quick Categories configuration matching design
export const CATEGORY_TILES = [
  { id: "Students", label: "Students", icon: "GraduationCap", color: "#0066FF", bg: "#EBF3FF" },
  { id: "Farmers", label: "Farmers", icon: "Sprout", color: "#10B981", bg: "#E8F9F1" },
  { id: "Women", label: "Women", icon: "UserCheck", color: "#E11D48", bg: "#FFE8EE" },
  { id: "Unemployed", label: "Unemployed", icon: "Briefcase", color: "#0284C7", bg: "#E0F2FE" },
  { id: "Senior Citizens", label: "Senior Citizens", icon: "Users", color: "#4F46E5", bg: "#EEF2FF" },
  { id: "All Categories", label: "All Categories", icon: "Grid", color: "#0284C7", bg: "#EBF3FF" },
];

// Token-based TF-IDF simulation for instant client-side retrieval across all 3,400 schemes
export function searchSchemes(query = "", options = {}) {
  const cleanQuery = (query || "").toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/).filter((t) => t.length > 1);

  if (!cleanQuery || queryTokens.length === 0) {
    // Return all schemes sorted by default
    return SCHEMES_DATA.map((s, idx) => ({
      ...s,
      score: 85,
      matchType: idx < 20 ? "Latest" : "Approximate Match"
    }));
  }

  const scoredSchemes = [];

  for (let i = 0; i < SCHEMES_DATA.length; i++) {
    const s = SCHEMES_DATA[i];
    const nameLower = (s.name || "").toLowerCase();
    const detailsLower = (s.shortDescription || s.fullDescription || "").toLowerCase();
    const tagsLower = Array.isArray(s.tags) ? s.tags.join(" ").toLowerCase() : (s.tags || "").toLowerCase();
    const categoryLower = (s.category || "").toLowerCase();
    const eligibilityLower = (s.quickSummary?.eligibility || "").toLowerCase();

    let tokenHits = 0;
    let titleHits = 0;
    let tagHits = 0;

    for (let t = 0; t < queryTokens.length; t++) {
      const tok = queryTokens[t];
      if (nameLower.includes(tok)) {
        titleHits++;
        tokenHits += 3;
      } else if (tagHits < 3 && tagsLower.includes(tok)) {
        tagHits++;
        tokenHits += 2;
      } else if (categoryLower.includes(tok)) {
        tokenHits += 2;
      } else if (detailsLower.includes(tok) || eligibilityLower.includes(tok)) {
        tokenHits += 1;
      }
    }

    if (tokenHits > 0) {
      let matchScore;
      let matchType;

      if (titleHits === queryTokens.length) {
        matchScore = Math.min(99, 90 + titleHits * 3);
        matchType = "Exact Match";
      } else if (titleHits > 0 || tagHits > 0) {
        matchScore = Math.min(92, 75 + tokenHits * 2);
        matchType = "Highly Similar";
      } else if (tokenHits >= 2) {
        matchScore = Math.min(74, 60 + tokenHits * 2);
        matchType = "Related Scheme";
      } else {
        matchScore = Math.min(59, 45 + tokenHits * 5);
        matchType = "Approximate Match";
      }

      scoredSchemes.push({
        ...s,
        score: matchScore,
        matchType: matchType,
        _hits: tokenHits
      });
    }
  }

  // Sort by relevance score desc
  const sortBy = options.sortBy || "score-desc";
  if (sortBy === "score-asc") {
    scoredSchemes.sort((a, b) => a.score - b.score);
  } else if (sortBy === "name-asc") {
    scoredSchemes.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    scoredSchemes.sort((a, b) => b.score - a.score || b._hits - a._hits);
  }

  return scoredSchemes;
}
