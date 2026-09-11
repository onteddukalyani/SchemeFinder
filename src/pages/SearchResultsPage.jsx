import { useState } from 'react';
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
  X
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
  const [searchInput, setSearchInput] = useState(searchQuery || 'scholarship for students');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onExecuteSearch(searchInput);
  };

  const getSchemeIcon = (categoryKey, category) => {
    const cat = (categoryKey || category || '').toLowerCase();
    if (cat.includes('student') || cat.includes('education')) {
      return <GraduationCap size={26} className="text-blue-600" />;
    } else if (cat.includes('farmer') || cat.includes('agri')) {
      return <Sprout size={26} className="text-emerald-600" />;
    } else if (cat.includes('women')) {
      return <UserCheck size={26} className="text-rose-500" />;
    } else if (cat.includes('unemployed') || cat.includes('labor') || cat.includes('skill')) {
      return <Briefcase size={26} className="text-sky-600" />;
    } else if (cat.includes('senior') || cat.includes('welfare') || cat.includes('social')) {
      return <Users size={26} className="text-indigo-600" />;
    } else if (cat.includes('health')) {
      return <HeartPulse size={26} className="text-teal-600" />;
    }
    return <Building2 size={26} className="text-blue-600" />;
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
                placeholder="Search schemes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  type="button"
                  className="clear-input-btn"
                  onClick={() => {
                    setSearchInput('');
                    onExecuteSearch('');
                  }}
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

        {/* Results Metadata & Sorting Row */}
        <div className="results-meta-row">
          <p className="results-count-text">
            Showing <strong>{results.length} results</strong> for "{searchQuery || 'all schemes'}"
          </p>

          <div className="sort-by-wrapper">
            <span className="sort-label">Sort by:</span>
            <select
              className="sort-select"
              value={sortBy || 'score-desc'}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score-desc">Best Match</option>
              <option value="score-asc">Score: Low to High</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
            <ChevronDown size={14} className="sort-select-arrow" />
          </div>
        </div>

        {/* Scheme Result Cards List */}
        <div className="scheme-cards-list">
          {results.length === 0 ? (
            <div className="empty-results-card">
              <h3>No government schemes found matching your search</h3>
              <p>Try modifying your search query to view relevant schemes.</p>
              <button
                className="btn-primary mt-4"
                onClick={() => {
                  setSearchInput('');
                  onExecuteSearch('');
                }}
              >
                View All Schemes
              </button>
            </div>
          ) : (
            results.map((scheme) => (
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
                    {/* Header line: Title & Badge */}
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

                      {/* Top-Right Match Percentage Badge */}
                      <div className="match-pill-badge">
                        {scheme.score}% Match
                      </div>
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
                          <strong>Eligibility:</strong> {scheme.quickSummary.eligibility}
                          {scheme.familyIncomeLimit && scheme.familyIncomeLimit !== "No specific income limit" && (
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
      </div>
    </div>
  );
}
