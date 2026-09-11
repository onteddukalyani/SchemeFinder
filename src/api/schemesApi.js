// API client for Government Scheme Retrieval System
import { searchSchemes, SCHEMES_DATA } from '../data/schemesData';

export async function fetchSchemeResults(query = '', sortBy = 'score-desc') {
  const queryParam = encodeURIComponent(query || '');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    // Clean relative path without hardcoded hosts or IPs
    const response = await fetch(`/api/search?q=${queryParam}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    // Verify response is JSON (not HTML SPA fallback)
    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
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
  } catch {
    // Continue to local retrieval engine
  }

  // Graceful offline fallback to full 3,400 schemes dataset from CSV
  const fallbackResults = searchSchemes(query, { sortBy });
  return {
    source: 'local',
    results: fallbackResults
  };
}

export { SCHEMES_DATA };
