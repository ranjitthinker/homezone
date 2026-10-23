import React from "react";

const PropertyDetails = ({ data }) => {
  const catName = (data?.category?.name || '').toLowerCase();
  const catSlug = (data?.category?.slug || '').toLowerCase();
  const isCommercial = catName.includes('commercial') || catSlug.includes('commercial') ||
                       ['office-space', 'shop', 'showroom', 'commercial-plot'].includes(catSlug);

  // Helper to format price
  const formatPrice = (price) => {
    if (!price || Number(price) <= 0) return "Price on Request";
    return `₹${Math.round(Number(price)).toLocaleString("en-IN")}`;
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

  const residentialColumns = [
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
        label: "Bedrooms",
        value: data?.details?.bedrooms ? `${data.details.bedrooms} BHK / Beds` : "N/A",
      },
      {
        label: "Bathrooms",
        value: data?.details?.bathrooms || "N/A",
      },
    ],
    [
      {
        label: "Property Type",
        value: data?.category?.name || "Residential",
      },
      {
        label: "Property Status",
        value: formatListedIn(data?.listed_in),
      },
      {
        label: "Parking / Garage",
        value: data?.details?.garages || "Available",
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
    ],
  ];

  const commercialColumns = [
    [
      {
        label: "Property ID",
        value: data?.custom_id || `#${data?.id}` || "N/A",
      },
      {
        label: "Price / Value",
        value: formatPrice(data?.price),
      },
      {
        label: "Carpet Area",
        value: data?.details?.size_ft
          ? `${data.details.size_ft} Sq Ft`
          : "N/A",
      },
      {
        label: "Frontage / Access",
        value: data?.extra_details?.frontage || "Main Road / High Footfall Access",
      },
      {
        label: "Power Backup",
        value: data?.extra_details?.power_backup || "Available (100% DG Backup)",
      },
    ],
    [
      {
        label: "Commercial Type",
        value: data?.category?.name || "Commercial Space",
      },
      {
        label: "Property Status",
        value: formatListedIn(data?.listed_in),
      },
      {
        label: "Suitable For",
        value: data?.extra_details?.suitable_for || "Office, Showroom, Retail, Clinic",
      },
      {
        label: "Parking Spaces",
        value: data?.details?.garages ? `${data.details.garages} Dedicated` : "Customer & Dedicated Parking",
      },
      {
        label: "Year Built",
        value: data?.details?.year_built || "N/A",
      },
    ],
  ];

  const columns = isCommercial ? commercialColumns : residentialColumns;

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