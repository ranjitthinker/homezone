'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import { toast } from 'react-hot-toast';

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('favorite_properties') || '{}');
      setFavorites(saved);
    } catch (_) {}

    const fetchListings = async () => {
      try {
        const res = await apiService.get(`${API_URLS.PROPERTY}`);
        setListings(res.data?.data ?? []);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const toggleFavorite = (e, listing) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem('favorite_properties') || '{}');
      const isFav = !saved[listing.id];
      if (isFav) {
        saved[listing.id] = { id: listing.id, title: listing.title, slug: listing.slug, price: listing.price };
        toast.success(`"${listing.title}" added to favorites!`);
      } else {
        delete saved[listing.id];
        toast.success(`Removed from favorites.`);
      }
      localStorage.setItem('favorite_properties', JSON.stringify(saved));
      setFavorites({ ...saved });
    } catch (_) {}
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <>
      <Swiper
        className="overflow-visible"
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.featured-next__active',
          prevEl: '.featured-prev__active',
        }}
        pagination={{
          el: '.featured-pagination__active',
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {listings.slice(0, 8).map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    style={{ aspectRatio: '1170/600' }}
                    className="w-100 h-100 cover"
                    src={listing.image || '/images/listings/listing-single-slide1.jpg'}
                    alt={listing.title}
                  />
                  <div className="sale-sticker-wrap">
                    {listing.listed_in !== 'rent' && (
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="list-price">
                    ₹{Math.round(Number(listing.price || 0)).toLocaleString('en-IN')}{' '}
                    {listing.listed_in === 'rent' && <span>/ mo</span>}
                  </div>
                </div>

                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/property/${listing.slug}`}>{listing.title}</Link>
                  </h6>
                  <p className="list-text">{listing.location?.address || 'N/A'}</p>
                  <div className="list-meta d-flex align-items-center">
                    <span className="me-3">
                      <span className="flaticon-bed" /> {listing.bedrooms ?? 0} bed
                    </span>
                    <span className="me-3">
                      <span className="flaticon-shower" /> {listing.bathrooms ?? 0} bath
                    </span>
                    <span>
                      <span className="flaticon-expand" /> {listing.size_ft ?? 0} sqft
                    </span>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">
                      For {listing.listed_in === 'rent' ? 'Rent' : 'Sale'}
                    </span>
                    <div className="icons d-flex align-items-center gap-2">
                      <Link
                        href={`/property/${listing.slug}`}
                        title="View Property"
                        className="text-dark"
                      >
                        <span className="flaticon-fullscreen" />
                      </Link>
                      <Link
                        href={`/property/${listing.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in new tab"
                        className="text-dark"
                      >
                        <span className="flaticon-new-tab" />
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(e, listing)}
                        title={favorites[listing.id] ? "Remove from favorites" : "Save to favorites"}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          color: favorites[listing.id] ? '#e53935' : 'inherit',
                          lineHeight: 1,
                        }}
                      >
                        <span className="flaticon-like" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeaturedListings;
