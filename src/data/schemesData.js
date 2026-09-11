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

const STOP_WORDS = new Set(['for', 'the', 'and', 'in', 'of', 'to', 'a', 'an', 'on', 'with', 'by', 'at', 'from', 'is', 'are', 'as']);

const INDIAN_STATES = new Set([
  'andhra', 'arunachal', 'assam', 'bihar', 'chhattisgarh', 'goa', 'gujarat',
  'haryana', 'himachal', 'jharkhand', 'karnataka', 'kerala', 'madhya pradesh',
  'maharashtra', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha',
  'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura',
  'uttar pradesh', 'uttarakhand', 'west bengal', 'delhi', 'jammu', 'kashmir', 'ladakh', 'puducherry'
]);

// Token-based TF-IDF & Strict Relevance Engine for instant client-side retrieval across all 3,400 schemes
export function searchSchemes(query = "", options = {}) {
  const cleanQuery = (query || "").toLowerCase().trim();
  const rawTokens = cleanQuery.split(/\s+/).filter((t) => t.length > 1);
  const meaningfulTokens = rawTokens.filter((t) => !STOP_WORDS.has(t));
  const queryTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;

  if (!cleanQuery || queryTokens.length === 0) {
    // Return all schemes sorted by default
    return SCHEMES_DATA.map((s, idx) => ({
      ...s,
      score: 85,
      matchType: idx < 20 ? "Latest" : "Approximate Match"
    }));
  }

  // Identify state in query if present
  let targetState = null;
  for (const t of queryTokens) {
    for (const state of INDIAN_STATES) {
      if (state.includes(t) || t.includes(state)) {
        targetState = state;
        break;
      }
    }
    if (targetState) break;
  }

  const scoredSchemes = [];

  for (let i = 0; i < SCHEMES_DATA.length; i++) {
    const s = SCHEMES_DATA[i];
    const nameLower = (s.name || "").toLowerCase();
    const detailsLower = (s.shortDescription || s.fullDescription || "").toLowerCase();
    const tagsLower = Array.isArray(s.tags) ? s.tags.join(" ").toLowerCase() : (s.tags || "").toLowerCase();
    const categoryLower = (s.category || "").toLowerCase();
    const eligibilityLower = (s.quickSummary?.eligibility || "").toLowerCase();
    const benefitsLower = (s.quickSummary?.benefits || "").toLowerCase();
    const stateLower = (s.state || "").toLowerCase();
    const levelLower = (s.offeredBy || s.quickSummary?.level || "").toLowerCase();
    const fullDocText = `${nameLower} ${tagsLower} ${categoryLower} ${stateLower} ${levelLower} ${detailsLower} ${eligibilityLower} ${benefitsLower}`;

    const isCentral = levelLower.includes('central') || stateLower.includes('all india') || nameLower.includes('central') || nameLower.includes('national');

    let distinctTokensHit = 0;
    let titleTokensHit = 0;
    let tagTokensHit = 0;
    let rawHits = 0;

    for (let t = 0; t < queryTokens.length; t++) {
      const tok = queryTokens[t];
      let tokenPresentInDoc = false;

      if (nameLower.includes(tok)) {
        titleTokensHit++;
        tokenPresentInDoc = true;
        rawHits += 3;
      }
      if (tagsLower.includes(tok)) {
        tagTokensHit++;
        tokenPresentInDoc = true;
        rawHits += 2;
      }
      if (categoryLower.includes(tok) || stateLower.includes(tok)) {
        tokenPresentInDoc = true;
        rawHits += 2;
      }
      if (detailsLower.includes(tok) || eligibilityLower.includes(tok) || benefitsLower.includes(tok)) {
        tokenPresentInDoc = true;
        rawHits += 1;
      }

      if (tokenPresentInDoc) {
        distinctTokensHit++;
      }
    }

    // Strict Relevance Filter
    if (targetState) {
      const isTargetState = fullDocText.includes(targetState);
      let isConflictingOtherState = false;
      for (const st of INDIAN_STATES) {
        if (st !== targetState && (nameLower.includes(st) || tagsLower.includes(st))) {
          isConflictingOtherState = true;
          break;
        }
      }

      if (isConflictingOtherState && !isTargetState) {
        continue;
      }

      const nonStateTokens = queryTokens.filter((t) => !targetState.includes(t) && !t.includes(targetState));
      if (nonStateTokens.length > 0) {
        const hasIntent = nonStateTokens.some((t) => fullDocText.includes(t));
        if (!hasIntent) continue;
        if (!isTargetState && !isCentral) continue;
      }
    } else {
      if (queryTokens.length > 1) {
        if (distinctTokensHit < Math.min(2, queryTokens.length) && titleTokensHit === 0) {
          continue;
        }
      } else {
        if (distinctTokensHit === 0) {
          continue;
        }
      }
    }

    if (distinctTokensHit > 0) {
      let matchScore;
      let matchType;
      let rankScore;

      const allTokensMatch = distinctTokensHit === queryTokens.length;

      if (queryTokens.length > 1 && allTokensMatch) {
        if (titleTokensHit >= 1) {
          matchScore = Math.min(99, 93 + titleTokensHit * 2);
          matchType = "Exact Match";
          rankScore = 200 + titleTokensHit * 10 + rawHits;
        } else {
          matchScore = Math.min(94, 88 + rawHits);
          matchType = "Highly Similar";
          rankScore = 150 + rawHits;
        }
      } else if (queryTokens.length === 1 && (titleTokensHit >= 1 || tagTokensHit >= 1)) {
        matchScore = Math.min(99, 90 + titleTokensHit * 3 + tagTokensHit);
        matchType = "Exact Match";
        rankScore = 180 + rawHits;
      } else if (titleTokensHit >= 1 || tagTokensHit >= 1 || distinctTokensHit >= 2) {
        matchScore = Math.min(89, 75 + rawHits * 2);
        matchType = "Highly Similar";
        rankScore = 100 + rawHits;
      } else if (distinctTokensHit >= 1) {
        matchScore = Math.min(74, 60 + rawHits);
        matchType = "Related Scheme";
        rankScore = 50 + rawHits;
      } else {
        matchScore = Math.min(59, 45 + rawHits);
        matchType = "Approximate Match";
        rankScore = 10 + rawHits;
      }

      scoredSchemes.push({
        ...s,
        score: matchScore,
        matchType: matchType,
        _rankScore: rankScore,
        _hits: rawHits
      });
    }
  }

  // Sort by relevance rank score desc
  const sortBy = options.sortBy || "score-desc";
  if (sortBy === "score-asc") {
    scoredSchemes.sort((a, b) => a.score - b.score);
  } else if (sortBy === "name-asc") {
    scoredSchemes.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    scoredSchemes.sort((a, b) => b._rankScore - a._rankScore || b.score - a.score || b._hits - a._hits);
  }

  return scoredSchemes;
}
