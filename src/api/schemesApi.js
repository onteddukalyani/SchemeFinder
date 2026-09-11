// API client for Government Scheme Retrieval System
import { searchSchemes, SCHEMES_DATA } from '../data/schemesData';

export async function fetchSchemeResults(query = '', sortBy = 'score-desc') {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const url = `/api/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      let results = data.results || [];

      // Sort Results according to selected sortBy option
      if (sortBy === 'score-asc') {
        results.sort((a, b) => a.score - b.score);
      } else if (sortBy === 'name-asc') {
        results.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        results.sort((a, b) => b.score - a.score);
      }

      return {
        source: 'backend',
        results: results
      };
    }
  } catch (err) {
    console.warn('API fetch failed or offline, using fallback:', err.message);
  }

  // Graceful fallback to client dataset
  const fallbackResults = searchSchemes(query, { sortBy });
  return {
    source: 'local',
    results: fallbackResults
  };
}

export { SCHEMES_DATA };
