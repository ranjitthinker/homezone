import React from "react";

const PropertyHeader = ({ property }) => {
  if (!property) return null;

  const price = Number(property.price);
  const sizeFt = property.details?.size_ft;
  const pricePerSqft = sizeFt ? (price / sizeFt).toFixed(2) : null;
  const yearBuilt = property.details?.year_built;
  const yearsAgo = yearBuilt ? Number(new Date().getFullYear()) - Number(yearBuilt) : null;
  const address = property.location?.address ?? 'Location not available';
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          {/* ✅ title */}
          <h2 className="sp-lg-title">{property.title}</h2>

          <div className="pd-meta mb15 d-md-flex align-items-center">
            {/* ✅ address from location.address */}
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {address}
            </p>
          </div>

          <div className="property-meta d-flex align-items-center">
            {/* ✅ listed_in: "sale" | "rent" */}
            <a className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm" href="#">
              <i className="fas fa-circle fz10 pe-2" />
              For {property.listed_in === 'rent' ? 'Rent' : 'Sale'}
            </a>

            {/* ✅ year_built — show only if available */}
            {yearsAgo !== null ? (
              <a className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm" href="#">
                <i className="far fa-clock pe-2" />
                {yearsAgo} years ago
              </a>
            ) : (
              <a className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm" href="#">
                <i className="far fa-calendar pe-2" />
                {property.category?.name ?? 'Property'}
              </a>
            )}

            {/* ✅ size_ft */}
            {sizeFt && (
              <a className="ff-heading ml10 ml0-sm fz15" href="#">
                <i className="flaticon-fullscreen pe-2 align-text-top" />
                {sizeFt.toLocaleString()} sq ft
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#"><span className="flaticon-like" /></a>
              <a className="icon mr10" href="#"><span className="flaticon-new-tab" /></a>
              <a className="icon mr10" href="#"><span className="flaticon-share-1" /></a>
              <a className="icon" href="#"><span className="flaticon-printer" /></a>
            </div>

            {/* ✅ price formatted */}
            <h3 className="price mb-0">{formattedPrice}</h3>

            {/* ✅ price per sqft — only shown if size_ft exists */}
            {pricePerSqft && (
              <p className="text space fz15">
                ₹{Number(pricePerSqft).toLocaleString('en-IN')}/sq ft
              </p>
            )}

            {/* ✅ status badge */}
            <span className={`badge ${property.status === 'active' ? 'bg-success' : 'bg-secondary'} mt-1`}>
              {property.status}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;