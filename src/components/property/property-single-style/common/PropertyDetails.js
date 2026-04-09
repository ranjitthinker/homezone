import React from "react";

const PropertyDetails = ({ data }) => {
  // Helper to format price
  const formatPrice = (price) => {
    if (!price) return "N/A";
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // Helper to format listed_in status
  const formatListedIn = (listedIn) => {
    if (!listedIn) return "N/A";
    const statusMap = {
      sale: "For Sale",
      rent: "For Rent",
      lease: "For Lease",
    };
    return statusMap[listedIn] || listedIn;
  };

  const columns = [
    [
      {
        label: "Property ID",
        value: data?.custom_id || `#${data?.id}` || "N/A",
      },
      {
        label: "Price",
        value: formatPrice(data?.price),
      },
      {
        label: "Property Size",
        value: data?.details?.size_ft
          ? `${data.details.size_ft} Sq Ft`
          : "N/A",
      },
      {
        label: "Bathrooms",
        value: data?.details?.bathrooms || "N/A",
      },
      {
        label: "Bedrooms",
        value: data?.details?.bedrooms || "N/A",
      },
    ],
    [
      {
        label: "Garage",
        value: data?.details?.garages || "N/A",
      },
      {
        label: "Garage Size",
        value: data?.details?.garage_size
          ? `${data.details.garage_size} SqFt`
          : "N/A",
      },
      {
        label: "Year Built",
        value: data?.details?.year_built || "N/A",
      },
      {
        label: "Property Type",
        value: data?.category?.name || "N/A",
      },
      {
        label: "Property Status",
        value: formatListedIn(data?.listed_in),
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;