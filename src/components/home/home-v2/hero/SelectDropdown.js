"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const ALL_OPTION = { value: "", label: "All Cities" };

const SelectDropdown = ({ onChange, value, onCitiesLoaded }) => {
  const [cityOptions, setCityOptions] = useState([ALL_OPTION]);

  useEffect(() => {
    let isMounted = true;
    const fetchCities = async () => {
      try {
        const res = await apiService.get(`${API_URLS.PROPERTIES_BY_CITIES}`);
        const options =
          res.data?.data?.map((city) => ({
            value: city.id,
            label: city.name,
          })) ?? [];
        const fullOptions = [ALL_OPTION, ...options];
        if (isMounted) {
          setCityOptions(fullOptions);
          if (typeof onCitiesLoaded === "function") {
            onCitiesLoaded(fullOptions);
          }
        }
      } catch (err) {
        // Handle error silently
      }
    };
    fetchCities();
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedValue =
    cityOptions.find((opt) => String(opt.value) === String(value)) ||
    (value ? { value, label: value } : ALL_OPTION);

  const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isFocused
        ? "#eb675312"
        : undefined,
      color: isSelected ? "#ffffff" : "#222222",
    }),
  };

  return (
    <Select
      value={selectedValue}
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