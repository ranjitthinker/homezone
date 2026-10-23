'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import { toast } from 'react-hot-toast';

const FeaturedListings = () => {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  const handleCardClick = (e, slug) => {
    if (e.target.closest('button, a, input, select, textarea, .icons')) {
      return;
    }
    router.push(`/property/${slug}`);
  };

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

  if (loading) return <div className="text-center py-5">Loading properties...</div>;

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
        {listings.slice(0, 8).map((listing) => {
          const catName = listing.category?.name?.toLowerCase() || '';
          const catSlug = listing.category?.slug?.toLowerCase() || '';
          const isCommercial = catName.includes('commercial') || catSlug.includes('commercial');
          const hasBeds = Number(listing.bedrooms || 0) > 0;
          const hasBaths = Number(listing.bathrooms || 0) > 0;
          const hasSqft = Number(listing.size_ft || 0) > 0;
          const priceValue = listing.price ? Number(listing.price) : null;

          return (
            <SwiperSlide key={listing.id}>
              <div className="item">
                <div
                  className="listing-style1"
                  style={{ cursor: 'pointer', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
                  onClick={(e) => handleCardClick(e, listing.slug)}
                >
                  <div className="list-thumb">
                    <Link href={`/property/${listing.slug}`} className="d-block w-100 h-100">
                      <Image
                        width={382}
                        height={248}
                        style={{ aspectRatio: '1170/600', objectFit: 'cover' }}
                        className="w-100 h-100 cover"
                        unoptimized={Boolean(listing.image?.startsWith('http'))}
                        src={listing.image || '/images/listings/listing-single-slide1.jpg'}
                        alt={listing.title}
                      />
                    </Link>
                    <div className="sale-sticker-wrap">
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        {isCommercial ? 'COMMERCIAL' : 'FEATURED'}
                      </div>
                    </div>
                    {priceValue && priceValue > 0 ? (
                      <div className="list-price">
                        ₹{Math.round(priceValue).toLocaleString('en-IN')}{' '}
                        {listing.listed_in === 'rent' && <span>/ mo</span>}
                      </div>
                    ) : (
                      <div className="list-price">
                        Price on Request
                      </div>
                    )}
                  </div>

                  <div className="list-content">
                    <h6 className="list-title">
                      <Link href={`/property/${listing.slug}`}>{listing.title}</Link>
                    </h6>
                    <p className="list-text">{listing.location?.address || 'Patiala, Punjab'}</p>

                    {/* Meta Section - Custom for Commercial vs Residential */}
                    <div className="list-meta d-flex align-items-center flex-wrap" style={{ minHeight: '26px' }}>
                      {isCommercial ? (
                        <>
                          <span className="badge bg-light text-dark border px-2 py-1 me-2 fz12">
                            <span className="flaticon-home me-1" /> Commercial Space
                          </span>
                          {hasSqft && (
                            <span>
                              <span className="flaticon-expand" /> {listing.size_ft} sqft
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {hasBeds && (
                            <span className="me-3">
                              <span className="flaticon-bed" /> {listing.bedrooms} bed
                            </span>
                          )}
                          {hasBaths && (
                            <span className="me-3">
                              <span className="flaticon-shower" /> {listing.bathrooms} bath
                            </span>
                          )}
                          {hasSqft && (
                            <span>
                              <span className="flaticon-expand" /> {listing.size_ft} sqft
                            </span>
                          )}
                          {!hasBeds && !hasBaths && !hasSqft && (
                            <span className="badge bg-light text-dark border px-2 py-1 fz12">
                              {listing.category?.name || 'Residential'}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <hr className="mt-2 mb-2" />
                    <div className="list-meta2 d-flex justify-content-between align-items-center">
                      <span className="for-what">
                        {isCommercial ? 'Commercial' : `For ${listing.listed_in === 'rent' ? 'Rent' : 'Sale'}`}
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
          );
        })}
      </Swiper>
    </>
  );
};

export default FeaturedListings;
