"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const projectSlides = [
  {
    id: 1,
    image: "/images/about/about-page-banner.webp",
    title: "Grand Horizon Luxury Residency",
    subtitle: "Modern Architectural Masterpiece with Scenic Views",
    location: "Prime City Center",
    tag: "Featured Project",
    link: "/properties",
  },
  {
    id: 2,
    image: "/images/home/home-1.jpg",
    title: "Palm Royale Designer Villas",
    subtitle: "Spacious Living with Private Gardens & Amenities",
    location: "Green Belt Enclave",
    tag: "Ready To Move",
    link: "/properties",
  },
  {
    id: 3,
    image: "/images/home/home-5-1.jpg",
    title: "Skyline Elite Tower & Suites",
    subtitle: "Panoramic High-Rise Apartments & Luxury Penthouses",
    location: "Financial District",
    tag: "New Launch",
    link: "/properties",
  },
  {
    id: 4,
    image: "/images/home/home-6.jpg",
    title: "Emerald Commercial Galleria",
    subtitle: "World-Class Retail Spaces & Corporate Suites",
    location: "Central Business Boulevard",
    tag: "Commercial Hub",
    link: "/properties",
  },
];

const galleryItems = [
  {
    id: 1,
    image: "/images/home/home-2.jpg",
    title: "Contemporary Villa Facade",
    category: "Architecture",
  },
  {
    id: 2,
    image: "/images/home/home-5-2.jpg",
    title: "Premium Lounge & Interior",
    category: "Living Spaces",
  },
  {
    id: 3,
    image: "/images/home/home-4.jpg",
    title: "Skyline Penthouses",
    category: "Luxury Living",
  },
  {
    id: 4,
    image: "/images/home/home-5-3.jpg",
    title: "Landscaped Eco Courtyard",
    category: "Green Community",
  },
];

const ProjectSlideGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="project-slide-gallery-section py-5 bgc-f7">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end justify-content-between mb40">
          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            <span
              className="badge px-3 py-2 fw600 mb-2"
              style={{
                backgroundColor: "#fff0ed",
                color: "#eb6753",
                borderRadius: "30px",
                fontSize: "13px",
                letterSpacing: "0.5px",
              }}
            >
              OUR VALUES & PROJECT SHOWCASE
            </span>
            <h2 className="title fw-bold mb-2">
              Featured Projects & Visual Gallery
            </h2>
            <p className="text text-muted mb-0 fz15">
              Explore our landmark developments designed with uncompromising ethics, modern architecture, and premium lifestyle amenities.
            </p>
          </div>
          <div
            className="col-lg-4 text-lg-end mt-3 mt-lg-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link href="/properties" className="ud-btn btn-dark">
              View All Properties
              <i className="fal fa-arrow-right-long ms-2" />
            </Link>
          </div>
        </div>

        {/* 2-Column Section: 1. Left Side Project Slides | 2. Right Side Gallery */}
        <div className="row g-4 align-items-stretch">
          {/* 1. Left Side: Project Images in Slide */}
          <div className="col-lg-7" data-aos="fade-right" data-aos-delay="200">
            <div
              className="position-relative h-100 rounded-4 overflow-hidden shadow-sm"
              style={{
                borderRadius: "20px",
                minHeight: "510px",
                backgroundColor: "#1a1a1a",
              }}
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={{
                  nextEl: ".project-slide-next",
                  prevEl: ".project-slide-prev",
                }}
                className="h-100 w-100"
                style={{ minHeight: "510px" }}
              >
                {projectSlides.map((slide) => (
                  <SwiperSlide key={slide.id} className="h-100">
                    <div
                      className="position-relative w-100 h-100"
                      style={{ minHeight: "510px" }}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                        priority={slide.id === 1}
                      />
                      {/* Gradient Overlay */}
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)",
                        }}
                      />

                      {/* Slide Caption Box */}
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white"
                        style={{ zIndex: 2 }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span
                            className="badge px-3 py-1 fw600"
                            style={{
                              backgroundColor: "#eb6753",
                              borderRadius: "20px",
                              fontSize: "12px",
                            }}
                          >
                            {slide.tag}
                          </span>
                          <span className="badge bg-white text-dark px-3 py-1 rounded-pill">
                            <i className="flaticon-pin me-1 text-danger" />
                            {slide.location}
                          </span>
                        </div>
                        <h3 className="text-white fw-bold mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-white-50 mb-3 fz14">
                          {slide.subtitle}
                        </p>
                        <Link
                          href={slide.link}
                          className="btn btn-sm btn-light rounded-pill px-4 py-2 fw-semibold"
                        >
                          Explore Project Details
                          <i className="fal fa-arrow-right ms-2" />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Slider Arrows */}
              <button
                className="project-slide-prev position-absolute btn btn-light rounded-circle shadow d-flex align-items-center justify-content-center"
                style={{
                  top: "30px",
                  right: "75px",
                  width: "42px",
                  height: "42px",
                  zIndex: 10,
                  opacity: 0.9,
                }}
                aria-label="Previous slide"
              >
                <i className="far fa-chevron-left" />
              </button>
              <button
                className="project-slide-next position-absolute btn btn-light rounded-circle shadow d-flex align-items-center justify-content-center"
                style={{
                  top: "30px",
                  right: "24px",
                  width: "42px",
                  height: "42px",
                  zIndex: 10,
                  opacity: 0.9,
                }}
                aria-label="Next slide"
              >
                <i className="far fa-chevron-right" />
              </button>
            </div>
          </div>

          {/* 2. Right Side: Project Gallery */}
          <div className="col-lg-5" data-aos="fade-left" data-aos-delay="300">
            <div className="h-100 d-flex flex-column justify-content-between">
              <div className="row g-3 h-100">
                {galleryItems.map((item) => (
                  <div className="col-6" key={item.id}>
                    <div
                      className="gallery-item-card position-relative rounded-4 overflow-hidden shadow-sm h-100"
                      style={{
                        borderRadius: "16px",
                        minHeight: "242px",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onClick={() => setSelectedImage(item)}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="gallery-img w-100 h-100"
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                      {/* Hover Overlay */}
                      <div
                        className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-3"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className="badge px-2 py-1"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.9)",
                              color: "#181a20",
                              fontSize: "11px",
                              borderRadius: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {item.category}
                          </span>
                          <span
                            className="btn btn-sm btn-white rounded-circle d-flex align-items-center justify-content-center p-0"
                            style={{ width: "28px", height: "28px" }}
                          >
                            <i className="far fa-expand-alt fz11" />
                          </span>
                        </div>

                        <div>
                          <h6 className="text-white mb-0 fz14 fw-bold">
                            {item.title}
                          </h6>
                          <small className="text-white-50 fz12">
                            Click to view full photo
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            zIndex: 99999,
            backdropFilter: "blur(6px)",
            padding: "20px",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="position-relative bg-dark rounded-4 overflow-hidden shadow-2xl"
            style={{
              maxWidth: "880px",
              width: "100%",
              maxHeight: "90vh",
              borderRadius: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{
                width: "42px",
                height: "42px",
                zIndex: 10,
                border: "none",
              }}
              aria-label="Close"
            >
              <i className="far fa-times fs-6" />
            </button>

            {/* Modal Image */}
            <div
              className="position-relative"
              style={{ width: "100%", height: "500px" }}
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-dark text-white d-flex justify-content-between align-items-center border-top border-secondary">
              <div>
                <span className="badge bg-danger mb-1">
                  {selectedImage.category}
                </span>
                <h5 className="mb-0 text-white fw-bold">
                  {selectedImage.title}
                </h5>
              </div>
              <Link
                href="/properties"
                className="btn btn-sm btn-outline-light rounded-pill px-3 py-1"
                onClick={() => setSelectedImage(null)}
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Card Hover Effects */}
      <style jsx>{`
        .gallery-item-card:hover .gallery-img {
          transform: scale(1.08);
        }
        .gallery-item-card:hover .gallery-overlay {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.85) 100%
          );
        }
      `}</style>
    </section>
  );
};

export default ProjectSlideGallery;
