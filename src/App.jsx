import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import AboutPage from './pages/AboutPage';
import { fetchSchemeResults } from './api/schemesApi';
import { SCHEMES_DATA } from './data/schemesData';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('scholarship for students');
  const [selectedScheme, setSelectedScheme] = useState(SCHEMES_DATA[0] || null);
  const [sortBy, setSortBy] = useState('score-desc');
  const [results, setResults] = useState(SCHEMES_DATA);

  // Fetch results whenever searchQuery or sortBy changes
  useEffect(() => {
    let isCurrent = true;
    async function getResults() {
      const response = await fetchSchemeResults(searchQuery, sortBy);
      if (isCurrent && response?.results) {
        setResults(response.results);
      }
    }
    getResults();
    return () => {
      isCurrent = false;
    };
  }, [searchQuery, sortBy]);

  // Actions & Navigation Handlers
  const handleSearch = (query) => {
    setSearchQuery(query || '');
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'All Categories') {
      setSearchQuery('');
    } else {
      setSearchQuery(categoryId.toLowerCase());
    }
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScheme = (scheme) => {
    if (scheme) {
      setSelectedScheme(scheme);
      setActivePage('details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToResults = () => {
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchClick={() => {
          setActivePage('search');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Page Routing Switch */}
      <main className="main-content">
        {activePage === 'home' && (
          <HomePage
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
          />
        )}

        {activePage === 'search' && (
          <SearchResultsPage
            key={searchQuery}
            searchQuery={searchQuery}
            results={results}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onBack={handleBackToHome}
            onSelectScheme={handleSelectScheme}
            onExecuteSearch={handleSearch}
          />
        )}

        {activePage === 'details' && (
          <SchemeDetailsPage
            scheme={selectedScheme}
            searchQuery={searchQuery}
            onBack={handleBackToResults}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onExploreClick={() => {
              setActivePage('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>
    </div>
  );
}
