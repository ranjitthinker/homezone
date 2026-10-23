'use client';
import React, { useState } from 'react';
import ModalVideo from '@/components/common/ModalVideo';

const PropertyVideo = ({ url, videoUrl }) => {
  const [isOpen, setOpen] = useState(false);
  const effectiveUrl = url || videoUrl;

  if (!effectiveUrl) return null;

  // Convert YouTube regular/shorts link to embed url if needed
  const getEmbedUrl = (raw) => {
    try {
      if (raw.includes('youtube.com/shorts/')) {
        const id = raw.split('youtube.com/shorts/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (raw.includes('youtu.be/')) {
        const id = raw.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (raw.includes('youtube.com/watch?v=')) {
        const id = raw.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return raw;
    } catch (_) {
      return raw;
    }
  };

  const embedSrc = getEmbedUrl(effectiveUrl);
  const isEmbeddable = embedSrc.includes('youtube.com/embed') || embedSrc.includes('player.vimeo.com');

  return (
    <>
      <div className="col-md-12">
        {isEmbeddable ? (
          <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
            <iframe
              src={embedSrc}
              title="Property Walkthrough Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            />
          </div>
        ) : (
          <>
            <ModalVideo src={effectiveUrl} isOpen={isOpen} setIsOpen={setOpen} />
            <div className="property_video bdrs12 w-100 position-relative" style={{ minHeight: '300px', backgroundColor: '#181a20' }}>
              <button
                className="video_popup_btn mx-auto popup-img"
                onClick={() => setOpen(true)}
                style={{ border: 'none', background: 'transparent' }}
              >
                <span className="flaticon-play" />
              </button>
            </div>
          </>
        )}

        {/* Share Video on Social / WhatsApp CTA */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <small className="text-muted">
            <i className="fas fa-video text-danger me-1" /> Verified Video Walkthrough
          </small>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Watch this verified property walkthrough on Home Zone: ${typeof window !== 'undefined' ? window.location.href : ''}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm text-white px-3 py-1"
            style={{ backgroundColor: '#25D366', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}
          >
            <i className="fab fa-whatsapp me-1" /> Share Video
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertyVideo;
