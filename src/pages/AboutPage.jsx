import { Zap, Cpu, ShieldCheck, Database, Search, ArrowRight, Code2 } from 'lucide-react';
import AboutIllustration from '../components/AboutIllustration';

export default function AboutPage({ onExploreClick }) {
  return (
    <div className="about-page-wrapper">
      <div className="about-container">
        {/* Main About Card matching design */}
        <div className="about-hero-card">
          <div className="about-hero-grid">
            {/* Left Column: Text & 3 Badges */}
            <div className="about-content-col">
              <h1 className="about-title">About Our Project</h1>
              
              <p className="about-description">
                The Government Scheme Retrieval System helps citizens find relevant government schemes using an intelligent search approach. We use TF-IDF and Cosine Similarity to match your query with the most suitable schemes from the official government dataset.
              </p>

              {/* 3 Feature Badges matching design */}
              <div className="about-features-row">
                {/* Feature 1 */}
                <div className="about-feature-item">
                  <div className="about-feature-icon-bubble">
                    <Zap size={20} className="text-blue-600" />
                  </div>
                  <div className="about-feature-text">
                    <h4 className="about-feature-title">Fast Search</h4>
                    <p className="about-feature-desc">Get relevant results in seconds</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="about-feature-item">
                  <div className="about-feature-icon-bubble">
                    <Cpu size={20} className="text-blue-600" />
                  </div>
                  <div className="about-feature-text">
                    <h4 className="about-feature-title">Accurate Matching</h4>
                    <p className="about-feature-desc">Powered by TF-IDF + Cosine Similarity</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="about-feature-item">
                  <div className="about-feature-icon-bubble">
                    <ShieldCheck size={20} className="text-blue-600" />
                  </div>
                  <div className="about-feature-text">
                    <h4 className="about-feature-title">Reliable Data</h4>
                    <p className="about-feature-desc">Based on official government sources</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Graphic Illustration */}
            <div className="about-illustration-col">
              <AboutIllustration className="about-svg" />
            </div>
          </div>
        </div>

        {/* Technical Architecture & Methodology Section */}
        <div className="about-tech-section">
          <h2 className="tech-section-title">How the Retrieval Engine Works</h2>
          <div className="tech-cards-grid">
            <div className="tech-card">
              <div className="tech-icon-wrap">
                <Database size={24} className="text-blue-600" />
              </div>
              <h3 className="tech-card-title">Comprehensive Dataset</h3>
              <p className="tech-card-desc">
                Encompassing over 3,400+ Central and State Government schemes across education, agriculture, social welfare, healthcare, and enterprise subsidies.
              </p>
            </div>

            <div className="tech-card">
              <div className="tech-icon-wrap">
                <Code2 size={24} className="text-blue-600" />
              </div>
              <h3 className="tech-card-title">Text Preprocessing & NLP</h3>
              <p className="tech-card-desc">
                Combined corpus of scheme names, eligibility criteria, and detailed benefits tokenized, lowercased, and cleaned using custom regular expressions and stop-word filtering.
              </p>
            </div>

            <div className="tech-card">
              <div className="tech-icon-wrap">
                <Search size={24} className="text-blue-600" />
              </div>
              <h3 className="tech-card-title">TF-IDF Vector Space & Cosine Metric</h3>
              <p className="tech-card-desc">
                Sparse matrix vectorization transforming free-form citizen queries into semantic vector representations to compute cosine angular similarity against all indexed government programs.
              </p>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="about-cta-bar">
            <div>
              <h3 className="cta-title">Ready to find eligible schemes?</h3>
              <p className="cta-subtitle">Search or browse by your profile, income, and state.</p>
            </div>
            <button className="btn-primary" onClick={onExploreClick}>
              <span>Search Schemes Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
