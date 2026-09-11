import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import EmblemIcon from './EmblemIcon';

export default function Header({ activePage, setActivePage, onSearchClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo & Title */}
        <div className="header-brand" onClick={() => handleNav('home')} role="button" tabIndex={0}>
          <div className="emblem-wrapper">
            <EmblemIcon className="emblem-svg" color="#FFFFFF" />
          </div>
          <span className="brand-title">Government Scheme Retrieval System</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <button
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            About
          </button>
          
          {/* Header Right Search Icon */}
          <div className="header-icons">
            <button
              className="icon-btn"
              title="Search schemes"
              onClick={onSearchClick || (() => handleNav('search'))}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="mobile-toggle">
          <button
            className="icon-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <button
            className={`mobile-nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`mobile-nav-link ${activePage === 'search' ? 'active' : ''}`}
            onClick={() => handleNav('search')}
          >
            Search Results
          </button>
          <button
            className={`mobile-nav-link ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            About
          </button>
        </div>
      )}
    </header>
  );
}
