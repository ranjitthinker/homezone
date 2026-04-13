'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import apiService from '@/utils/api/apiService';

const NearbySimilarProperty = ({ propertyId }) => {
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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
    if (!price) return '';
    return Number(price).toLocaleString('en-IN');
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
            <div className="listing-style1">
              <div className="list-thumb">
                <Image
                  width={382}
                  height={248}
                  className="w-100 h-100 cover"
                  src={property.image || '/images/no-image.jpg'}
                  alt={property.title || 'Property'}
                />

                {index === 1 && (
                  <div className="sale-sticker-wrap">
                    <div className="list-tag rounded-0 fz12">
                      <span className="flaticon-electricity" />
                      FEATURED
                    </div>
                  </div>
                )}

                <div className="list-price">
                  ₹{formatPrice(property.price)}{' '}
                  {property.after_price_label ? <span>{property.after_price_label}</span> : null}
                </div>
              </div>

              <div className="list-content">
                <h6 className="list-title">
                  <Link href={`/single-v1/${property.slug || property.id}`}>{property.title}</Link>
                </h6>

                <p className="list-text">{getLocationText(property.location)}</p>

                <div className="list-meta d-flex align-items-center">
                  <span>
                    <span className="flaticon-bed" /> {property.bedrooms || 0} bed
                  </span>
                  <span>
                    <span className="flaticon-shower" /> {property.bathrooms || 0} bath
                  </span>
                  <span>
                    <span className="flaticon-expand" /> {property.size_ft || 0} sqft
                  </span>
                </div>

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
