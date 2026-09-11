import { useState } from 'react';
import {
  Search,
  GraduationCap,
  Sprout,
  UserCheck,
  Briefcase,
  Users,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  MapPin
} from 'lucide-react';
import ParliamentIllustration from '../components/ParliamentIllustration';
import { CATEGORY_TILES } from '../data/schemesData';

export default function HomePage({ onSearch, onCategorySelect }) {
  const [queryInput, setQueryInput] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (queryInput.trim()) {
      onSearch(queryInput.trim());
    } else {
      onSearch('scholarship for students');
    }
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="cat-icon-svg text-blue-600" size={24} />;
      case 'Sprout':
        return <Sprout className="cat-icon-svg text-emerald-600" size={24} />;
      case 'UserCheck':
        return <UserCheck className="cat-icon-svg text-rose-500" size={24} />;
      case 'Briefcase':
        return <Briefcase className="cat-icon-svg text-sky-600" size={24} />;
      case 'Users':
        return <Users className="cat-icon-svg text-indigo-600" size={24} />;
      case 'Grid':
      default:
        return <LayoutGrid className="cat-icon-svg text-blue-600" size={24} />;
    }
  };

  return (
    <div className="home-page-wrapper">
      {/* Hero Main Section */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Left Column: Heading, Search & Category Tiles */}
          <div className="hero-content">
            <h1 className="hero-heading">
              Find Government Schemes You Are Eligible For
            </h1>
            
            <p className="hero-subheading">
              Enter your needs, location or category and discover the best government schemes tailored for you.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleFormSubmit} className="hero-search-form">
              <div className="hero-search-bar">
                <Search className="hero-search-icon" size={20} />
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="e.g. scholarship for students, loan for farmers, health scheme..."
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  aria-label="Search government schemes"
                />
                <button type="submit" className="hero-search-btn">
                  Search
                </button>
              </div>
            </form>

            {/* 6 Category Access Cards */}
            <div className="category-tiles-grid">
              {CATEGORY_TILES.map((cat) => (
                <button
                  key={cat.id}
                  className="category-card"
                  onClick={() => onCategorySelect(cat.id)}
                  type="button"
                >
                  <div
                    className="category-icon-bubble"
                    style={{ backgroundColor: cat.bg, color: cat.color }}
                  >
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="category-label">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Parliament / Sansad Bhavan Illustration */}
          <div className="hero-illustration-col">
            <div className="illustration-card">
              <ParliamentIllustration className="hero-svg" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Feature Cards Bar */}
      <section className="features-trust-section">
        <div className="features-trust-container">
          {/* Card 1: Trusted Information */}
          <div className="trust-card">
            <div className="trust-icon-bubble trust-icon-teal">
              <ShieldCheck size={22} />
            </div>
            <div className="trust-text">
              <h4 className="trust-title">Trusted Information</h4>
              <p className="trust-desc">From Government Sources</p>
            </div>
          </div>

          {/* Card 2: Accurate Results */}
          <div className="trust-card">
            <div className="trust-icon-bubble trust-icon-blue">
              <Sparkles size={22} />
            </div>
            <div className="trust-text">
              <h4 className="trust-title">Accurate Results</h4>
              <p className="trust-desc">Using TF-IDF + Cosine Similarity</p>
            </div>
          </div>

          {/* Card 3: Easy Access */}
          <div className="trust-card">
            <div className="trust-icon-bubble trust-icon-green">
              <MapPin size={22} />
            </div>
            <div className="trust-text">
              <h4 className="trust-title">Easy Access</h4>
              <p className="trust-desc">Find schemes in your state</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
