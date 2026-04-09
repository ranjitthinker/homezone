// components/property/property-single-style/common/MobileBottomBar.jsx
"use client";

import React, { useState } from "react";
import Form from "@/components/pages/contact/Form";

const MobileBottomBar = ({property}) => {
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      {/* Fixed Bottom Bar - Mobile Only */}
      <div className="mobile-bottom-bar d-lg-none">
        {/* Enquiry Badge */}
        <div className="enquiry-badge">
          <span className="enquiry-icon">
            <i className="fas fa-fire-alt"></i>
          </span>
          <span className="enquiry-text">
            <strong>13 people</strong> already enquired
          </span>
        </div>

        {/* Action Buttons */}
        <div className="bottom-bar-buttons">
          <button
            className="btn btn-callback"
            onClick={() => setShowCallbackModal(true)}
          >
            Get Callback
          </button>
          <button
            className="btn btn-contact-developer"
            onClick={() => setShowContactModal(true)}
          >
            Contact Developer
          </button>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed bar on mobile */}
      <div className="mobile-bottom-spacer d-lg-none"></div>

      {/* Get Callback Modal */}
      {showCallbackModal && (
        <div
          className="mobile-modal-overlay"
          onClick={() => setShowCallbackModal(false)}
        >
          <div
            className="mobile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-modal-header">
              <h5 className="mb-0">Get Callback</h5>
              <button
                className="mobile-modal-close"
                onClick={() => setShowCallbackModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mobile-modal-body">
              <p className="text-muted mb15">
                Fill in your details and our team will call you back shortly.
              </p>
              <Form propertyId={property.id} />
            </div>
          </div>
        </div>
      )}

      {/* Contact Developer Modal */}
      {showContactModal && (
        <div
          className="mobile-modal-overlay"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="mobile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-modal-header">
              <h5 className="mb-0">Contact Developer</h5>
              <button
                className="mobile-modal-close"
                onClick={() => setShowContactModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mobile-modal-body">
              <p className="text-muted mb15">
                Send a message directly to the developer.
              </p>
              <Form />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mobile-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          z-index: 9999;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
        }

        .enquiry-badge {
          background: linear-gradient(135deg, #fff0f0 0%, #ffe0e8 100%);
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #fce4ec;
        }

        .enquiry-icon {
          color: #e53935;
          font-size: 16px;
          animation: pulse 1.5s infinite;
        }

        .enquiry-text {
          font-size: 13px;
          color: #333;
        }

        .enquiry-text strong {
          color: #e53935;
          font-weight: 700;
        }

        .bottom-bar-buttons {
          display: flex;
          gap: 10px;
          padding: 12px 16px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
        }

        .btn-callback {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #333;
          background: #fff;
          color: #333;
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .btn-callback:hover,
        .btn-callback:active {
          background: #333;
          color: #fff;
        }

        .btn-contact-developer {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: linear-gradient(135deg, #00b894 0%, #00a381 100%);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .btn-contact-developer:hover,
        .btn-contact-developer:active {
          background: linear-gradient(135deg, #00a381 0%, #009270 100%);
          color: #fff;
        }

        .mobile-bottom-spacer {
          height: 110px;
        }

        /* Modal Styles */
        .mobile-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10000;
          display: flex;
          align-items: flex-end;
          animation: fadeIn 0.2s ease;
        }

        .mobile-modal-content {
          background: #fff;
          width: 100%;
          border-radius: 16px 16px 0 0;
          animation: slideUp 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        .mobile-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          background: #fff;
          border-radius: 16px 16px 0 0;
          z-index: 1;
        }

        .mobile-modal-close {
          background: none;
          border: none;
          font-size: 18px;
          color: #666;
          padding: 4px 8px;
          cursor: pointer;
        }

        .mobile-modal-body {
          padding: 20px;
          padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default MobileBottomBar;