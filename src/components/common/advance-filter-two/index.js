"use client";
import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Amenities from "./Amenities";
import { useEffect, useState } from "react";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const AdvanceFilterModal = ({ filterFunctions }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(null);

  // Fetch cities data
  useEffect(() => {
    setShowSelect(true);
    const fetchCities = async () => {
      setCitiesLoading(true);
      setCitiesError(null);
      try {
        const response = await apiService.get(`${API_URLS.PROPERTIES_BY_CITIES}`);
        if (response.data.success) {
          const citiesData = response.data.data.map(city => ({
            value: city.name,
            label: city.name,
            id: city.id,
            property_count: city.property_count
          }));
          setCities(citiesData);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCitiesError('Failed to load cities');
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, []);
  const catOptions = [
    { value: "Houses", label: "Houses" },
    { value: "Office", label: "Office" },
    { value: "Apartments", label: "Apartments" },
    { value: "Villa", label: "Villa" },
  ];

  // Create location options with "All Cities" as first option and fetched cities
  const locationOptions = [
    { value: "All Cities", label: "All Cities" },
    ...cities
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

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            More Filter
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* End modal-header */}

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Type</h6>
                <div className="form-style2 input-group">
                  {showSelect && (
                    <Select
                      defaultValue={[catOptions[1]]}
                      name="colors"
                      options={catOptions}
                      styles={customStyles}
                      onChange={(e) =>
                        filterFunctions?.setPropertyTypes([e.value])
                      }
                      className="select-custom"
                      classNamePrefix="select"
                      required
                    />
                  )}
                </div>
              </div>
            </div> */}
            {/* End .col-6 */}

            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Property ID</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="RT04949213"
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Location</h6>
                <div className="form-style2 input-group">
                  {citiesLoading ? (
                    <div className="form-control text-muted">
                      Loading cities...
                    </div>
                  ) : citiesError ? (
                    <div className="form-control text-danger">
                      {citiesError}
                    </div>
                  ) : (
                    <Select
                      defaultValue={[locationOptions[0]]}
                      name="colors"
                      styles={customStyles}
                      options={locationOptions}
                      className="select-custom filterSelect"
                      value={{
                        value: filterFunctions?.location,
                        label: filterFunctions?.location,
                      }}
                      classNamePrefix="select"
                      onChange={(e) => filterFunctions?.handlelocation(e.value)}
                      required
                      isLoading={citiesLoading}
                      isDisabled={citiesLoading || !!citiesError}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Square Feet</h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            e.target.value,
                            document.getElementById("maxFeet3").value / 1,
                          ])
                        }
                        placeholder="Min."
                        id="minFeet3"
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        placeholder="Max"
                        id="maxFeet3"
                        onChange={(e) =>
                          filterFunctions?.handlesquirefeet([
                            document.getElementById("minFeet3").value / 1,
                            e.target.value,
                          ])
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>
            <Amenities filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button
            type="button"
            className="reset-button border-0 bg-transparent"
            onClick={() => filterFunctions?.resetFilter()}
          >
            <span className="flaticon-turn-back me-1" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button
              type="button"
              className="ud-btn btn-thm"
              data-bs-dismiss="modal"
            >
              <span className="flaticon-search align-text-top pr10" />
              Apply Filters
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
