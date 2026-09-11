import { useState } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Sprout,
  UserCheck,
  Briefcase,
  Users,
  Building2,
  Globe,
  ExternalLink,
  CheckCircle2,
  FileText,
  DollarSign,
  Landmark,
  Award
} from 'lucide-react';
import HighlightedText from '../components/HighlightedText';

export default function SchemeDetailsPage({ scheme, searchQuery = '', onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!scheme) {
    return (
      <div className="details-empty-state">
        <p>No scheme selected.</p>
        <button className="back-nav-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Results</span>
        </button>
      </div>
    );
  }

  const getSchemeIcon = (categoryKey, category) => {
    const cat = (categoryKey || category || '').toLowerCase();
    if (cat.includes('student') || cat.includes('education')) {
      return <GraduationCap size={32} className="text-blue-600" />;
    } else if (cat.includes('farmer') || cat.includes('agri') || cat.includes('fisher')) {
      return <Sprout size={32} className="text-emerald-600" />;
    } else if (cat.includes('women') || cat.includes('girl')) {
      return <UserCheck size={32} className="text-rose-500" />;
    } else if (cat.includes('unemployed') || cat.includes('labor') || cat.includes('skill') || cat.includes('job')) {
      return <Briefcase size={32} className="text-sky-600" />;
    } else if (cat.includes('senior') || cat.includes('welfare') || cat.includes('social') || cat.includes('pension')) {
      return <Users size={32} className="text-indigo-600" />;
    }
    return <Building2 size={32} className="text-blue-600" />;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'application', label: 'Application Process' },
    { id: 'documents', label: 'Documents Required' }
  ];

  return (
    <div className="scheme-details-page">
      <div className="details-container">
        {/* Back navigation link */}
        <div className="details-back-wrap">
          <button className="back-nav-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Results</span>
          </button>
        </div>

        {/* Main Scheme Header Card */}
        <div className="scheme-header-card">
          <div className="scheme-header-top">
            <div className="scheme-header-left">
              <div className="scheme-large-avatar">
                {getSchemeIcon(scheme.categoryKey, scheme.category)}
              </div>
              <div className="scheme-header-titles">
                <div className="scheme-title-row">
                  <h1 className="scheme-main-title">
                    <HighlightedText text={scheme.name} query={searchQuery} />
                  </h1>
                </div>
                <div className="scheme-tag-row">
                  <span className="category-pill-badge">
                    <HighlightedText text={scheme.category} query={searchQuery} />
                  </span>
                </div>
              </div>
            </div>

            {/* Match percentage pill */}
            <div className="match-pill-badge scheme-header-match">
              {scheme.score || scheme.matchScore || 92}% Match
            </div>
          </div>

          <p className="scheme-header-description">
            <HighlightedText text={scheme.fullDescription || scheme.shortDescription} query={searchQuery} />
          </p>

          {/* 3 Info Columns matching design */}
          <div className="scheme-three-columns">
            {/* Department */}
            <div className="info-col-item">
              <div className="info-col-icon-wrap">
                <Landmark size={20} className="text-blue-600" />
              </div>
              <div className="info-col-text">
                <span className="info-col-label">Department</span>
                <span className="info-col-value font-medium">
                  <HighlightedText text={scheme.department || scheme.category} query={searchQuery} />
                </span>
                {scheme.ministry && scheme.ministry !== scheme.department && (
                  <span className="info-col-sub">
                    <HighlightedText text={scheme.ministry} query={searchQuery} />
                  </span>
                )}
              </div>
            </div>

            {/* Offered by */}
            <div className="info-col-item">
              <div className="info-col-icon-wrap">
                <Building2 size={20} className="text-blue-600" />
              </div>
              <div className="info-col-text">
                <span className="info-col-label">Offered by</span>
                <span className="info-col-value font-medium">{scheme.offeredBy || 'Government of India'}</span>
              </div>
            </div>

            {/* Official Website */}
            <div className="info-col-item">
              <div className="info-col-icon-wrap">
                <Globe size={20} className="text-blue-600" />
              </div>
              <div className="info-col-text">
                <span className="info-col-label">Official Website</span>
                <a
                  href={scheme.officialWebsite || 'https://www.myscheme.gov.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-col-link"
                >
                  {scheme.officialWebsite || 'https://www.myscheme.gov.in'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Underline Bar */}
        <div className="scheme-tabs-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`scheme-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content & Sidebar Grid */}
        <div className="scheme-tab-layout">
          {/* Left Column: Active Tab Content */}
          <div className="tab-main-col">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="tab-pane">
                <h3 className="pane-heading">Scheme Details</h3>

                {/* Scheme Key-Value Table matching design */}
                <div className="scheme-details-table">
                  <div className="detail-row">
                    <span className="detail-key">Name of the Scheme</span>
                    <span className="detail-val font-semibold">
                      <HighlightedText text={scheme.name} query={searchQuery} />
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">Category</span>
                    <span className="detail-val">
                      <HighlightedText text={scheme.category} query={searchQuery} />
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">Target Beneficiaries</span>
                    <span className="detail-val">
                      <HighlightedText text={scheme.targetBeneficiaries || scheme.category} query={searchQuery} />
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">Family Income Limit</span>
                    <span className="detail-val">{scheme.familyIncomeLimit || 'As per scheme norms'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">State</span>
                    <span className="detail-val">{scheme.state || 'All India'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">Application Mode</span>
                    <span className="detail-val">{scheme.applicationMode || 'Online / CSC Centers'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">Last Date to Apply</span>
                    <span className="detail-val">{scheme.lastDateToApply || 'Open Throughout Year'}</span>
                  </div>
                </div>

                {scheme.overview?.highlights && scheme.overview.highlights.length > 0 && (
                  <div className="highlights-box">
                    <h4 className="highlights-title">Key Highlights</h4>
                    <ul className="highlights-list">
                      {scheme.overview.highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="text-blue-600 flex-shrink-0" />
                          <span>
                            <HighlightedText text={h} query={searchQuery} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action button at bottom */}
                <div className="tab-action-footer">
                  <a
                    href={scheme.officialWebsite || 'https://www.myscheme.gov.in'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-visit-website"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            )}

            {/* Tab 2: Eligibility */}
            {activeTab === 'eligibility' && (
              <div className="tab-pane">
                <h3 className="pane-heading">Eligibility Criteria</h3>
                <div className="eligibility-list">
                  {(scheme.eligibilityDetails || ['Open to eligible citizens meeting prescribed guidelines.']).map((criterion, idx) => (
                    <div key={idx} className="criterion-card">
                      <div className="criterion-num">{idx + 1}</div>
                      <p className="criterion-text">
                        <HighlightedText text={criterion} query={searchQuery} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Benefits */}
            {activeTab === 'benefits' && (
              <div className="tab-pane">
                <h3 className="pane-heading">Financial & Welfare Benefits</h3>
                <div className="benefits-list">
                  {(scheme.benefitsDetails || ['Direct financial subsidy or welfare assistance as per government guidelines.']).map((benefit, idx) => (
                    <div key={idx} className="benefit-item">
                      <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                      <p className="benefit-text">
                        <HighlightedText text={benefit} query={searchQuery} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Application Process */}
            {activeTab === 'application' && (
              <div className="tab-pane">
                <h3 className="pane-heading">Step-by-Step Application Process</h3>
                <div className="steps-timeline">
                  {(scheme.applicationProcess || [{ step: 1, title: 'Online Registration', desc: 'Visit the official government portal to apply.' }]).map((stepObj, sIdx) => (
                    <div key={stepObj.step || sIdx + 1} className="step-item">
                      <div className="step-badge">Step {stepObj.step || sIdx + 1}</div>
                      <div className="step-content">
                        <h4 className="step-title">{stepObj.title}</h4>
                        <p className="step-desc">
                          <HighlightedText text={stepObj.desc} query={searchQuery} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Documents Required */}
            {activeTab === 'documents' && (
              <div className="tab-pane">
                <h3 className="pane-heading">Documents Required</h3>
                <div className="documents-grid">
                  {(scheme.documentsRequired || ['Aadhaar Card / ID Proof', 'Income / Category Certificate', 'Bank Passbook']).map((doc, idx) => (
                    <div key={idx} className="doc-card">
                      <FileText size={18} className="text-blue-600 flex-shrink-0" />
                      <span className="doc-title">
                        <HighlightedText text={doc} query={searchQuery} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Quick Summary Card matching design */}
          <div className="tab-sidebar-col">
            <div className="quick-summary-card">
              <h4 className="quick-summary-title">Quick Summary</h4>

              <div className="summary-item">
                <div className="summary-icon-bubble">
                  <GraduationCap size={20} className="text-teal-700" />
                </div>
                <div className="summary-text">
                  <span className="summary-label">Eligibility</span>
                  <p className="summary-value">
                    <HighlightedText text={scheme.quickSummary?.eligibility || 'Eligible Applicants'} query={searchQuery} />
                  </p>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon-bubble">
                  <Award size={20} className="text-teal-700" />
                </div>
                <div className="summary-text">
                  <span className="summary-label">Benefits</span>
                  <p className="summary-value">
                    <HighlightedText text={scheme.quickSummary?.benefits || 'Financial / Welfare Grant'} query={searchQuery} />
                  </p>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon-bubble">
                  <DollarSign size={20} className="text-teal-700" />
                </div>
                <div className="summary-text">
                  <span className="summary-label">Income Limit</span>
                  <p className="summary-value">
                    <HighlightedText text={scheme.quickSummary?.incomeLimit || scheme.familyIncomeLimit || 'As per scheme norms'} query={searchQuery} />
                  </p>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-icon-bubble">
                  <Building2 size={20} className="text-teal-700" />
                </div>
                <div className="summary-text">
                  <span className="summary-label">Level</span>
                  <p className="summary-value">
                    <HighlightedText text={scheme.quickSummary?.level || scheme.offeredBy || 'Central / State Government'} query={searchQuery} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
