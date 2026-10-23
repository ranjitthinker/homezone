'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import apiService from '@/utils/api/apiService';

const NearbySimilarProperty = ({ propertyId }) => {
  const router = useRouter();
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (e, slug) => {
    if (e.target.closest('button, a, input, select, textarea, .icons')) {
      return;
    }
    router.push(`/property/${slug}`);
  };

  useEffect(() => {
    const fetchRelatedProperties = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(`/properties/${propertyId}/related`);
        if (response?.data?.status) {
          setRelatedProperties(response.data.data || []);
        } else {
          setRelatedProperties([]);
        }
      } catch (error) {
        console.error('Error fetching related properties:', error);
        setRelatedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchRelatedProperties();
    }
  }, [propertyId]);

  const formatPrice = (price) => {
    if (!price || Number(price) <= 0) return '';
    return Math.round(Number(price)).toLocaleString('en-IN');
  };

  const getLocationText = (location) => {
    if (!location) return '';
    const parts = [
      location.city,
      location.state,
      location.country?.toUpperCase() === 'INDIA' ? 'India' : location.country,
    ].filter(Boolean);

    return parts.join(', ');
  };

  const getListingType = (listedIn) => {
    if (listedIn === 'sale') return 'For Sale';
    if (listedIn === 'rent') return 'For Rent';
    return listedIn ? `For ${listedIn.charAt(0).toUpperCase()}${listedIn.slice(1)}` : '';
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!relatedProperties.length) {
    return (
      <div className="text-center p-5">
        <p className="text-muted">No similar properties found</p>
      </div>
    );
  }

  return (
    <Swiper
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
      {relatedProperties.map((property, index) => (
        <SwiperSlide key={property.id}>
          <div className="item">
            <div
              className="listing-style1"
              style={{ cursor: 'pointer', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
              onClick={(e) => handleCardClick(e, property.slug || property.id)}
            >
              <div className="list-thumb">
                <Link href={`/property/${property.slug || property.id}`} className="d-block w-100 h-100">
                  <Image
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    src={property.image || '/images/no-image.jpg'}
                    alt={property.title || 'Property'}
                  />
                </Link>

                {index === 1 && (
                  <div className="sale-sticker-wrap">
                    <div className="list-tag rounded-0 fz12">
                      <span className="flaticon-electricity" />
                      FEATURED
                    </div>
                  </div>
                )}

                {Number(property.price) > 0 ? (
                  <div className="list-price">
                    ₹{formatPrice(property.price)}{' '}
                    {property.after_price_label ? <span>{property.after_price_label}</span> : null}
                  </div>
                ) : (
                  <div className="list-price">
                    Price on Request
                  </div>
                )}
              </div>

              <div className="list-content">
                <h6 className="list-title">
                  <Link href={`/property/${property.slug || property.id}`}>{property.title}</Link>
                </h6>

                <p className="list-text">{getLocationText(property.location)}</p>

                {(() => {
                  const catName = (property.category?.name || '').toLowerCase();
                  const catSlug = (property.category?.slug || '').toLowerCase();
                  const isCommercial = catName.includes('commercial') || catSlug.includes('commercial');
                  const hasBeds = Number(property.bedrooms || 0) > 0;
                  const hasBaths = Number(property.bathrooms || 0) > 0;
                  const hasSqft = Number(property.size_ft || 0) > 0;

                  if (isCommercial) {
                    return (
                      <div className="list-meta d-flex align-items-center">
                        <span className="badge bgc-thm text-white px-2 py-1 fz12 me-2" style={{ borderRadius: '12px' }}>
                          Commercial
                        </span>
                        {hasSqft && (
                          <span>
                            <span className="flaticon-expand" /> {property.size_ft} sqft
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div className="list-meta d-flex align-items-center">
                      {hasBeds && (
                        <span>
                          <span className="flaticon-bed" /> {property.bedrooms} bed
                        </span>
                      )}
                      {hasBaths && (
                        <span>
                          <span className="flaticon-shower" /> {property.bathrooms} bath
                        </span>
                      )}
                      {hasSqft && (
                        <span>
                          <span className="flaticon-expand" /> {property.size_ft} sqft
                        </span>
                      )}
                    </div>
                  );
                })()}

                <hr className="mt-2 mb-2" />

                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">{getListingType(property.listed_in)}</span>

                  <div className="icons d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-fullscreen" />
                    </a>
                    <a href="#">
                      <span className="flaticon-new-tab" />
                    </a>
                    <a href="#">
                      <span className="flaticon-like" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NearbySimilarProperty;
