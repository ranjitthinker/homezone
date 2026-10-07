"use client";
import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Amenities from "./Amenities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdvanceFilterModal = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [propertyId, setPropertyId] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");

  const router = useRouter();

  useEffect(() => {
    setShowSelect(true);
  }, []);

  const catOptions = [
    { value: "luxury-apartments", label: "Luxury Apartments" },
    { value: "villas-bungalows", label: "Villas & Bungalows" },
    { value: "commercial-spaces", label: "Commercial Spaces" },
    { value: "penthouses", label: "Penthouses" },
    { value: "gated-communities", label: "Gated Communities" },
    { value: "studio-apartments", label: "Studio Apartments" },
  ];

  const locationOptions = [
    { value: "", label: "All Cities" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bengaluru", label: "Bengaluru" },
    { value: "Gurugram", label: "Gurugram" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Pune", label: "Pune" },
    { value: "New Delhi", label: "New Delhi" },
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Dubai", label: "Dubai" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedCategory(null);
    setSelectedLocation(null);
    setPropertyId("");
    setMinSize("");
    setMaxSize("");
    toast.success("Filters reset successfully");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCategory?.value) params.set("category", selectedCategory.value);
    if (selectedLocation?.value) params.set("city", selectedLocation.value);
    if (propertyId.trim()) params.set("q", propertyId.trim());
    if (minSize) params.set("min_size", minSize);
    if (maxSize) params.set("max_size", maxSize);

    const queryString = params.toString();
    router.push(queryString ? `/properties?${queryString}` : "/properties");
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            Advanced Property Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Property Category</h6>
                <div className="form-style2 input-group">
                  {showSelect && (
                    <Select
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      name="categories"
                      options={catOptions}
                      styles={customStyles}
                      className="select-custom"
                      classNamePrefix="select"
                      placeholder="Select Category"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Keyword or ID</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Worli, HZ-101"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">City / Location</h6>
                <div className="form-style2 input-group">
                  {showSelect && (
                    <Select
                      value={selectedLocation}
                      onChange={setSelectedLocation}
                      name="location"
                      styles={customStyles}
                      options={locationOptions}
                      className="select-custom"
                      classNamePrefix="select"
                      placeholder="Select City"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Square Feet</h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Min."
                        value={minSize}
                        onChange={(e) => setMinSize(e.target.value)}
                      />
                    </div>
                    <span className="dark-color px-2">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Max"
                        value={maxSize}
                        onChange={(e) => setMaxSize(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>
            <Amenities />
          </div>
        </div>

        <div className="modal-footer justify-content-between">
          <button
            type="button"
            className="reset-button border-0 bg-transparent"
            onClick={handleReset}
          >
            <span className="flaticon-turn-back me-1" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button
              data-bs-dismiss="modal"
              type="button"
              className="ud-btn btn-thm"
              onClick={handleSearch}
            >
              <span className="flaticon-search align-text-top pr10" />
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
