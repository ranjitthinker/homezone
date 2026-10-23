import React from "react";

const OverView = ({ data }) => {
  const catName = (data?.category?.name || '').toLowerCase();
  const catSlug = (data?.category?.slug || '').toLowerCase();
  const isCommercial = catName.includes('commercial') || catSlug.includes('commercial');

  const overviewData = [
    !isCommercial && Number(data?.details?.bedrooms || 0) > 0 && {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: `${data.details.bedrooms} BHK / Beds`,
    },
    !isCommercial && Number(data?.details?.bathrooms || 0) > 0 && {
      icon: "flaticon-shower",
      label: "Bath",
      value: `${data.details.bathrooms} Baths`,
    },
    isCommercial && {
      icon: "flaticon-expand",
      label: "Frontage / Access",
      value: data?.extra_details?.frontage || "Main Road Access",
    },
    isCommercial && {
      icon: "flaticon-electricity",
      label: "Power Backup",
      value: data?.extra_details?.power_backup || "100% DG Backup",
    },
    data?.details?.size_ft && Number(data.details.size_ft) > 0 && {
      icon: "flaticon-expand",
      label: isCommercial ? "Carpet Area" : "Area / Size",
      value: `${data.details.size_ft} sqft`,
      xs: true,
    },
    data?.details?.garages && {
      icon: "flaticon-garage",
      label: isCommercial ? "Parking / Loading" : "Garage / Parking",
      value: data.details.garages,
      xs: true,
    },
    data?.details?.year_built && {
      icon: "flaticon-event",
      label: "Year Built",
      value: data.details.year_built,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: data?.category?.name || (isCommercial ? "Commercial Space" : "Residential"),
    },
  ].filter(Boolean);

  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;