import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  GraduationCap,
  Sprout,
  UserCheck,
  Briefcase,
  Users,
  HeartPulse,
  Building2,
  ArrowRight,
  User,
  MapPin,
  X,
  Target,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function SearchResultsPage({
  searchQuery,
  results,
  sortBy,
  setSortBy,
  onBack,
  onSelectScheme,
  onExecuteSearch
}) {
  const [searchInput, setSearchInput] = useState(searchQuery || '');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(25);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setVisibleCount(25);
    onExecuteSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput('');
    setVisibleCount(25);
    onExecuteSearch('');
  };

  const handleTypeFilterChange = (type) => {
    setActiveTypeFilter(type);
    setVisibleCount(25);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setVisibleCount(25);
  };

  // Group and count results by match type
  const { exactMatches, similarMatches, relatedMatches, approxMatches } = useMemo(() => {
    const exact = [];
    const similar = [];
    const related = [];
    const approx = [];

    results.forEach((s) => {
      const type = s.matchType || (s.score >= 85 ? 'Exact Match' : s.score >= 70 ? 'Highly Similar' : s.score >= 55 ? 'Related Scheme' : 'Approximate Match');
      if (type === 'Exact Match') exact.push(s);
      else if (type === 'Highly Similar') similar.push(s);
      else if (type === 'Related Scheme') related.push(s);
      else approx.push(s);
    });

    return {
      exactMatches: exact,
      similarMatches: similar,
      relatedMatches: related,
      approxMatches: approx
    };
  }, [results]);

  // Filter results by active relevance tab
  const displayedResults = useMemo(() => {
    if (activeTypeFilter === 'exact') return exactMatches;
    if (activeTypeFilter === 'similar') return similarMatches;
    if (activeTypeFilter === 'related') return relatedMatches;
    if (activeTypeFilter === 'approx') return approxMatches;
    return results;
  }, [activeTypeFilter, results, exactMatches, similarMatches, relatedMatches, approxMatches]);

  const visibleResults = useMemo(() => {
    return displayedResults.slice(0, visibleCount);
  }, [displayedResults, visibleCount]);

  const getSchemeIcon = (categoryKey, category) => {
    const cat = (categoryKey || category || '').toLowerCase();
    if (cat.includes('student') || cat.includes('education')) {
      return <GraduationCap size={26} className="text-blue-600" />;
    } else if (cat.includes('farmer') || cat.includes('agri') || cat.includes('fisher')) {
      return <Sprout size={26} className="text-emerald-600" />;
    } else if (cat.includes('women') || cat.includes('girl')) {
      return <UserCheck size={26} className="text-rose-500" />;
    } else if (cat.includes('unemployed') || cat.includes('labor') || cat.includes('skill') || cat.includes('job')) {
      return <Briefcase size={26} className="text-sky-600" />;
    } else if (cat.includes('senior') || cat.includes('welfare') || cat.includes('social') || cat.includes('pension')) {
      return <Users size={26} className="text-indigo-600" />;
    } else if (cat.includes('health') || cat.includes('medical')) {
      return <HeartPulse size={26} className="text-teal-600" />;
    }
    return <Building2 size={26} className="text-blue-600" />;
  };

  const renderMatchBadge = (scheme) => {
    const type = scheme.matchType || (scheme.score >= 85 ? 'Exact Match' : scheme.score >= 70 ? 'Highly Similar' : scheme.score >= 55 ? 'Related Scheme' : 'Approximate Match');
    const score = scheme.score || scheme.matchScore || 85;

    let badgeClass = 'match-pill-badge';
    let label = `${score}% Match`;

    if (type === 'Exact Match') {
      badgeClass = 'match-pill-badge match-pill-exact';
      label = `${score}% Exact Match`;
    } else if (type === 'Highly Similar') {
      badgeClass = 'match-pill-badge match-pill-similar';
      label = `${score}% High Match`;
    } else if (type === 'Related Scheme') {
      badgeClass = 'match-pill-badge match-pill-related';
      label = `${score}% Related`;
    } else if (type === 'Approximate Match') {
      badgeClass = 'match-pill-badge match-pill-approx';
      label = `${score}% Approx`;
    }

    return <div className={badgeClass}>{label}</div>;
  };

  return (
    <div className="search-results-page">
      <div className="results-container">
        {/* Top Navigation Back Button */}
        <div className="results-top-nav">
          <button className="back-nav-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        {/* Top Search Bar */}
        <div className="results-search-header">
          <form onSubmit={handleSearchSubmit} className="results-search-bar">
            <div className="search-input-inner">
              <Search className="search-bar-icon" size={18} />
              <input
                type="text"
                className="results-input"
                placeholder="Search all 3,400+ schemes by need, eligibility, or keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  type="button"
                  className="clear-input-btn"
                  onClick={handleClear}
                  aria-label="Clear search text"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button type="submit" className="results-search-submit-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Multi-Level IR Relevance Filter Tabs */}
        {results.length > 0 && (
          <div className="relevance-tabs-bar">
            <button
              className={`relevance-tab ${activeTypeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleTypeFilterChange('all')}
            >
              <Layers size={14} />
              <span>All Results ({results.length})</span>
            </button>

            {exactMatches.length > 0 && (
              <button
                className={`relevance-tab tab-exact ${activeTypeFilter === 'exact' ? 'active' : ''}`}
                onClick={() => handleTypeFilterChange('exact')}
              >
                <Target size={14} />
                <span>Exact Matches ({exactMatches.length})</span>
              </button>
            )}

            {similarMatches.length > 0 && (
              <button
                className={`relevance-tab tab-similar ${activeTypeFilter === 'similar' ? 'active' : ''}`}
                onClick={() => handleTypeFilterChange('similar')}
              >
                <Sparkles size={14} />
                <span>Highly Similar ({similarMatches.length})</span>
              </button>
            )}

            {relatedMatches.length > 0 && (
              <button
                className={`relevance-tab tab-related ${activeTypeFilter === 'related' ? 'active' : ''}`}
                onClick={() => handleTypeFilterChange('related')}
              >
                <span>Related Schemes ({relatedMatches.length})</span>
              </button>
            )}

            {approxMatches.length > 0 && (
              <button
                className={`relevance-tab tab-approx ${activeTypeFilter === 'approx' ? 'active' : ''}`}
                onClick={() => handleTypeFilterChange('approx')}
              >
                <span>Approximate ({approxMatches.length})</span>
              </button>
            )}
          </div>
        )}

        {/* Results Metadata & Sorting Row */}
        <div className="results-meta-row">
          <p className="results-count-text">
            Showing <strong>{Math.min(visibleResults.length, displayedResults.length)}</strong> of <strong>{displayedResults.length} schemes</strong> {displayedResults.length !== results.length ? `(${results.length} total)` : ''} for "{searchQuery || 'all schemes'}"
          </p>

          <div className="sort-by-wrapper">
            <span className="sort-label">Sort by:</span>
            <select
              className="sort-select"
              value={sortBy || 'score-desc'}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="score-desc">Best Match (Relevance)</option>
              <option value="score-asc">Score: Low to High</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
            <ChevronDown size={14} className="sort-select-arrow" />
          </div>
        </div>

        {/* Scheme Result Cards List */}
        <div className="scheme-cards-list">
          {displayedResults.length === 0 ? (
            <div className="empty-results-card">
              <h3>No schemes found in this category</h3>
              <p>Try switching to "All Results" or enter a different query.</p>
              <button
                className="btn-primary mt-4"
                onClick={() => {
                  handleTypeFilterChange('all');
                  handleClear();
                }}
              >
                View All Schemes
              </button>
            </div>
          ) : (
            visibleResults.map((scheme) => (
              <div key={scheme.id} className="scheme-result-card">
                <div className="scheme-card-inner">
                  {/* Left Column Icon */}
                  <div className="scheme-icon-col">
                    <div className="scheme-card-avatar">
                      {getSchemeIcon(scheme.categoryKey, scheme.category)}
                    </div>
                  </div>

                  {/* Main Info Column */}
                  <div className="scheme-info-col">
                    {/* Header line: Title & Badges */}
                    <div className="scheme-title-wrap">
                      <div className="scheme-title-and-badge">
                        <h2
                          className="scheme-card-title"
                          onClick={() => onSelectScheme(scheme)}
                        >
                          {scheme.name}
                        </h2>
                        <span className="category-pill-badge">
                          {scheme.category}
                        </span>
                      </div>

                      {/* Top-Right Multi-Level Match Badge */}
                      {renderMatchBadge(scheme)}
                    </div>

                    {/* Description */}
                    <p className="scheme-card-desc">
                      {scheme.shortDescription}
                    </p>

                    {/* Metadata Line */}
                    <div className="scheme-metadata-row">
                      <div className="meta-item">
                        <User size={15} className="meta-icon" />
                        <span>
                          <strong>Eligibility:</strong> {scheme.quickSummary?.eligibility || scheme.targetBeneficiaries}
                          {scheme.familyIncomeLimit && scheme.familyIncomeLimit !== "No specific income limit" && scheme.familyIncomeLimit !== "As per scheme criteria" && (
                            <> | Family income: {scheme.familyIncomeLimit.replace(' per annum', '')}</>
                          )}
                        </span>
                      </div>

                      <div className="meta-item">
                        <MapPin size={15} className="meta-icon" />
                        <span>
                          <strong>State:</strong> {scheme.state}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right Action Button */}
                  <div className="scheme-card-action">
                    <button
                      className="view-details-btn"
                      onClick={() => onSelectScheme(scheme)}
                    >
                      <span>View Details</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Pagination Controls */}
        {displayedResults.length > visibleCount && (
          <div className="load-more-section" style={{ textAlign: 'center', margin: '32px 0 48px 0' }}>
            <button
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '15px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => setVisibleCount((prev) => prev + 25)}
            >
              <span>Load More Schemes (Showing {visibleCount} of {displayedResults.length})</span>
              <ChevronRight size={16} />
            </button>
            <div style={{ marginTop: '12px' }}>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--color-primary-blue)', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                onClick={() => setVisibleCount(displayedResults.length)}
              >
                Show All {displayedResults.length} Schemes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
