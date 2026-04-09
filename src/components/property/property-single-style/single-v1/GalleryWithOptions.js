"use client";
import { useState, useRef } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const createGallerySections = (property) => {
  const sections = [];
  
  if (!property?.media) return sections;

  // Add featured image as first section
  if (property.media.featured_image) {
    sections.push({
      id: "featured",
      label: "Featured",
      icon: "⭐",
      count: 1,
      images: [
        { 
          src: property.media.featured_image.file_path, 
          alt: property.media.featured_image.title || "Featured Image",
          w: 1200, 
          h: 800 
        }
      ],
    });
  }

  // Add gallery groups
  if (property.media.gallery_groups && Array.isArray(property.media.gallery_groups)) {
    property.media.gallery_groups.forEach((group, index) => {
      if (group.images && Array.isArray(group.images)) {
        sections.push({
          id: `gallery-${group.id || index}`,
          label: group.title || `Gallery ${index + 1}`,
          icon: "�",
          count: group.count || group.images.length,
          images: group.images.map(imageUrl => ({
            src: imageUrl,
            alt: `${group.title} image`,
            w: 1200,
            h: 800
          })),
        });
      }
    });
  }

  // Add video section if video_url exists
  if (property.video_url) {
    sections.push({
      id: "video",
      label: "Property Video",
      icon: "▶️",
      count: 1,
      isVideo: true,
      videoUrl: property.video_url.includes('youtube') || property.video_url.includes('youtu.be') 
        ? property.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
        : property.video_url,
      thumbnail: property.media.featured_image?.file_path || "/images/listings/listing-single-1.jpg",
    });
  }

  return sections.length > 0 ? sections : [
    {
      id: "property",
      label: "Property",
      icon: "🏠",
      count: 4,
      images: [
        { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop", alt: "Luxury Living Room", w: 1200, h: 800 },
        { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25418a?w=1200&h=800&fit=crop", alt: "Modern Kitchen", w: 1200, h: 800 },
        { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop", alt: "Master Bedroom", w: 1200, h: 800 },
        { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop", alt: "Bathroom", w: 1200, h: 800 },
      ],
    }
  ];
};

// ─── Thumbnail Strip ──────────────────────────────────────────────────────────
const ThumbnailStrip = ({ images, currentIndex, onSelect }) => {
  const stripRef = useRef(null);
  return (
    <div
      ref={stripRef}
      className="thumbnail-strip"
      style={{
        display: "flex",
        gap: "6px",
        overflowX: "auto",
        padding: "10px 0",
        scrollbarWidth: "thin",
        scrollbarColor: "#cf933b #1a1a1a",
      }}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(idx)}
          style={{
            flexShrink: 0,
            width: "88px",
            height: "60px",
            borderRadius: "6px",
            overflow: "hidden",
            cursor: "pointer",
            border: currentIndex === idx ? "2px solid #cf933b" : "2px solid transparent",
            opacity: currentIndex === idx ? 1 : 0.65,
            transition: "all 0.2s ease",
            position: "relative",
          }}
        >
          <Image src={img.src} fill alt={img.alt} style={{ objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
};

// ─── Video Panel ──────────────────────────────────────────────────────────────
const VideoPanel = ({ videoUrl }) => (
  <div
    style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      borderRadius: "10px",
      overflow: "hidden",
      background: "#000",
    }}
  >
    <iframe
      src={videoUrl}
      title="Property Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PropertyGallery = ({ property, onClose }) => {
  const GALLERY_SECTIONS = createGallerySections(property);
  const [activeSection, setActiveSection] = useState(GALLERY_SECTIONS[0]?.id || "");
  const [previewIndex, setPreviewIndex] = useState(0);

  const currentSection = GALLERY_SECTIONS.find((s) => s.id === activeSection);
  const currentImages = currentSection?.images || [];
  const mainImage = currentImages[previewIndex];

  const handleTabClick = (sectionId) => {
    setActiveSection(sectionId);
    setPreviewIndex(0);
  };

  const handleNextImage = () => {
    if (previewIndex < currentImages.length - 1) {
      setPreviewIndex(previewIndex + 1);
    } else {
      // Move to next tab when current tab's images are finished
      const currentSectionIndex = GALLERY_SECTIONS.findIndex(s => s.id === activeSection);
      if (currentSectionIndex < GALLERY_SECTIONS.length - 1) {
        const nextSection = GALLERY_SECTIONS[currentSectionIndex + 1];
        setActiveSection(nextSection.id);
        setPreviewIndex(0);
      }
    }
  };

  const handlePreviousImage = () => {
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    } else {
      // Move to previous tab when at first image of current tab
      const currentSectionIndex = GALLERY_SECTIONS.findIndex(s => s.id === activeSection);
      if (currentSectionIndex > 0) {
        const prevSection = GALLERY_SECTIONS[currentSectionIndex - 1];
        setActiveSection(prevSection.id);
        setPreviewIndex(prevSection.images.length - 1);
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        width: '100vw',
        background: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          background: "#111",
          borderRadius: "14px",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
          color: "#fff",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          width: "100%",
          maxWidth: "1200px",
          height: "90vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* ── Tab Header ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#1a1a1a",
            borderBottom: "1px solid #2a2a2a",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {GALLERY_SECTIONS.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <button
                key={section.id}
                onClick={() => handleTabClick(section.id)}
                style={{
                  flexShrink: 0,
                  padding: "14px 22px",
                  background: "transparent",
                  border: "none",
                  borderBottom: isActive ? "3px solid #cf933b" : "3px solid transparent",
                  color: isActive ? "#fff" : "#888",
                  fontWeight: isActive ? "700" : "400",
                  fontSize: "13px",
                  letterSpacing: "0.3px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: "15px" }}>{section.icon}</span>
                {section.label.toUpperCase()}
                <span
                  style={{
                    background: isActive ? "#cf933b" : "#333",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "1px 7px",
                    fontSize: "11px",
                    fontWeight: "700",
                    transition: "background 0.2s",
                  }}
                >
                  {section.count}
                </span>
              </button>
            );
          })}

          {/* Close button */}
          <div style={{ marginLeft: "auto", paddingRight: "16px" }}>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "1px solid #333",
                color: "#888",
                borderRadius: "6px",
                padding: "6px 10px",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Content Area ───────────────────────────────────────────── */}
        <div style={{ padding: "16px 20px 10px", flex: 1, overflow: "auto" }}>
          {/* Video Section */}
          {currentSection?.isVideo ? (
            <div>
              <VideoPanel videoUrl={currentSection.videoUrl} />
              <p
                style={{
                  textAlign: "center",
                  marginTop: "12px",
                  fontSize: "13px",
                  color: "#aaa",
                  letterSpacing: "1px",
                }}
              >
                Property Video
              </p>
            </div>
          ) : (
            <>
              {/* Main Preview Image with Navigation */}
              <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", background: "#222" }}>
                <Gallery>
                  {currentImages.map((img, idx) => (
                    <Item
                      key={idx}
                      original={img.src}
                      thumbnail={img.src}
                      width={img.w}
                      height={img.h}
                    >
                      {({ ref, open }) =>
                        idx === previewIndex ? (
                          <div
                            ref={ref}
                            onClick={open}
                            role="button"
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "420px",
                              cursor: "zoom-in",
                            }}
                          >
                            <Image
                              src={img.src}
                              fill
                              alt={img.alt}
                              style={{ objectFit: "cover" }}
                            />
                            {/* Image count badge */}
                            <div
                              style={{
                                position: "absolute",
                                bottom: "14px",
                                right: "14px",
                                background: "rgba(0,0,0,0.65)",
                                color: "#fff",
                                borderRadius: "20px",
                                padding: "5px 13px",
                                fontSize: "12px",
                                fontWeight: "600",
                                backdropFilter: "blur(6px)",
                              }}
                            >
                              {previewIndex + 1} / {currentImages.length}
                            </div>

                            {/* Section label */}
                            <div
                              style={{
                                position: "absolute",
                                top: "14px",
                                left: "14px",
                                background: "#cf933b",
                                color: "#fff",
                                borderRadius: "6px",
                                padding: "4px 10px",
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {currentSection.label.toUpperCase()}
                            </div>
                          </div>
                        ) : (
                          // Hidden items so photoswipe gallery works
                          <span key={idx} ref={ref} style={{ display: "none" }} onClick={open} />
                        )
                      }
                    </Item>
                  ))}
                </Gallery>

                {/* Prev / Next Arrows */}
                {(previewIndex > 0 || GALLERY_SECTIONS.findIndex(s => s.id === activeSection) > 0) && (
                  <button
                    onClick={handlePreviousImage}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.55)",
                      border: "none",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "38px",
                      height: "38px",
                      fontSize: "18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(4px)",
                      zIndex: 2,
                    }}
                  >
                    ‹
                  </button>
                )}
                {(previewIndex < currentImages.length - 1 || GALLERY_SECTIONS.findIndex(s => s.id === activeSection) < GALLERY_SECTIONS.length - 1) && (
                  <button
                    onClick={handleNextImage}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.55)",
                      border: "none",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "38px",
                      height: "38px",
                      fontSize: "18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(4px)",
                      zIndex: 2,
                    }}
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Thumbnail Strip */}
              <ThumbnailStrip
                images={currentImages}
                currentIndex={previewIndex}
                onSelect={setPreviewIndex}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
