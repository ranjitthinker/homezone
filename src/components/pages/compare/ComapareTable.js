"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const FALLBACK_IMG = "/images/listings/compare-1.jpg";

const ComapareTable = () => {
  const [availableProperties, setAvailableProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initCompare = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(API_URLS.PROPERTY, { params: { per_page: 20 } });
        const list = res.data?.data || [];
        setAvailableProperties(list);

        // Check local storage for user-added comparison items
        let saved = [];
        try {
          const stored = JSON.parse(localStorage.getItem("compare_properties") || "{}");
          saved = Object.values(stored);
        } catch (_) {}

        if (saved.length > 0) {
          setSelectedProperties(saved.slice(0, 3));
        } else if (list.length > 0) {
          // Pre-populate with first 2-3 properties as smart default
          setSelectedProperties(list.slice(0, Math.min(3, list.length)));
        }
      } catch (err) {
        console.error("Error loading comparison properties", err);
      } finally {
        setLoading(false);
      }
    };

    initCompare();
  }, []);

  const handleSelectSlot = (index, propertyId) => {
    if (!propertyId) {
      // Clear slot
      const updated = selectedProperties.filter((_, i) => i !== index);
      setSelectedProperties(updated);
      syncLocalStorage(updated);
      return;
    }

    const found = availableProperties.find((p) => String(p.id) === String(propertyId));
    if (!found) return;

    const updated = [...selectedProperties];
    updated[index] = found;
    setSelectedProperties(updated);
    syncLocalStorage(updated);
  };

  const removeProperty = (index) => {
    const updated = selectedProperties.filter((_, i) => i !== index);
    setSelectedProperties(updated);
    syncLocalStorage(updated);
  };

  const syncLocalStorage = (propsList) => {
    try {
      const map = {};
      propsList.forEach((p) => {
        if (p?.id) map[p.id] = p;
      });
      localStorage.setItem("compare_properties", JSON.stringify(map));
    } catch (_) {}
  };

  const formatPrice = (p) => {
    if (!p || Number(p) <= 0) return "Price on Request";
    const num = Number(p);
    return isNaN(num) ? p : `₹${Math.round(num).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status" />
        <p className="mt-3 text-muted">Loading comparison data...</p>
      </div>
    );
  }

  // Ensure 3 slots
  const slots = [0, 1, 2];

  return (
    <div className="compare-container">
      {/* Header Slot Pickers */}
      <div className="row g-3 mb-4">
        {slots.map((slotIndex) => {
          const prop = selectedProperties[slotIndex];
          return (
            <div className="col-md-4" key={slotIndex}>
              <div className="p-3 bg-white rounded-3 border">
                <label className="fw600 fz13 text-muted mb-1 d-block">
                  Slot {slotIndex + 1}: {prop ? prop.title : "Choose Property"}
                </label>
                <select
                  className="form-select form-select-sm"
                  value={prop?.id || ""}
                  onChange={(e) => handleSelectSlot(slotIndex, e.target.value)}
                >
                  <option value="">-- Choose Property to Compare --</option>
                  {availableProperties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({formatPrice(p.price)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProperties.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 border">
          <i className="fas fa-columns fz40 text-muted mb-3" />
          <h5>No properties selected for comparison</h5>
          <p className="text-muted fz14">Select properties from the dropdown above or browse listings and click "Compare".</p>
          <Link href="/properties" className="ud-btn btn-thm">
            Browse All Properties
          </Link>
        </div>
      ) : (
        <table className="table table-bordered bg-white mb-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
          {/* Photos and Main Info */}
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={{ width: "220px", verticalAlign: "middle" }} className="fw700 fz15">
                Property Overview
              </th>
              {slots.map((slotIndex) => {
                const item = selectedProperties[slotIndex];
                if (!item) {
                  return (
                    <th key={slotIndex} className="text-center text-muted fz13 p-4" style={{ width: "26%" }}>
                      Empty Slot. Select a property above.
                    </th>
                  );
                }
                const isCommercial =
                  item.category?.name?.toLowerCase().includes("commercial") ||
                  item.category?.slug?.toLowerCase().includes("commercial");

                return (
                  <th key={slotIndex} style={{ width: "26%" }}>
                    <div className="position-relative">
                      <button
                        type="button"
                        onClick={() => removeProperty(slotIndex)}
                        className="btn btn-sm btn-light position-absolute top-0 end-0 m-1"
                        style={{ borderRadius: "50%", padding: "2px 7px", zIndex: 2 }}
                        title="Remove"
                      >
                        ✕
                      </button>
                      <Image
                        width={300}
                        height={180}
                        className="w-100 rounded-3 mb-2"
                        style={{ height: "170px", objectFit: "cover" }}
                        src={item.image || FALLBACK_IMG}
                        alt={item.title || "Property"}
                        unoptimized={Boolean(item.image?.startsWith("http"))}
                      />
                      <span className={`badge ${isCommercial ? 'bg-primary' : 'bg-danger'} mb-1`}>
                        {isCommercial ? "Commercial" : "Residential"}
                      </span>
                      <h6 className="fz15 fw700 mb-1">
                        <Link href={`/property/${item.slug}`} className="text-dark">
                          {item.title}
                        </Link>
                      </h6>
                      <div className="price fz18 fw800 text-danger mb-2">
                        {formatPrice(item.price)}
                      </div>
                      <a
                        href={`https://wa.me/919855515783?text=${encodeURIComponent(
                          `Hi Home Zone, I am comparing "${item.title}" (ID: #${item.custom_id || item.id}) on your website. Please share full brochure and offer details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm text-white w-100 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "#25D366", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}
                      >
                        <i className="fab fa-whatsapp me-1" /> Inquire on WhatsApp
                      </a>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th className="fw600 text-muted fz14 bg-light">Property Type</th>
              {slots.map((i) => (
                <td key={i} className="fz14 fw600">
                  {selectedProperties[i]?.category?.name || "--"}
                </td>
              ))}
            </tr>

            <tr>
              <th className="fw600 text-muted fz14 bg-light">Locality / Address</th>
              {slots.map((i) => (
                <td key={i} className="fz14">
                  {selectedProperties[i]?.location?.address || "Patiala, Punjab"}
                </td>
              ))}
            </tr>

            <tr>
              <th className="fw600 text-muted fz14 bg-light">Super Built-up / Size</th>
              {slots.map((i) => (
                <td key={i} className="fz14 fw600">
                  {selectedProperties[i]?.size_ft ? `${selectedProperties[i].size_ft} Sq.Ft.` : "--"}
                </td>
              ))}
            </tr>

            <tr>
              <th className="fw600 text-muted fz14 bg-light">Bedrooms (BHK)</th>
              {slots.map((i) => {
                const prop = selectedProperties[i];
                if (!prop) return <td key={i}>--</td>;
                const isComm = prop.category?.name?.toLowerCase().includes("commercial");
                return (
                  <td key={i} className="fz14">
                    {isComm ? "N/A (Commercial Space)" : prop.bedrooms ? `${prop.bedrooms} BHK` : "--"}
                  </td>
                );
              })}
            </tr>

            <tr>
              <th className="fw600 text-muted fz14 bg-light">Bathrooms</th>
              {slots.map((i) => {
                const prop = selectedProperties[i];
                if (!prop) return <td key={i}>--</td>;
                const isComm = prop.category?.name?.toLowerCase().includes("commercial");
                return (
                  <td key={i} className="fz14">
                    {isComm ? "N/A (Commercial)" : prop.bathrooms ? `${prop.bathrooms} Baths` : "--"}
                  </td>
                );
              })}
            </tr>

            <tr>
              <th className="fw600 text-muted fz14 bg-light">Status / Purpose</th>
              {slots.map((i) => (
                <td key={i} className="fz14 text-capitalize">
                  {selectedProperties[i]?.listed_in ? `For ${selectedProperties[i].listed_in}` : "--"}
                </td>
              ))}
            </tr>

            <tr>
              <th className="fw600 text-muted fz14 bg-light">Direct Action</th>
              {slots.map((i) => {
                const prop = selectedProperties[i];
                if (!prop) return <td key={i}>--</td>;
                return (
                  <td key={i}>
                    <Link
                      href={`/property/${prop.slug}`}
                      className="ud-btn btn-white w-100 py-1 text-center"
                      style={{ fontSize: "12px", borderRadius: "20px" }}
                    >
                      View Details <i className="fal fa-arrow-right-long ms-1" />
                    </Link>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComapareTable;
