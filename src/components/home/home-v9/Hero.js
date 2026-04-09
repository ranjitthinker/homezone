'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Link from 'next/link';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import SelectDropdown from '@/components/home/home-v2/hero/SelectDropdown';
import { useSettings } from '@/context/SettingsProvider';

import Image from 'next/image';

const Hero = () => {
  const settings = useSettings();
  const heroBanner = settings?.data?.find((item) => item.key === 'Hero_banner')?.value || '';
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
          params: { per_page: 3 }, // ✅ limit to 3
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
      <div
        className="inner-banner-style4 d-flex align-items-center"
        style={{
          height: '90vh',
          backgroundImage: `url("${heroBanner}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
                        data-bs-target="#advanceSeachModal"
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
