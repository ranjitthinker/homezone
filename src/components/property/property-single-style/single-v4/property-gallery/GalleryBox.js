"use client";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GalleryBox = ({ images = [] }) => {
  // ✅ fallback to placeholder if no images from API
  const imageList = images.length > 0
    ? images
    : [{ id: 0, file_path: "/images/listings/listing-single-slide1.jpg" }];

  return (
    <>
      <Swiper
        className="overflow-visible"
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".single-pro-slide-next__active",
          prevEl: ".single-pro-slide-prev__active",
        }}
        slidesPerView={1}
        initialSlide={1}
        loop={true}
      >
        {imageList.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="item">
              <Image
                width={1170}
                height={600}
                className="bdrs12 w-100 h-100 cover"
                src={image.file_path}
                alt={`Property image`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="rounded-arrow arrowY-center-position">
        <button className="single-pro-slide-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        <button className="single-pro-slide-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
      </div>
    </>
  );
};
export default GalleryBox;