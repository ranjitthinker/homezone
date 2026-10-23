"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

// ─── Data Preparation ────────────────────────────────────────────────────────
const createGallerySections = (property) => {
  const sections = [];

  if (!property) return sections;

  // 1. Featured image
  if (property.media?.featured_image?.file_path) {
    sections.push({
      id: "featured",
      label: "Featured",
      icon: "⭐",
      count: 1,
      images: [
        {
          src: property.media.featured_image.file_path,
          alt: property.media.featured_image.title || property.title || "Featured Image",
          w: 1600,
          h: 1066,
        },
      ],
    });
  }

  // 2. Gallery Groups (if present)
  if (property.media?.gallery_groups && Array.isArray(property.media.gallery_groups) && property.media.gallery_groups.length > 0) {
    property.media.gallery_groups.forEach((group, index) => {
      if (group.images && Array.isArray(group.images) && group.images.length > 0) {
        sections.push({
          id: `gallery-${group.id || index}`,
          label: group.title || `Gallery ${index + 1}`,
          icon: "🖼️",
          count: group.count || group.images.length,
          images: group.images.map((imageUrl, imgIdx) => ({
            src: imageUrl,
            alt: `${group.title || "Property"} - Photo ${imgIdx + 1}`,
            w: 1600,
            h: 1066,
          })),
        });
      }
    });
  }

  // 3. Fallback: If no gallery groups, use property.images directly
  if (
    sections.length <= 1 &&
    property.images &&
    Array.isArray(property.images) &&
    property.images.length > 0
  ) {
    const directImages = property.images
      .map((img, i) => {
        const src = img?.file_path || img?.image || (typeof img === "string" ? img : null);
        if (!src) return null;
        return {
          src,
          alt: `${property.title || "Property"} - Photo ${i + 1}`,
          w: 1600,
          h: 1066,
        };
      })
      .filter(Boolean);

    if (directImages.length > 0) {
      sections.push({
        id: "all-photos",
        label: "All Photos",
        icon: "📸",
        count: directImages.length,
        images: directImages,
      });
    }
  }

  // 4. Video section if video_url exists
  if (property.video_url) {
    const embedUrl =
      property.video_url.includes("youtube") || property.video_url.includes("youtu.be")
        ? property.video_url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")
        : property.video_url;

    sections.push({
      id: "video",
      label: "Video Tour",
      icon: "▶️",
      count: 1,
      isVideo: true,
      videoUrl: embedUrl,
      thumbnail: property.media?.featured_image?.file_path || "/images/listings/listing-single-1.jpg",
    });
  }

  // 5. Hard fallback if no images exist
  if (sections.length === 0) {
    sections.push({
      id: "property",
      label: "Property",
      icon: "🏠",
      count: 1,
      images: [
        {
          src: "/images/listings/listing-single-1.jpg",
          alt: property?.title || "Home Zone Property",
          w: 1600,
          h: 1066,
        },
      ],
    });
  }

  return sections;
};

// ─── Thumbnail Strip ──────────────────────────────────────────────────────────
const ThumbnailStrip = ({ images, currentIndex, onSelect }) => {
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  return (
    <div className="hz-thumb-strip-wrap">
      <div className="hz-thumb-strip">
        {images.map((img, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              type="button"
              key={idx}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(idx)}
              className={`hz-thumb-item ${isActive ? "active" : ""}`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img.src}
                fill
                alt={img.alt || `Thumbnail ${idx + 1}`}
                style={{ objectFit: "cover" }}
                sizes="100px"
                unoptimized
              />
              <span className="hz-thumb-idx">{idx + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Video Panel ──────────────────────────────────────────────────────────────
const VideoPanel = ({ videoUrl }) => (
  <div className="hz-video-panel">
    <iframe
      src={videoUrl}
      title="Property Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

// ─── Main Gallery Component ───────────────────────────────────────────────────
const PropertyGalleryModal = ({ property, onClose }) => {
  const GALLERY_SECTIONS = createGallerySections(property);
  const [activeSection, setActiveSection] = useState(GALLERY_SECTIONS[0]?.id || "");
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fitMode, setFitMode] = useState("contain"); // 'contain' (default, uncut) | 'cover' (fill frame)

  // Touch tracking for mobile swipe gestures
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const currentSection = GALLERY_SECTIONS.find((s) => s.id === activeSection) || GALLERY_SECTIONS[0];
  const currentImages = currentSection?.images || [];
  const mainImage = currentImages[previewIndex];

  const handleTabClick = (sectionId) => {
    setActiveSection(sectionId);
    setPreviewIndex(0);
  };

  const handleNextImage = useCallback(() => {
    if (previewIndex < currentImages.length - 1) {
      setPreviewIndex((prev) => prev + 1);
    } else {
      // Advance to next section when current section finishes
      const currentSectionIndex = GALLERY_SECTIONS.findIndex((s) => s.id === activeSection);
      if (currentSectionIndex < GALLERY_SECTIONS.length - 1) {
        const nextSection = GALLERY_SECTIONS[currentSectionIndex + 1];
        setActiveSection(nextSection.id);
        setPreviewIndex(0);
      }
    }
  }, [previewIndex, currentImages.length, GALLERY_SECTIONS, activeSection]);

  const handlePreviousImage = useCallback(() => {
    if (previewIndex > 0) {
      setPreviewIndex((prev) => prev - 1);
    } else {
      // Go to previous section when at first photo
      const currentSectionIndex = GALLERY_SECTIONS.findIndex((s) => s.id === activeSection);
      if (currentSectionIndex > 0) {
        const prevSection = GALLERY_SECTIONS[currentSectionIndex - 1];
        setActiveSection(prevSection.id);
        setPreviewIndex(Math.max(0, (prevSection.images?.length || 1) - 1));
      }
    }
  }, [previewIndex, GALLERY_SECTIONS, activeSection]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePreviousImage();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [handleNextImage, handlePreviousImage, onClose]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const isSwipe = Math.abs(distance) > 50;

    if (isSwipe) {
      if (distance > 0) {
        handleNextImage(); // Swiped left -> next
      } else {
        handlePreviousImage(); // Swiped right -> prev
      }
    }

    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  return (
    <div className="hz-gallery-modal-overlay" onClick={onClose}>
      <div className="hz-gallery-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* ── Top Header Bar ─────────────────────────────────────────── */}
        <div className="hz-gallery-header">
          <div className="hz-gallery-header-left">
            <h5 className="hz-gallery-title" title={property?.title || "Property Gallery"}>
              {property?.title || "Property Gallery"}
            </h5>
            <span className="hz-gallery-counter-pill">
              {previewIndex + 1} / {currentImages.length}
            </span>
          </div>

          {/* Section Tabs (Shown if multiple sections) */}
          {GALLERY_SECTIONS.length > 1 && (
            <div className="hz-gallery-tabs">
              {GALLERY_SECTIONS.map((section) => {
                const isActive = section.id === activeSection;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleTabClick(section.id)}
                    className={`hz-gallery-tab-btn ${isActive ? "active" : ""}`}
                  >
                    <span>{section.icon}</span>
                    <span className="hz-tab-label">{section.label}</span>
                    <span className="hz-tab-count">{section.count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Top Actions: Fit Toggle & Close */}
          <div className="hz-gallery-header-right">
            {!currentSection?.isVideo && (
              <button
                type="button"
                onClick={() => setFitMode((m) => (m === "contain" ? "cover" : "contain"))}
                className="hz-gallery-fit-btn"
                title={fitMode === "contain" ? "Switch to Fill Frame" : "Switch to Fit Entire Photo (No crop)"}
              >
                <i className={fitMode === "contain" ? "fas fa-expand-alt" : "fas fa-compress-alt"} />
                <span className="hz-fit-label">
                  {fitMode === "contain" ? "Fit Entire Photo" : "Fill Frame"}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="hz-gallery-close-btn"
              title="Close gallery (Esc)"
              aria-label="Close gallery"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Stage / Image Display Area ───────────────────────────────── */}
        <div className="hz-gallery-body">
          {currentSection?.isVideo ? (
            <div className="hz-gallery-video-wrapper">
              <VideoPanel videoUrl={currentSection.videoUrl} />
            </div>
          ) : (
            <>
              <div
                className="hz-stage-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Gallery>
                  {currentImages.map((img, idx) => (
                    <Item
                      key={idx}
                      original={img.src}
                      thumbnail={img.src}
                      width={img.w || 1600}
                      height={img.h || 1066}
                    >
                      {({ ref, open }) =>
                        idx === previewIndex ? (
                          <div
                            ref={ref}
                            onClick={open}
                            role="button"
                            className="hz-main-slide"
                            title="Click to Zoom Fullscreen"
                          >
                            {/* 1. Ambient Blurred Backdrop - Eliminates empty black bars gracefully */}
                            <div className="hz-ambient-layer" aria-hidden="true">
                              <Image
                                src={img.src}
                                fill
                                alt=""
                                style={{
                                  objectFit: "cover",
                                  filter: "blur(32px) brightness(0.25) saturate(1.3)",
                                  transform: "scale(1.15)",
                                }}
                                priority
                                unoptimized
                              />
                            </div>

                            {/* 2. Foreground Image - 100% uncut with object-fit: contain (or cover) */}
                            <div className="hz-foreground-layer">
                              <Image
                                src={img.src}
                                fill
                                alt={img.alt || property?.title || "Property image"}
                                style={{
                                  objectFit: fitMode,
                                  transition: "object-fit 0.25s ease",
                                }}
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                                unoptimized
                              />
                            </div>

                            {/* Section Label Badge (e.g. GEDI ROUTE PATIALA) */}
                            <div className="hz-slide-badge">
                              {currentSection.label.toUpperCase()}
                            </div>

                            {/* Bottom Photo Counter Pill */}
                            <div className="hz-slide-counter">
                              <i className="far fa-images me-1" />
                              {previewIndex + 1} / {currentImages.length}
                            </div>

                            {/* Zoom hint badge */}
                            <div className="hz-slide-zoom-hint">
                              <i className="fas fa-search-plus me-1" />
                              Zoom
                            </div>
                          </div>
                        ) : (
                          // Hidden items so photoswipe keyboard/touch lightbox indexing works
                          <span key={idx} ref={ref} style={{ display: "none" }} onClick={open} />
                        )
                      }
                    </Item>
                  ))}
                </Gallery>

                {/* Previous Navigation Arrow Button */}
                {(previewIndex > 0 || GALLERY_SECTIONS.findIndex((s) => s.id === activeSection) > 0) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviousImage();
                    }}
                    className="hz-nav-arrow hz-nav-prev"
                    title="Previous Photo (←)"
                    aria-label="Previous Photo"
                  >
                    ‹
                  </button>
                )}

                {/* Next Navigation Arrow Button */}
                {(previewIndex < currentImages.length - 1 ||
                  GALLERY_SECTIONS.findIndex((s) => s.id === activeSection) < GALLERY_SECTIONS.length - 1) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="hz-nav-arrow hz-nav-next"
                    title="Next Photo (→)"
                    aria-label="Next Photo"
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Bottom Thumbnails Strip */}
              {currentImages.length > 1 && (
                <ThumbnailStrip
                  images={currentImages}
                  currentIndex={previewIndex}
                  onSelect={setPreviewIndex}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Modern Scoped Styles for Desktop & Mobile ───────────────── */}
      <style jsx>{`
        .hz-gallery-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(8, 9, 12, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: hzFadeIn 0.2s ease-out;
        }

        @keyframes hzFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hz-gallery-modal-card {
          background: #111317;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          font-family: inherit;
          color: #fff;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8);
          width: 100%;
          max-width: 1260px;
          height: 92vh;
          max-height: 900px;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .hz-gallery-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 22px;
          background: #16181f;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          gap: 16px;
          flex-shrink: 0;
        }

        .hz-gallery-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }

        .hz-gallery-title {
          font-size: 16px;
          font-weight: 700;
          color: #f1f2f6;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 420px;
          letter-spacing: -0.2px;
        }

        .hz-gallery-counter-pill {
          background: rgba(255, 255, 255, 0.1);
          color: #e4e7ec;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Tabs */
        .hz-gallery-tabs {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 50%;
        }
        .hz-gallery-tabs::-webkit-scrollbar {
          display: none;
        }

        .hz-gallery-tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.05);
          color: #98a2b3;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .hz-gallery-tab-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        .hz-gallery-tab-btn.active {
          background: #eb6753;
          color: #ffffff;
          border-color: #eb6753;
        }
        .hz-tab-count {
          background: rgba(0, 0, 0, 0.25);
          color: #fff;
          font-size: 11px;
          padding: 1px 6px;
          border-radius: 12px;
        }

        /* Header Right Controls */
        .hz-gallery-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .hz-gallery-fit-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d0d5dd;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hz-gallery-fit-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .hz-gallery-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f2f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        .hz-gallery-close-btn:hover {
          background: #eb6753;
          border-color: #eb6753;
          color: #fff;
          transform: scale(1.05);
        }

        /* Body & Stage */
        .hz-gallery-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 14px 18px 12px;
          overflow: hidden;
          background: #0d0e12;
          min-height: 0;
        }

        .hz-stage-container {
          position: relative;
          flex: 1;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          min-height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hz-main-slide {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: zoom-in;
          overflow: hidden;
        }

        .hz-ambient-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .hz-foreground-layer {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Overlays on slide */
        .hz-slide-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(235, 103, 83, 0.95);
          color: #ffffff;
          border-radius: 6px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          z-index: 4;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          text-transform: uppercase;
        }

        .hz-slide-counter {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          z-index: 4;
        }

        .hz-slide-zoom-hint {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.65);
          color: #e4e7ec;
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 600;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 4;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .hz-main-slide:hover .hz-slide-zoom-hint {
          opacity: 1;
        }

        /* Navigation Arrows */
        .hz-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(18, 20, 26, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-size: 24px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 5;
          transition: all 0.2s ease;
          padding: 0;
          user-select: none;
        }
        .hz-nav-arrow:hover {
          background: #eb6753;
          border-color: #eb6753;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 4px 16px rgba(235, 103, 83, 0.4);
        }
        .hz-nav-prev {
          left: 14px;
        }
        .hz-nav-next {
          right: 14px;
        }

        /* Thumbnail Strip */
        .hz-thumb-strip-wrap {
          margin-top: 10px;
          flex-shrink: 0;
        }

        .hz-thumb-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 6px 2px 4px;
          scrollbar-width: thin;
          scrollbar-color: rgba(235, 103, 83, 0.6) rgba(255, 255, 255, 0.05);
        }
        .hz-thumb-strip::-webkit-scrollbar {
          height: 5px;
        }
        .hz-thumb-strip::-webkit-scrollbar-thumb {
          background: rgba(235, 103, 83, 0.6);
          border-radius: 4px;
        }

        .hz-thumb-item {
          flex-shrink: 0;
          width: 90px;
          height: 62px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          opacity: 0.55;
          transition: all 0.2s ease;
          position: relative;
          background: #1a1c22;
          padding: 0;
        }
        .hz-thumb-item:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .hz-thumb-item.active {
          border-color: #eb6753;
          opacity: 1;
          box-shadow: 0 0 0 1px #eb6753, 0 4px 12px rgba(235, 103, 83, 0.35);
          transform: translateY(-2px);
        }

        .hz-thumb-idx {
          position: absolute;
          bottom: 2px;
          right: 4px;
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 4px;
        }

        /* Video */
        .hz-gallery-video-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }
        .hz-video-panel {
          position: relative;
          width: 100%;
          max-width: 900px;
          padding-bottom: 56.25%;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }
        .hz-video-panel iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* ── Mobile Responsive Adjustments ───────────────────────────── */
        @media (max-width: 768px) {
          .hz-gallery-modal-overlay {
            padding: 0;
          }

          .hz-gallery-modal-card {
            border-radius: 0;
            border: none;
            height: 100vh;
            height: 100dvh;
            max-height: 100vh;
            max-height: 100dvh;
          }

          .hz-gallery-header {
            padding: 10px 14px;
            gap: 10px;
          }

          .hz-gallery-title {
            font-size: 14px;
            max-width: 160px;
          }

          .hz-gallery-counter-pill {
            font-size: 11px;
            padding: 2px 8px;
          }

          .hz-fit-label {
            display: none;
          }
          .hz-gallery-fit-btn {
            padding: 6px 10px;
          }

          .hz-gallery-tabs {
            display: none; /* Hide on small screens to prioritize clean view */
          }

          .hz-gallery-body {
            padding: 8px 10px 10px;
          }

          .hz-stage-container {
            min-height: 240px;
            border-radius: 8px;
          }

          .hz-nav-arrow {
            width: 36px;
            height: 36px;
            font-size: 20px;
          }
          .hz-nav-prev {
            left: 8px;
          }
          .hz-nav-next {
            right: 8px;
          }

          .hz-slide-badge {
            top: 10px;
            left: 10px;
            font-size: 10px;
            padding: 3px 8px;
          }

          .hz-slide-counter {
            bottom: 10px;
            right: 10px;
            font-size: 11px;
            padding: 4px 10px;
          }

          .hz-slide-zoom-hint {
            display: none;
          }

          .hz-thumb-item {
            width: 68px;
            height: 48px;
            border-radius: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyGalleryModal;
