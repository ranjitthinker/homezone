"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const Location = ({ filterFunctions }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setShowSelect(true);
    const fetchCities = async () => {
      try {
        const response = await apiService.get(`${API_URLS.PROPERTIES_BY_CITIES}`);
        if (response.data.success) {
          const citiesData = response.data.data.map((city) => ({
            value: city.name,
            label: city.name,
            id: city.id,
          }));
          setCities(citiesData);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const locationOptions = [
    { value: "All Cities", label: "All Cities" },
    ...cities,
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
    <>
      {" "}
      {showSelect && (
        <Select
          defaultValue={[locationOptions[0]]}
          name="colors"
          styles={customStyles}
          options={locationOptions}
          value={{
            value: filterFunctions.location,
            label: filterFunctions.location,
          }}
          className="select-custom filterSelect"
          classNamePrefix="select"
          onChange={(e) => filterFunctions?.handlelocation(e.value)}
          required
        />
      )}{" "}
    </>
  );
};

export default Location;
