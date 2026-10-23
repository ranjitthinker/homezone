"use client";
import React, { useState } from "react";
import Image from "next/image";
import GalleryWithOptions from "./GalleryWithOptions";

const PropertyGallery = ({ property }) => {
  const [showGalleryWithOptions, setShowGalleryWithOptions] = useState(false);

  const handleImageClick = () => {
    setShowGalleryWithOptions(true);
  };

  // Collect all images from gallery_groups or fallback to property.images
  const getAllGalleryImages = () => {
    const allImages = [];

    // 1. From gallery groups
    if (property?.media?.gallery_groups && Array.isArray(property.media.gallery_groups)) {
      property.media.gallery_groups.forEach((group) => {
        if (group.images && Array.isArray(group.images)) {
          group.images.forEach((imageUrl, imgIdx) => {
            allImages.push({
              src: imageUrl,
              alt: `${group.title || "Property"} photo ${imgIdx + 1}`,
            });
          });
        }
      });
    }

    // 2. From property.images directly if no gallery groups
    if (allImages.length === 0 && property?.images && Array.isArray(property.images)) {
      property.images.forEach((img, i) => {
        const src = img?.file_path || img?.image || (typeof img === "string" ? img : null);
        if (src) {
          allImages.push({
            src,
            alt: `${property.title || "Property"} photo ${i + 1}`,
          });
        }
      });
    }

    return allImages;
  };

  const galleryImages = getAllGalleryImages();
  const featuredImage =
    property?.media?.featured_image?.file_path ||
    (galleryImages.length > 0 ? galleryImages[0].src : "/images/listings/listing-single-1.jpg");

  // Secondary images excluding duplicate featured image
  const secondaryImages = galleryImages.filter((img) => img.src !== featuredImage);
  const displayImages = secondaryImages.length > 0 ? secondaryImages : galleryImages.slice(1);
  const totalCount = (featuredImage ? 1 : 0) + displayImages.length;

  return (
    <>
      {showGalleryWithOptions && (
        <GalleryWithOptions
          property={property}
          onClose={() => setShowGalleryWithOptions(false)}
        />
      )}

      <div className="hz-property-gallery-grid position-relative">
        <div className="row g-2 g-md-3">
          {/* Main Featured Photo (Left Column) */}
          <div className={displayImages.length > 0 ? "col-12 col-md-7 col-lg-7" : "col-12"}>
            <div
              className="hz-gallery-main-card position-relative overflow-hidden cursor-pointer"
              onClick={handleImageClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
              title="Click to view full photo gallery"
            >
              <Image
                src={featuredImage}
                fill
                priority
                alt={property?.title || "Property featured photo"}
                className="hz-gallery-img"
                sizes="(max-width: 768px) 100vw, 60vw"
                unoptimized
              />
              <div className="hz-gallery-overlay" />
              <div className="hz-badge-featured">
                <i className="fas fa-star me-1" /> Featured
              </div>
            </div>
          </div>

          {/* Secondary 4-Photo Grid (Right Column, Desktop) */}
          {displayImages.length > 0 && (
            <div className="col-12 col-md-5 col-lg-5 d-none d-md-block">
              <div className="row g-2 g-md-3">
                {displayImages.slice(0, 4).map((image, index) => {
                  const isLastVisible = index === 3;
                  const remainingCount = displayImages.length - 4;

                  return (
                    <div className="col-6" key={index}>
                      <div
                        className="hz-gallery-sub-card position-relative overflow-hidden cursor-pointer"
                        onClick={handleImageClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
                        title="Click to view all photos"
                      >
                        <Image
                          src={image.src}
                          fill
                          alt={image.alt || `Photo ${index + 2}`}
                          className="hz-gallery-img"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          unoptimized
                        />
                        <div className="hz-gallery-overlay" />

                        {isLastVisible && remainingCount > 0 && (
                          <div className="hz-more-photos-overlay">
                            <span className="hz-more-count">+{remainingCount}</span>
                            <span className="hz-more-text">More Photos</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Floating "View All Photos" Button */}
        <button
          type="button"
          onClick={handleImageClick}
          className="hz-view-all-photos-btn"
          aria-label={`View all ${totalCount} photos`}
        >
          <i className="fas fa-th me-2" />
          <span>View all {totalCount} photos</span>
        </button>

        {/* Responsive CSS */}
        <style jsx>{`
          .hz-property-gallery-grid {
            border-radius: 14px;
            overflow: hidden;
          }

          .hz-gallery-main-card {
            width: 100%;
            height: 480px;
            border-radius: 12px;
            background: #1a1c22;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }

          .hz-gallery-sub-card {
            width: 100%;
            height: 232px;
            border-radius: 12px;
            background: #1a1c22;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }

          .hz-gallery-main-card:hover,
          .hz-gallery-sub-card:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          }

          :global(.hz-gallery-img) {
            object-fit: cover !important;
            transition: transform 0.35s cubic-bezier(0.2, 0, 0.2, 1) !important;
          }

          .hz-gallery-main-card:hover :global(.hz-gallery-img),
          .hz-gallery-sub-card:hover :global(.hz-gallery-img) {
            transform: scale(1.04);
          }

          .hz-gallery-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0) 40%,
              rgba(0, 0, 0, 0.35) 100%
            );
            pointer-events: none;
            transition: opacity 0.2s ease;
          }

          .hz-badge-featured {
            position: absolute;
            top: 14px;
            left: 14px;
            background: rgba(235, 103, 83, 0.95);
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          .hz-more-photos-overlay {
            position: absolute;
            inset: 0;
            background: rgba(14, 16, 22, 0.75);
            backdrop-filter: blur(4px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-align: center;
            padding: 10px;
            transition: background 0.2s ease;
          }
          .hz-gallery-sub-card:hover .hz-more-photos-overlay {
            background: rgba(14, 16, 22, 0.85);
          }

          .hz-more-count {
            font-size: 22px;
            font-weight: 700;
            line-height: 1.1;
          }

          .hz-more-text {
            font-size: 12px;
            font-weight: 500;
            opacity: 0.9;
            margin-top: 2px;
          }

          .hz-view-all-photos-btn {
            position: absolute;
            bottom: 20px;
            right: 24px;
            background: #ffffff;
            color: #181a20;
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            padding: 9px 16px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
            display: inline-flex;
            align-items: center;
            transition: all 0.2s ease;
            z-index: 10;
          }
          .hz-view-all-photos-btn:hover {
            background: #181a20;
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
          }

          @media (max-width: 768px) {
            .hz-gallery-main-card {
              height: 280px;
              border-radius: 10px;
            }

            .hz-view-all-photos-btn {
              bottom: 12px;
              right: 14px;
              padding: 7px 12px;
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default PropertyGallery;
