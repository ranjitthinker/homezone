'use client'

import React from "react";

const PropertyType = ({ filterFunctions }) => {
  const effectiveCategory = (filterFunctions?.effectiveCategory || '').toLowerCase();

  const residentialOptions = [
    { label: "Apartment" },
    { label: "Villa" },
    { label: "Builder Floor" },
    { label: "Residential Plot" },
  ];

  const commercialOptions = [
    { label: "Office Space" },
    { label: "Shop" },
    { label: "Showroom" },
    { label: "Commercial Plot" },
  ];

  const allOptions = [
    { label: "Apartment" },
    { label: "Villa" },
    { label: "Office Space" },
    { label: "Showroom" },
    { label: "Shop" },
  ];

  const options =
    effectiveCategory === "residential"
      ? residentialOptions
      : effectiveCategory === "commercial"
      ? commercialOptions
      : allOptions;

  return (
    <>
      <label className="custom_checkbox">
        All
        <input
          type="checkbox"
          checked={!filterFunctions?.propertyTypes.length}
          onChange={() => {
            filterFunctions?.setPropertyTypes([]);
          }}
        />
        <span className="checkmark" />
      </label>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {option.label}
          <input
            type="checkbox"
            checked={filterFunctions?.propertyTypes.includes(option.label)}
            onChange={() => {
              filterFunctions.handlepropertyTypes(option.label);
            }}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
