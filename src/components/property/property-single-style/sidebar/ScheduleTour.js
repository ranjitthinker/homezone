"use client";
import React, { useState } from "react";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const ScheduleTour = ({ propertyId }) => {
  const tabs = [
    { id: "inperson", label: "In Person" },
    { id: "videochat", label: "Video Chat" },
  ];

  const [activeTab, setActiveTab] = useState("inperson");
  const [formData, setFormData] = useState({
    time: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await apiService.post(API_URLS.PROPERTY_QUERIES, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Tour Type: ${activeTab === "inperson" ? "In Person" : "Video Chat"} | Preferred Time: ${formData.time}\n\n${formData.message}`,
        property_id: propertyId || null,
        query_type: "schedule_tour",
      });

      setSuccess(true);
      setFormData({ time: "", name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to submit. Please try again.");
      console.error("ScheduleTour error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ps-navtab">
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id} role="presentation">
            <button
              className={`nav-link${tab.id === activeTab ? " active mr15 mb5-lg" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              role="tab"
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="mb20">
              <input
                type="text"
                className="form-control"
                placeholder="Preferred Time (e.g. 10am - 12pm)"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-lg-12">
            <div className="mb20">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-lg-12">
            <div className="mb20">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb20">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb10">
              <textarea
                cols={30}
                rows={4}
                placeholder="Additional message (optional)"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>

          {success && (
            <div className="col-md-12 mb10">
              <div className="alert alert-success py-2">
                ✅ Tour request submitted! We&apos;ll contact you soon.
              </div>
            </div>
          )}

          {error && (
            <div className="col-md-12 mb10">
              <div className="alert alert-danger py-2">{error}</div>
            </div>
          )}

          <div className="col-md-12">
            <div className="d-grid">
              <button
                type="submit"
                className="ud-btn btn-thm"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit a Tour Request"}
                {!loading && <i className="fal fa-arrow-right-long" />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTour;
