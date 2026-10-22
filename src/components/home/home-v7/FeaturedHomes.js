"use client";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const FeaturedHomes = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        // 1. Fetch all properties
        const res = await apiService.get(API_URLS.PROPERTY, { params: { per_page: 20 } });
        const properties = res.data?.data || [];

        if (!properties.length) {
          if (isMounted) {
            setGalleryItems([]);
            setLoading(false);
          }
          return;
        }

        // 2. Fetch full detail for each property to collect all uploaded gallery images
        const detailPromises = properties.map(async (p) => {
          try {
            const detailRes = await apiService.get(`${API_URLS.PROPERTY}/${p.slug}`);
            const pData = detailRes.data?.data || p;
            return { basic: p, detail: pData };
          } catch {
            return { basic: p, detail: p };
          }
        });

        const settled = await Promise.allSettled(detailPromises);
        const collected = [];
        const seenUrls = new Set();

        settled.forEach((result) => {
          if (result.status !== "fulfilled") return;
          const { basic, detail } = result.value;

          const categoryName =
            detail.category?.name || basic.category?.name || "Property";
          const isCommercial =
            categoryName.toLowerCase().includes("commercial") ||
            (detail.category?.slug || "").includes("commercial");
          const locationStr = [
            detail.location?.address || basic.location?.address,
            detail.location?.city || basic.location?.city,
          ]
            .filter(Boolean)
            .join(", ");

          // Featured image
          const featuredImg =
            detail.media?.featured_image?.file_path ||
            basic.image ||
            detail.image;

          if (featuredImg && !seenUrls.has(featuredImg)) {
            seenUrls.add(featuredImg);
            collected.push({
              id: `${basic.id}-featured`,
              src: featuredImg,
              title: detail.title || basic.title,
              category: categoryName,
              isCommercial,
              location: locationStr,
              slug: detail.slug || basic.slug,
              badge: isCommercial ? "Commercial" : "Residential",
            });
          }

          // Gallery groups images
          const galleryGroups = detail.media?.gallery_groups || [];
          galleryGroups.forEach((group, gIdx) => {
            const imgs = group.images || [];
            imgs.forEach((imgUrl, iIdx) => {
              if (imgUrl && !seenUrls.has(imgUrl)) {
                seenUrls.add(imgUrl);
                collected.push({
                  id: `${basic.id}-g-${gIdx}-${iIdx}`,
                  src: imgUrl,
                  title: detail.title || basic.title,
                  category: categoryName,
                  isCommercial,
                  location: locationStr,
                  slug: detail.slug || basic.slug,
                  badge: isCommercial ? "Commercial" : "Residential",
                });
              }
            });
          });
        });

        if (isMounted) {
          setGalleryItems(collected);
        }
      } catch (err) {
        console.error("Failed to load gallery images:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGalleryImages();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">Loading gallery...</span>
        </div>
        <div className="mt-2 text-muted fz14">Loading property gallery...</div>
      </div>
    );
  }

  if (!galleryItems.length) {
    return (
      <div className="text-center py-4 text-muted">
        No gallery images uploaded yet.
      </div>
    );
  }

  return (
    <div className="property-gallery-slider position-relative">
      <Swiper
        spaceBetween={24}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
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
            slidesPerView: 1.2,
            spaceBetween: 14,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 22,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {galleryItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="item h-100">
              <Link
                href={`/property/${item.slug}`}
                className="d-block text-decoration-none h-100"
              >
                <div
                  className="gallery-card position-relative overflow-hidden"
                  style={{
                    height: "360px",
                    borderRadius: "16px",
                    backgroundColor: "#1f2229",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transition: "all 0.35s ease",
                  }}
                >
                  {/* Background Image */}
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                    className="gallery-card-img"
                    onError={(e) => {
                      e.target.src = "/images/listings/g1-1.jpg";
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Category Badge Pill in Top-Left */}
                  <div
                    className="position-absolute top-0 start-0 m-3"
                    style={{ zIndex: 2 }}
                  >
                    <span
                      className="badge px-3 py-2 fw600"
                      style={{
                        backgroundColor: item.isCommercial
                          ? "rgba(13, 110, 253, 0.9)"
                          : "rgba(235, 103, 83, 0.92)",
                        color: "#ffffff",
                        borderRadius: "30px",
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-3"
                    style={{ zIndex: 2 }}
                  >
                    <h5
                      className="text-white mb-1 fw700 text-truncate"
                      style={{
                        fontSize: "16px",
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                      }}
                      title={item.title}
                    >
                      {item.title}
                    </h5>
                    {item.location && (
                      <p
                        className="text-white-50 mb-2 fz12 text-truncate"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                      >
                        <i className="flaticon-map me-1 text-white" />
                        {item.location}
                      </p>
                    )}
                    <span
                      className="d-inline-flex align-items-center text-white fz13 fw600"
                      style={{
                        color: "#fff",
                        opacity: 0.95,
                        textDecoration: "underline",
                      }}
                    >
                      View Property <i className="fal fa-arrow-right ms-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedHomes;
