
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";
import SelectDropdown from '@/components/home/home-v2/hero/SelectDropdown';
const FALLBACK_IMAGE = '/images/home/home-9.jpg';
import Image from "next/image";

const Hero = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cityId, setCityId] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await apiService.get(`${API_URLS.PROPERTY}`, {
          params: { per_page: 3 }   // ✅ limit to 3
        });
        setProperties(res.data?.data ?? []);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleAutoDetectLocation = () => {
    setIsDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsDetectingLocation(false);
        },
        () => {
          setIsDetectingLocation(false);
        }
      );
    } else {
      setIsDetectingLocation(false);
    }
  };

  const handleSearchSubmit = () => {
    setShowSuggestions(false);
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  return (
    <>
      <style jsx>{`
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
      <div
  className="inner-banner-style4 d-flex align-items-center"
  style={{
    height: "90vh",
    backgroundImage: `url("/images/about/element-9.jpg.jpeg.png")`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="container h-100">
    <div className="row h-100 align-items-center justify-content-center">
      <div className="col-xl-8 col-lg-10 text-center">
        
        <h2 className="hero-title animate-up-1 text-white">
          Easy Way to Find a <br className="d-none d-md-block" />
          Perfect Property
        </h2>

        <p className="hero-text fz15 animate-up-2 text-white">
          From as low as $10 per day with limited time offer discounts
        </p>

        {/* Search Bar */}
        <div className="mt-4 d-flex justify-content-center animate-up-3">
          <div className="search-master-wrapper" ref={wrapperRef}>
            <div className={`search-island-pill ${isFocused ? 'is-focused' : ''}`}>

              {/* City dropdown */}
              <div style={{ minWidth: '120px', flexShrink: 0 }}>
                <SelectDropdown
                  onChange={(selected) => setCityId(selected?.value || '')}
                />
              </div>

              {/* Auto-detect location button */}
              <button
                type="button"
                className="btn-detect ms-2"
                onClick={handleAutoDetectLocation}
                title="Detect my location">
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
                  data-bs-target="#advanceSeachModal">
                  <span className="flaticon-settings" /> Advanced
                </button>
                <button
                  className="btn-solid-action"
                  type="button"
                  onClick={handleSearchSubmit}>
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
                    className="drop-item">
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '10px',
                      background: '#fff5f3', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#eb6753', fontSize: '16px', flexShrink: 0,
                    }}>
                      <span className="flaticon-home-1" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#1a1a1a' }}>
                        {property.title}
                      </div>
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
                    padding: '14px', textAlign: 'center', fontWeight: 700,
                    cursor: 'pointer', fontSize: '13px', background: '#fafafa', color: '#1a1a1a',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#eb6753'}
                  onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
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
        </div>

      </div>
    </div>
  </div>

  {/* Floating Images */}
  {/* <div className="home4-floatin-img">
    <Image
      width={140}
      height={120}
      className="img-1 spin-left d-none d-xl-block contain"
      src="/images/about/element-10.png"
      alt="image"
    />
    <Image
      width={160}
      height={103}
      className="img-2 bounce-y d-none d-xl-block"
      src="/images/about/element-9.png"
      alt="image"
    />
  </div> */}
</div>
    </>
  );
};
export default Hero;
