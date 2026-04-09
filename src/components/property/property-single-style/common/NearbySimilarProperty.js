"use client";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import apiService from "@/utils/api/apiService";

const NearbySimilarProperty = ({ propertyId }) => {
  console.log('propertyId', propertyId)
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProperties = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(`/properties/${propertyId}/related`);
        console.log('response', response)
        if (response.data.status) {
          setRelatedProperties(response.data.data);
        }
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchRelatedProperties();
    }
  }, [propertyId]);

  // Use API data if available, otherwise fallback to static listings
  const propertiesToDisplay =relatedProperties;

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!propertiesToDisplay || propertiesToDisplay.length === 0) {
    return (
      <div className="text-center p-5">
        <p className="text-muted">No similar properties found</p>
      </div>
    );
  }

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {propertiesToDisplay.map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    className="w-100 h-100 cover"
                    src={listing.image}
                    alt="listings"
                  />
                  <div className="sale-sticker-wrap">
                    {listing.forRent && (
                      <div className="list-tag rounded-0 fz12">
                        <span className="flaticon-electricity" />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="list-price">
                    {listing.price} / <span>mo</span>
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/single-v1/${listing.id}`}>
                      {listing.title}
                    </Link>
                  </h6>
                  <p className="list-text">{listing.location}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> {listing.bed} bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" /> {listing.bath} bath
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" /> {listing.sqft} sqft
                    </a>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">For Rent</span>
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

export default NearbySimilarProperty;
