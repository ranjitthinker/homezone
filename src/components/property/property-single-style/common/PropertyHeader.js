"use client";

import React from "react";

const PropertyHeader = ({ data }) => {
  const price = Number(data.price).toLocaleString("en-IN");

  const pricePerSqft =
    data.details?.size_ft
      ? (Number(data.price) / data.details.size_ft).toFixed(2)
      : 0;

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.title}</h2>

          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {data.location?.address || "N/A"}
            </p>

            <span className="ff-heading text-thm fz15 bdrr1 pr10 ml10 bdrrn-sm">
              <i className="fas fa-circle fz10 pe-2" />
              For {data.listed_in === "rent" ? "rent" : "sale"}
            </span>

            <span className="ff-heading bdrr1 fz15 pr10 ml10 bdrrn-sm">
              <i className="far fa-clock pe-2" />
              {data.created_at
                ? new Date().getFullYear() -
                  new Date(data.created_at).getFullYear()
                : 0}{" "}
              years ago
            </span>

            <span className="ff-heading ml10 fz15">
              <i className="flaticon-fullscreen pe-2" />
              {data.details?.size_ft || 0} sqft
            </span>
          </div>

          <div className="property-meta d-flex align-items-center">
            <span className="text fz15">
              <i className="flaticon-bed pe-2" />
              {data.details?.bedrooms || 0} bed
            </span>

            <span className="text ml20 fz15">
              <i className="flaticon-shower pe-2" />
              {data.details?.bathrooms || 0} bath
            </span>

            <span className="text ml20 fz15">
              <i className="flaticon-expand pe-2" />
              {data.details?.size_ft || 0} sqft
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#"><span className="flaticon-like" /></a>
              <a className="icon mr10" href="#"><span className="flaticon-new-tab" /></a>
              <a className="icon mr10" href="#"><span className="flaticon-share-1" /></a>
              <a className="icon" href="#"><span className="flaticon-printer" /></a>
            </div>

            <h3 className="price mb-0">₹{price}</h3>

            <p className="text space fz15">
              ₹{pricePerSqft}/sq ft
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;