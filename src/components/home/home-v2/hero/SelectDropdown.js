"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";
const ALL_OPTION = { value: "", label: "All Cities" }; // ✅ default "All" option

const SelectDropdown = ({ onChange }) => {
  const [cityOptions, setCityOptions] = useState([ALL_OPTION]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await apiService.get(`${API_URLS.PROPERTIES_BY_CITIES}`);
        const options = res.data?.data?.map((city) => ({
          value: city.id,
          label: city.name,
        })) ?? [];
        setCityOptions([ALL_OPTION, ...options]); 
      } catch (err) {
        // Handle error silently or log if needed
      }
    };
    fetchCities();
  }, []);

  const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isFocused
        ? "#eb675312"
        : undefined,
    }),
  };

  return (
    <Select
      defaultValue={ALL_OPTION}   // ✅ "All Cities" selected by default
      name="city"
      options={cityOptions}
      styles={customStyles}
      className="text-start select-borderless"
      classNamePrefix="select"
      isSearchable={false}
      onChange={onChange}
    />
  );
};

export default SelectDropdown;