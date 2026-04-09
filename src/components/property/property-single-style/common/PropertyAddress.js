import React from "react";

const PropertyAddress = ({ property }) => {
  const location = property?.location || {};
  const coordinates = property?.coordinates || {};

  const addressFields = [
    { label: "Address", value: location.address },
    { label: "City", value: location.city },
    { label: "State", value: location.state },
    { label: "Zip/Postal Code", value: location.zip },
    { label: "Neighborhood", value: location.neighborhood },
    { label: "Country", value: location.country },
  ];

  // Filter out null/empty fields and organize by columns
  const leftFields = addressFields.slice(0, 3); // Address, City, State
  const rightFields = addressFields.slice(3); // Zip, Neighborhood, Country

  const mapQuery = location.address
    ? encodeURIComponent(location.address)
    : `${coordinates.latitude},${coordinates.longitude}`;

  return (
    <>
      {/* Left Column */}
      <div className="col-md-6 col-xl-4">
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            {leftFields.map((field, i) => (
              <p
                key={i}
                className={`fw600 ${i === leftFields.length - 1 ? "mb-0" : "mb10"} ff-heading dark-color`}
              >
                {field.label}
              </p>
            ))}
          </div>
          <div className="pd-list">
            {leftFields.map((field, i) => (
              <p
                key={i}
                className={`text ${i === leftFields.length - 1 ? "mb-0" : "mb10"}`}
              >
                {field.value || "—"}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-md-6 col-xl-4 offset-xl-2">
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            {rightFields.map((field, i) => (
              <p
                key={i}
                className={`fw600 ${i === rightFields.length - 1 ? "mb-0" : "mb10"} ff-heading dark-color`}
              >
                {field.label}
              </p>
            ))}
          </div>
          <div className="pd-list">
            {rightFields.map((field, i) => (
              <p
                key={i}
                className={`text ${i === rightFields.length - 1 ? "mb-0" : "mb10"}`}
              >
                {field.value || "—"}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* End col */}

      {/* Map */}
      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={
            coordinates.latitude && coordinates.longitude
              ? `https://maps.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&t=m&z=14&output=embed&iwloc=near`
              : `https://maps.google.com/maps?q=${mapQuery}&t=m&z=14&output=embed&iwloc=near`
          }
          title={location.address || "Property Location"}
          aria-label={location.address || "Property Location"}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;