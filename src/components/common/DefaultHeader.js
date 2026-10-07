'use client';
import SidebarPanel from '@/components/common/sidebar-panel';
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

  const [cityOptions, setCityOptions] = useState([]);

  // ✅ Auto-detect location via browser geolocation
  const handleAutoDetectLocation = () => {
    if (typeof window === 'undefined') return;

    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10s max timeout to prevent infinite stuck state
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          let detectedCityName = '';

          // 1. Primary: Fast client-side reverse geocoding via BigDataCloud
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (res.ok) {
              const data = await res.json();
              detectedCityName = data.city || data.locality || data.principalSubdivision || '';
            }
          } catch (e) {
            console.warn('BigDataCloud geocode lookup error:', e);
          }

          // 2. Fallback: OpenStreetMap Nominatim
          if (!detectedCityName) {
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              if (res.ok) {
                const data = await res.json();
                detectedCityName =
                  data.address?.city ||
                  data.address?.town ||
                  data.address?.state_district ||
                  data.address?.county ||
                  '';
              }
            } catch (e) {
              console.warn('Nominatim reverse geocode error:', e);
            }
          }

          if (detectedCityName) {
            const clean = detectedCityName.trim().toLowerCase();
            const matched = cityOptions.find(
              (c) =>
                c.value &&
                (c.label.toLowerCase().includes(clean) || clean.includes(c.label.toLowerCase()))
            );

            if (matched) {
              setCityId(matched.value);
            }
          }
        } catch (error) {
          console.error('Failed to detect city from coordinates', error);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsDetectingLocation(false);
        if (error.code === 1) {
          alert('Location permission was denied. Please allow location access or choose your city manually.');
        } else if (error.code === 2) {
          alert('Location unavailable. Please choose your city manually.');
        } else if (error.code === 3) {
          alert('Location request timed out. Please try again or select manually.');
        }
      },
      geoOptions
    );
  };

  // ✅ Open Advanced Filter Modal reliably on all pages
  const handleOpenAdvanceModal = async (e) => {
    if (e) e.preventDefault();
    if (typeof window === 'undefined') return;

    const modalId = 'headerAdvanceSearchModal';
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    try {
      const bootstrap = await import('bootstrap');
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance.show();
      return;
    } catch (err) {
      console.warn('Bootstrap modal show fallback:', err);
    }

    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    modalEl.removeAttribute('aria-hidden');
    modalEl.setAttribute('aria-modal', 'true');
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
    document.body.classList.add('modal-open');
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
  background: #f7f7f8 !important;
  border: 1px solid #e5e7eb !important;
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 50% !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #6b7280 !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
  box-sizing: border-box !important;
  position: relative !important;
  line-height: 1 !important;
  overflow: hidden !important;
}
.btn-detect:hover {
  background: #eb6753 !important;
  border-color: #eb6753 !important;
  color: #ffffff !important;
  transform: scale(1.06);
  box-shadow: 0 4px 12px rgba(235, 103, 83, 0.35);
}
.btn-detect:hover .location-icon {
  color: #ffffff !important;
}
.btn-detect.is-detecting,
.btn-detect:disabled {
  background: #fff5f3 !important;
  border-color: #ffdcd6 !important;
  color: #eb6753 !important;
  cursor: wait !important;
  pointer-events: none;
}
.live-location-spinner {
  width: 16px !important;
  height: 16px !important;
  min-width: 16px !important;
  min-height: 16px !important;
  max-width: 16px !important;
  max-height: 16px !important;
  border: 2px solid rgba(235, 103, 83, 0.22) !important;
  border-top-color: #eb6753 !important;
  border-right-color: #eb6753 !important;
  border-radius: 50% !important;
  animation: liveLocationSpin 0.75s linear infinite !important;
  box-sizing: border-box !important;
  display: inline-block !important;
  flex-shrink: 0 !important;
  aspect-ratio: 1 / 1 !important;
}
@keyframes liveLocationSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.location-icon {
  font-size: 13px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  color: inherit !important;
}
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
.pill-divider {
  width: 1px;
  height: 28px;
  background: #e2e2e2;
  margin: 0 14px;
  flex-shrink: 0;
}
.header-contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #eb6753, #e0533d);
  color: #ffffff !important;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  padding: 12px 24px;
  border-radius: 60px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 14px rgba(235, 103, 83, 0.35);
  border: none;
  white-space: nowrap;
  cursor: pointer;
}
.header-contact-btn:hover {
  background: linear-gradient(135deg, #e0533d, #c94430);
  color: #ffffff !important;
  box-shadow: 0 6px 20px rgba(235, 103, 83, 0.5);
  transform: translateY(-2px);
}
.header-contact-btn .btn-icon {
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
      `}</style>

      <header
        className="glass-header-pro d-none d-lg-block header-nav nav-homepage-style light-header menu-home4 main-menu sticky slideInDown animated"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
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
                      <SelectDropdown
                        value={cityId}
                        onCitiesLoaded={setCityOptions}
                        onChange={(selected) => setCityId(selected?.value || '')}
                      />
                    </div>

                    {/* Auto-detect location button */}
                    <button
                      type="button"
                      className={`btn-detect ms-2 ${isDetectingLocation ? 'is-detecting' : ''}`}
                      onClick={handleAutoDetectLocation}
                      disabled={isDetectingLocation}
                      title={isDetectingLocation ? 'Detecting your city...' : 'Detect my location'}
                      aria-label="Detect my location"
                    >
                      {isDetectingLocation ? (
                        <span className="live-location-spinner" role="status" aria-hidden="true" />
                      ) : (
                        <span className="fa fa-map-marker-alt location-icon" />
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
                        data-bs-target="#headerAdvanceSearchModal"
                        onClick={handleOpenAdvanceModal}
                        title="Advanced Filters"
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

            {/* ✅ Contact Us CTA Button — replaces old hamburger menu */}
            <div className="flex-shrink-0">
              <Link href="/contact" className="header-contact-btn">
                <span className="flaticon-call btn-icon" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Spacer for non-home pages so content is not hidden behind fixed header on desktop */}
      {!isHomePage && <div style={{ height: '94px' }} className="d-none d-lg-block" />}

      {/* ✅ Advance filter modal — rendered on all pages once mounted */}
      {mounted && (
        <div className="advance-feature-modal">
          <div className="modal fade" id="headerAdvanceSearchModal" tabIndex={-1} aria-hidden="true">
            <AdvanceFilterModal />
          </div>
        </div>
      )}

      {/* Sidebar Panel */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="SidebarPanel" aria-labelledby="SidebarPanelLabel">
        <SidebarPanel />
      </div>
    </>
  );
};

export default DefaultHeader;
