'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Link from 'next/link';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import SelectDropdown from '@/components/home/home-v2/hero/SelectDropdown';
const FALLBACK_IMAGE = '/images/home/home-9.jpg';
import Image from 'next/image';

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

  const [cityOptions, setCityOptions] = useState([]);

  const handleAutoDetectLocation = () => {
    if (typeof window === 'undefined') return;

    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          let detectedCityName = '';

          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (res.ok) {
              const data = await res.json();
              detectedCityName = data.city || data.locality || data.principalSubdivision || '';
            }
          } catch (e) {
            console.warn('BigDataCloud error:', e);
          }

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
              console.warn('Nominatim error:', e);
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
          console.error('Failed to match location to a city', error);
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
          backgroundImage: `url("/images/about/element-9.jpg.jpeg.png")`,
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
