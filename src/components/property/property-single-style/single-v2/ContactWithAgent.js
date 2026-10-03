import Image from "next/image";
import React from "react";

const ContactWithAgent = ({ property }) => {
  const builder = property?.builder || {};
  const builderName = builder.name || "Property Agent";
  const builderLogo =
    builder.logo ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s";
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
        </div>
      </div>
      {/* End agent-single */}
    </>
  );
};

export default ContactWithAgent;
