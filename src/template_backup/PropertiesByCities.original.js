"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const PropertiesByCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await apiService.get(`${API_URLS.PROPERTIES_BY_CITIES}`);
        setCities(res.data?.data ?? []);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation]}
        navigation={{
          nextEl: ".property-by-city-next__active",
          prevEl: ".property-by-city-prev__active",
        }}
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {cities.map((city) => (
          <SwiperSlide key={city.id}>
            <div className="item">
              <div className="feature-style1">
                <div className="feature-img">
                  <Image
                    width={400}
                    height={400}
                    className="w-100 h-100 cover"
                    src={city.image}
                    alt={city.name}
                  />
                </div>
                <div className="feature-content">
                  <div className="top-area">
                    <h6 className="title mb-1">{city.name}</h6>
                    <p className="text">Properties : {city.property_count}</p> {/* ✅ API field */}
                  </div>
                  <div className="bottom-area">
                    <Link className="ud-btn2" href={`/properties?city=${city.id}`}>
                      See All Properties
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="property-by-city-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        <button className="property-by-city-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
      </div>
    </>
  );
};

export default PropertiesByCities;