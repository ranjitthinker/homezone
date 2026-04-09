'use client';
import SidebarPanel from '@/components/common/sidebar-panel';
import LoginSignupModal from '@/components/common/login-signup-modal';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsProvider';
import SelectDropdown from '@/components/home/home-v2/hero/SelectDropdown';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import AdvanceFilterModal from '@/components/common/advance-filter';
import MainMenu from './MainMenu';

const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [cityId, setCityId] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const settings = useSettings();

  const isHomePage = pathname === '/';

  const siteLogo = settings?.data?.find((item) => item.key === 'site_logo')?.value || '/images/header-logo2.svg';

  // ✅ Mount flag — fixes hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Search suggestions with debounce
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        setSearching(true);
        const params = { q: search };
        if (cityId) params.city_id = cityId;
        const res = await apiService.get(`${API_URLS.PROPERTY}`, { params });
        setSuggestions(res.data?.data ?? []);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [search, cityId]);

  // ✅ Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Sticky nav on scroll
  useEffect(() => {
    const changeBackground = () => setNavbar(window.scrollY >= 20);
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  // ✅ Detect when scrolled past hero section on home page
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      // ✅ Try multiple specific selectors in order of priority
      const heroSection = document.getElementById('hero-x');

      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom; // ✅ use getBoundingClientRect, not offsetTop
        setScrolledPastHero(heroBottom <= 0); // ✅ true only when hero is completely scrolled out of view
      } else {
        // Fallback: full viewport height
        setScrolledPastHero(window.scrollY > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleSearchSubmit = () => {
    setShowSuggestions(false);
    const query = new URLSearchParams({
      ...(search && { q: search }),
      ...(cityId && { city_id: cityId }),
    });
    router.push(`/properties?${query.toString()}`);
  };

  // ✅ Auto-detect location via browser geolocation
  const handleAutoDetectLocation = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // TODO: Call your reverse-geocode API to get city_id from lat/lng
          // const response = await apiService.post('/detect-city', { lat: latitude, lng: longitude });
          // setCityId(String(response.data.city_id));
          console.log('Detected coordinates:', latitude, longitude);
        } catch (error) {
          console.error('Failed to match location to a city', error);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsDetectingLocation(false);
        alert('Could not detect location. Please select your city manually.');
      }
    );
  };

  return (
    <>
      <style>{`
        /* styles/DefaultHeader.module.css  OR add to your main.scss */

.glass-header-pro {
  background: #f6dcbc !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.8);
  transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1);
}
.search-master-wrapper {
  position: relative;
  width: 100%;
  max-width: 700px;
}
.search-island-pill {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 60px;
  padding: 8px 10px 8px 20px;
  transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}
.search-island-pill:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.search-island-pill.is-focused {
  box-shadow: 0 12px 36px rgba(235,103,83,0.15);
  border-color: rgba(235,103,83,0.4);
  background: #fffdfc;
}
.invisible-input {
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  font-size: 15px;
  color: #222;
  box-shadow: none !important;
  outline: none !important;
  width: 100%;
}
.invisible-input::placeholder { color: #888; font-weight: 400; }
.btn-detect {
  background: #f5f5f5;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.2s;
  cursor: pointer;
  flex-shrink: 0;
}
.btn-detect:hover { background: #cf933b; color: white; }
.btn-text-only {
  font-size: 14px;
  font-weight: 500;
  color: #444;
  background: transparent;
  border: none;
  padding: 8px 14px;
  border-radius: 30px;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-text-only:hover { background: #f0f0f0; color: #111; }
.btn-solid-action {
  background: linear-gradient(135deg, #f0932b, #eb6753);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 18px;
  border-radius: 40px;
  border: none;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(235,103,83,0.3);
  white-space: nowrap;
}
.btn-solid-action:hover { transform: scale(1.04); box-shadow: 0 8px 25px rgba(235,103,83,0.45); }
@keyframes slideDownFadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.floating-dropdown {
  animation: slideDownFadeIn 0.3s ease forwards;
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden;
  z-index: 9999;
}
.drop-item {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s;
  cursor: pointer;
}
.drop-item:hover { background: #fafafa; }
.circle-menu-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e2e2e2;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.circle-menu-btn:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.pill-divider {
  width: 1px;
  height: 28px;
  background: #e2e2e2;
  margin: 0 14px;
  flex-shrink: 0;
}
        }
      `}</style>

      <header
        className={`glass-header-pro d-none d-lg-block ${navbar ? 'shadow-sm' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '12px 0',
          transition: 'padding 0.4s ease',
        }}
      >
        <div className="container-fluid px-4">
          {/* ✅ Single flex row — logo | middle | hamburger */}
          <div className="d-flex align-items-center justify-content-between gap-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image width={140} height={45} src={siteLogo} alt="Header Logo" style={{ objectFit: 'contain' }} />
              </Link>
            </div>

            {/* ✅ Middle section — null on server, conditional on client */}
            <div className="flex-grow-1 d-none d-lg-flex justify-content-center">
              {!mounted ? null : isHomePage && !scrolledPastHero ? (
                // ✅ Home page (before scrolling past hero) → Main Menu
                <MainMenu />
              ) : (
                // ✅ Home page (after scrolling past hero) or other pages → Search Bar
                <div className="search-master-wrapper" ref={wrapperRef}>
                  <div className={`search-island-pill ${isFocused ? 'is-focused' : ''}`}>
                    {/* City dropdown */}
                    <div style={{ minWidth: '120px', flexShrink: 0 }}>
                      <SelectDropdown onChange={(selected) => setCityId(selected?.value || '')} />
                    </div>

                    {/* Auto-detect location button */}
                    <button
                      type="button"
                      className="btn-detect ms-2"
                      onClick={handleAutoDetectLocation}
                      title="Detect my location"
                    >
                      {isDetectingLocation ? (
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <span className="fa fa-map-marker-alt" style={{ fontSize: '14px' }} />
                      )}
                    </button>

                    {/* Divider */}
                    <div className="pill-divider" />

                    {/* Keyword input */}
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                      <input
                        className="invisible-input"
                        type="text"
                        placeholder="Search properties..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => {
                          setIsFocused(true);
                          if (suggestions.length) setShowSuggestions(true);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                        autoComplete="off"
                      />
                      {searching && (
                        <span
                          className="spinner-border spinner-border-sm position-absolute"
                          style={{ right: 0, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}
                        />
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="d-flex align-items-center ms-2 gap-1 flex-shrink-0">
                      <button
                        className="btn-text-only"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#advanceSeachModalTwo"
                      >
                        <span className="flaticon-settings" /> Advanced
                      </button>
                      <button className="btn-solid-action" type="button" onClick={handleSearchSubmit}>
                        <i className="flaticon-search" />
                      </button>
                    </div>
                  </div>

                  {/* ✅ Suggestions dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="floating-dropdown">
                      {suggestions.map((property) => (
                        <Link
                          key={property.id}
                          href={`/property/${property.slug}`}
                          onClick={() => setShowSuggestions(false)}
                          className="drop-item"
                        >
                          <div
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '10px',
                              background: '#fff5f3',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#eb6753',
                              fontSize: '16px',
                              flexShrink: 0,
                            }}
                          >
                            <span className="flaticon-home-1" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: '#1a1a1a' }}>{property.title}</div>
                            <div style={{ fontSize: '12px', color: '#777' }}>
                              {property.location?.address || 'N/A'} &bull;{' '}
                              <span style={{ color: '#eb6753', fontWeight: 600 }}>
                                ₹{Number(property.price).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div
                        onClick={handleSearchSubmit}
                        style={{
                          padding: '14px',
                          textAlign: 'center',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: '13px',
                          background: '#fafafa',
                          color: '#1a1a1a',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#eb6753')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#1a1a1a')}
                      >
                        Show all results &rarr;
                      </div>
                    </div>
                  )}

                  {/* ✅ No results */}
                  {showSuggestions && !searching && suggestions.length === 0 && search.trim() && (
                    <div className="floating-dropdown" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                      No properties found for "{search}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ✅ Hamburger — always right */}
            {!isHomePage && (
              <div className="flex-shrink-0">
                <a
                  className="circle-menu-btn"
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#mobileMenu"
                  aria-controls="mobileMenu"
                >
                  <Image width={20} height={14} src="/images/dark-nav-icon.svg" alt="menu" />
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      {/* <div style={{ height: '69px' }} className="d-none d-lg-block" /> */}

      {/* ✅ Advance filter modal — only on client, only on non-home pages */}
      {mounted && !isHomePage && (
        <div className="advance-feature-modal">
          <div className="modal fade" id="advanceSeachModal" tabIndex={-1} aria-hidden="true">
            <AdvanceFilterModal />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div className="modal fade" id="loginSignupModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="SidebarPanel" aria-labelledby="SidebarPanelLabel">
        <SidebarPanel />
      </div>
    </>
  );
};

export default DefaultHeader;
