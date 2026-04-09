"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import Map from "./Map";

const PropertyGallery = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Map images from the property data
  const images = data?.images?.map((img) => img.file_path) || [];

  // Build Google Maps embed URL from coordinates
  const latitude = data?.coordinates?.latitude || "30.33980000";
  const longitude = data?.coordinates?.longitude || "76.38690000";
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`;

  // Fallback if no images
  const fallbackImage = "/images/listings/listing-single-6-1.jpg";

  return (
    <>
      <div className="row">
        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
          <div className="ps-v4-hero-tab position-relative">
            <ul
              className="nav nav-pills justify-content-end"
              id="pills-tab2"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active mr10"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <span className="flaticon-images text-white fz20" />
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link mr10"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <span className="flaticon-map text-white fz20" />
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  <span className="flaticon-maps-1 text-white fz20" />
                </button>
              </li>
            </ul>
          </div>
          {/* End .ps-v4-hero-tab */}

          <div className="ps-v4-hero-tab">
            <div
              className="tab-content overflow-visible"
              id="pills-tabContent2"
            >
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="container p-0">
                  <div className="row" data-aos="fade-up" data-aos-delay="300">
                    <div className="col-lg-12">
                      <div className="ps-v6-slider nav_none slider-1-grid owl-theme owl-carousel">
                        {images.length > 0 ? (
                          <>
                            <Swiper
                              loop={images.length > 1}
                              spaceBetween={10}
                              navigation={{
                                prevEl: ".prev-btn",
                                nextEl: ".next-btn",
                              }}
                              thumbs={{
                                swiper:
                                  thumbsSwiper && !thumbsSwiper.destroyed
                                    ? thumbsSwiper
                                    : null,
                              }}
                              modules={[FreeMode, Navigation, Thumbs]}
                              className="mySwiper2"
                            >
                              {images.map((item, i) => (
                                <SwiperSlide key={data.images[i]?.id || i}>
                                  <Image
                                    height={736}
                                    width={409}
                                    src={item}
                                    alt={`${data.title} - Image ${i + 1}`}
                                    className="w-100 h-auto bdrs12"
                                    unoptimized
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>

                            <div className="row">
                              <div className="col-lg-7 col-md-8">
                                <Swiper
                                  onSwiper={setThumbsSwiper}
                                  loop={images.length > 4}
                                  spaceBetween={10}
                                  slidesPerView={Math.min(images.length, 4)}
                                  freeMode={true}
                                  watchSlidesProgress={true}
                                  modules={[FreeMode, Navigation, Thumbs]}
                                  className="mySwiper mt20"
                                >
                                  {images.map((item, i) => (
                                    <SwiperSlide key={data.images[i]?.id || i}>
                                      <Image
                                        height={90}
                                        width={83}
                                        src={item}
                                        alt={`${data.title} - Thumbnail ${i + 1}`}
                                        className="w-100 bdrs12 cover pointer"
                                        unoptimized
                                      />
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-5">
                            <Image
                              height={736}
                              width={409}
                              src={fallbackImage}
                              alt="No image available"
                              className="w-100 h-auto bdrs12"
                            />
                            <p className="mt10 text-muted">No images available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End tab-pane */}

              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <Map latitude={latitude} longitude={longitude} />
              </div>
              {/* End map type listing */}

              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <iframe
                  className="h510 w-100"
                  src={googleMapsEmbedUrl}
                  allowFullScreen
                  title={`Map location of ${data?.title || "property"}`}
                />
              </div>
              {/* End map location finder */}
            </div>
          </div>
          {/* End ps-v4-hero-tab content */}
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default PropertyGallery;