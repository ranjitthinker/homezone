"use client";
import React, { useState } from "react";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const Form = ({ propertyId }) => {
  
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      property_id: propertyId,
      name: `${formData.name} ${formData.last_name}`.trim(),
      email: formData.email,
      phone: formData.phone,   // ✅ add
      message: formData.message,
      query_type: "contact_seller",
      quick_pick: "site_visit",
      agree_contact: true,
      interested_home_loan: false,
      source_page: window.location.pathname,
    };

    try {
      await apiService.post(`${API_URLS.PROPERTY_QUERY}`, payload);
      setSuccess(true);
      setFormData({ name: "", last_name: "", email: "", phone: "", message: "" });
    } catch (err) {
      
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              First Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your First Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Your Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              Message
            </label>
            <textarea
              name="message"
              cols={30}
              rows={4}
              placeholder="I want to visit this property this weekend."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ✅ Success message */}
        {success && (
          <div className="col-md-12 mb10">
            <div className="alert alert-success">
              Query submitted successfully! We will contact you soon.
            </div>
          </div>
        )}

        {/* ✅ Error message */}
        {error && (
          <div className="col-md-12 mb10">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}

        <div className="col-md-12">
          <div className="d-grid">
            <button
              type="submit"
              className="ud-btn btn-thm"
              disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
              {!loading && <i className="fal fa-arrow-right-long" />}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;