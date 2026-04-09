'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        {listings.slice(0, 5).map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    style={{ aspectRatio: '1170/600' }}
                    className="w-100 h-100 cover"
                    src={listing.image || '/images/listings/listing-single-slide1.jpg'} // ✅ dynamic
                    alt={listing.title}
                  />
                  <div className="sale-sticker-wrap">
                    {listing.listed_in === 'rent' && ( // ✅ API field
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="list-price">
                    ₹{Number(listing.price).toLocaleString('en-IN')} {/* ✅ formatted price */}/ <span>mo</span>
                  </div>
                </div>

                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/property/${listing.slug}`}>{listing.title}</Link>
                  </h6>
                  <p className="list-text">{listing.location?.address || 'N/A'}</p> {/* ✅ nested */}
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> {listing.bedrooms ?? 0} bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" /> {listing.bathrooms ?? 0} bath
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" /> {listing.size_ft ?? 0} sqft
                    </a>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">
                      For {listing.listed_in === 'rent' ? 'Rent' : 'Sale'} {/* ✅ dynamic */}
                    </span>
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
    </>
  );
};

export default FeaturedListings;
