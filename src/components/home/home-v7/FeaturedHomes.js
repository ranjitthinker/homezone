"use client";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const FeaturedHomes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiService.get(API_URLS.PROPERTY_CATEGORIES);
        if (res.data?.status && res.data?.data) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch property categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".properties_homes-next__active",
          prevEl: ".properties_homes-prev__active",
        }}
        pagination={{
          el: ".properties_homes_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="item">
              <Link href={`/properties?category=${category.slug}`}>
                <div className="apartment-style2 text-center mb30">
                  <div className="apartment-img">
                    <Image
                      width={279}
                      height={332}
                      className="w-100 h-100 cover"
                      src={category.image || "/images/listings/default-category.jpg"}
                      alt={category.name}
                      onError={(e) => {
                        e.target.src = "/images/listings/default-category.jpg";
                      }}
                    />
                  </div>
                  <div className="apartment-content">
                    <h6 className="title mb-0">{category.name}</h6>
                    <p className="text mb-0">
                      {category.properties_count > 0 
                        ? `${category.properties_count} Properties` 
                        : "Properties"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeaturedHomes;
