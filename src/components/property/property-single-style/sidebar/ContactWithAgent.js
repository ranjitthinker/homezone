import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactWithAgent = ({ property }) => {
  

   // Extract builder information with fallbacks
  const builder = property?.builder || {};
  const builderName = builder.name || "Property Agent";
  const builderDescription = builder.description || "Contact for more details";
  const builderLogo = builder.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s";
  const builderId = builder.id || 1;
  const builderPhone = builder.phone || null;
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <Image
            width={90}
            height={90}
            className="w90"
            src={builderLogo}
            alt={builderName}
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">{builderName}</h6>
          {builderPhone && (
            <div className="agent-meta mb10 d-md-flex align-items-center">
              <a className="text fz15" href={`tel:${builderPhone}`}>
                <i className="flaticon-call pe-1" />
                {builderPhone}
              </a>
            </div>
          )}
          {/* <Link
            href="/agent-single/3"
            className="text-decoration-underline fw600"
          >
            View Listings
          </Link> */}
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid mt-3">
        <a
          href={`https://wa.me/919855515783?text=${encodeURIComponent(
            `Hi Home Zone, I am interested in property #${property?.custom_id || property?.id} (${property?.title || 'Property'}) ${Number(property?.price) > 0 ? `priced at ₹${Math.round(Number(property.price)).toLocaleString('en-IN')}` : '(Price on Request)'}. Please connect me with the developer/agent.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ud-btn text-white d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#25D366',
            borderColor: '#25D366',
            borderRadius: '10px',
            padding: '12px',
            fontWeight: 600,
          }}
        >
          <i className="fab fa-whatsapp me-2" style={{ fontSize: '18px' }} />
          Chat on WhatsApp
        </a>
      </div>
    </>
  );
};

export default ContactWithAgent;
