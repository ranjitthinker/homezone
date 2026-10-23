"use client";
import React, { useState } from "react";
import Link from "next/link";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";
import { toast } from "react-hot-toast";

const PostPropertyWizard = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const [formData, setFormData] = useState({
    userType: "Owner", // 'Owner' | 'Agent' | 'Builder'
    propertyType: "Residential", // 'Residential' | 'Commercial' | 'Plot'
    purpose: "Sale", // 'Sale' | 'Rent'
    city: "Patiala",
    locality: "",
    title: "",
    sizeFt: "",
    bedrooms: "3",
    price: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!formData.locality || !formData.price) {
        toast.error("Please enter locality and expected price.");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please enter your name and contact phone number.");
      return;
    }

    try {
      setSubmitting(true);
      const queryMessage = `[NEW 2-MIN PROPERTY SUBMISSION]
User Type: ${formData.userType}
Category: ${formData.propertyType} (For ${formData.purpose})
Location: ${formData.locality}, ${formData.city}
Title: ${formData.title || `${formData.bedrooms} BHK in ${formData.locality}`}
Size: ${formData.sizeFt ? `${formData.sizeFt} sqft` : 'N/A'}
Bedrooms: ${formData.propertyType === 'Commercial' ? 'N/A' : formData.bedrooms}
Expected Price: ₹${formData.price}
Additional Notes: ${formData.notes || 'None'}`;

      await apiService.post(API_URLS.PROPERTY_QUERIES, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        query_type: "post_property",
        quick_pick: formData.userType,
        message: queryMessage,
        source_page: "/post-property",
      });

      setSubmittedData({ ...formData });
      toast.success("Property submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <div className="bg-white p-5 rounded-4 shadow-sm text-center">
        <div
          className="d-inline-flex align-items-center justify-content-center mb-3"
          style={{ width: "70px", height: "70px", backgroundColor: "#e8f7ee", borderRadius: "50%", color: "#28a745", fontSize: "32px" }}
        >
          ✓
        </div>
        <h3 className="fw700 mb-2">Property Listed for Verification!</h3>
        <p className="text-muted mb-4 fz15" style={{ maxWidth: "540px", margin: "0 auto" }}>
          Thank you, <strong>{submittedData.name}</strong>. Your {submittedData.propertyType} property in <strong>{submittedData.locality}, {submittedData.city}</strong> has been received. Our listing verification team will review and publish it within 2 hours.
        </p>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <a
            href={`https://wa.me/919855515783?text=${encodeURIComponent(
              `Hi Home Zone team, I just posted my property (${submittedData.propertyType} in ${submittedData.locality}, ${submittedData.city}) on your website. My name is ${submittedData.name} (${submittedData.phone}). Please verify and publish.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ud-btn btn-thm text-white px-4 py-2"
            style={{ backgroundColor: "#25D366", borderColor: "#25D366", borderRadius: "30px", fontWeight: 600 }}
          >
            <i className="fab fa-whatsapp me-2" /> Verify Instantly on WhatsApp
          </a>
          <Link href="/" className="ud-btn btn-white px-4 py-2" style={{ borderRadius: "30px" }}>
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
      {/* Progress Tracker */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div className={`step-item d-flex align-items-center ${step >= 1 ? 'text-danger fw700' : 'text-muted'}`}>
          <span className="badge rounded-pill bg-danger me-2">1</span> Basic Category
        </div>
        <i className="fal fa-chevron-right text-muted" />
        <div className={`step-item d-flex align-items-center ${step >= 2 ? 'text-danger fw700' : 'text-muted'}`}>
          <span className={`badge rounded-pill ${step >= 2 ? 'bg-danger' : 'bg-secondary'} me-2`}>2</span> Property Info
        </div>
        <i className="fal fa-chevron-right text-muted" />
        <div className={`step-item d-flex align-items-center ${step >= 3 ? 'text-danger fw700' : 'text-muted'}`}>
          <span className={`badge rounded-pill ${step >= 3 ? 'bg-danger' : 'bg-secondary'} me-2`}>3</span> Contact &amp; Publish
        </div>
      </div>

      {step === 1 && (
        <form onSubmit={handleNext}>
          <h4 className="fw700 mb-3">Step 1: What would you like to list?</h4>

          {/* User Type */}
          <div className="mb-4">
            <label className="fw600 mb-2 fz14">I am:</label>
            <div className="d-flex gap-2">
              {["Owner", "Agent / Broker", "Builder / Developer"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, userType: type }))}
                  className={`btn flex-fill py-2 ${formData.userType === type ? 'btn-thm text-white' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Property Category */}
          <div className="mb-4">
            <label className="fw600 mb-2 fz14">Property Category:</label>
            <div className="d-flex gap-2">
              {["Residential", "Commercial", "Plot"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, propertyType: cat }))}
                  className={`btn flex-fill py-2 ${formData.propertyType === cat ? 'btn-thm text-white' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div className="mb-4">
            <label className="fw600 mb-2 fz14">Purpose:</label>
            <div className="d-flex gap-2">
              {["Sale", "Rent"].map((purp) => (
                <button
                  key={purp}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, purpose: purp }))}
                  className={`btn flex-fill py-2 ${formData.purpose === purp ? 'btn-thm text-white' : 'btn-outline-secondary'}`}
                  style={{ borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}
                >
                  For {purp}
                </button>
              ))}
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="ud-btn btn-thm px-4 py-2" style={{ borderRadius: "30px" }}>
              Continue to Step 2 <i className="fal fa-arrow-right ms-2" />
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNext}>
          <h4 className="fw700 mb-3">Step 2: Property Details &amp; Pricing</h4>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="fw600 fz14 mb-1">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
                placeholder="Patiala"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="fw600 fz14 mb-1">Locality / Sector / Colony</label>
              <input
                type="text"
                name="locality"
                className="form-control"
                value={formData.locality}
                onChange={handleChange}
                placeholder="e.g. Urban Estate Phase 2, Model Town, Leela Bhawan"
                required
              />
            </div>

            <div className="col-12">
              <label className="fw600 fz14 mb-1">Property Title / Name (Optional)</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Beautiful 3 BHK Villa with modular kitchen"
              />
            </div>

            <div className="col-md-6">
              <label className="fw600 fz14 mb-1">Super Area / Size (Sq. Ft.)</label>
              <input
                type="number"
                name="sizeFt"
                className="form-control"
                value={formData.sizeFt}
                onChange={handleChange}
                placeholder="e.g. 1500"
              />
            </div>

            {formData.propertyType === "Residential" && (
              <div className="col-md-6">
                <label className="fw600 fz14 mb-1">Bedrooms (BHK)</label>
                <select
                  name="bedrooms"
                  className="form-select"
                  value={formData.bedrooms}
                  onChange={handleChange}
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK / Kothi</option>
                </select>
              </div>
            )}

            <div className="col-md-6">
              <label className="fw600 fz14 mb-1">Expected Price (₹)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 6500000"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-between pt-3">
            <button
              type="button"
              className="ud-btn btn-white px-4 py-2"
              onClick={() => setStep(1)}
              style={{ borderRadius: "30px" }}
            >
              Back
            </button>
            <button type="submit" className="ud-btn btn-thm px-4 py-2" style={{ borderRadius: "30px" }}>
              Continue to Step 3 <i className="fal fa-arrow-right ms-2" />
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h4 className="fw700 mb-3">Step 3: Owner / Agent Contact Information</h4>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="fw600 fz14 mb-1">Your Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Gurpreet Singh"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="fw600 fz14 mb-1">WhatsApp / Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 98555XXXXX"
                required
              />
            </div>

            <div className="col-12">
              <label className="fw600 fz14 mb-1">Email Address (Optional)</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="yourname@gmail.com"
              />
            </div>

            <div className="col-12">
              <label className="fw600 fz14 mb-1">Key Features / Notes (Optional)</label>
              <textarea
                name="notes"
                rows={3}
                className="form-control"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Corner plot, park facing, modular kitchen, immediate possession..."
              />
            </div>
          </div>

          <div className="alert alert-light border fz13 text-muted mb-4">
            <i className="fas fa-shield-alt text-success me-2" />
            <strong>100% Free &amp; Zero Spam:</strong> Your phone number will only be used by Home Zone verified team to verify your listing.
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="ud-btn btn-white px-4 py-2"
              onClick={() => setStep(2)}
              disabled={submitting}
              style={{ borderRadius: "30px" }}
            >
              Back
            </button>
            <button
              type="submit"
              className="ud-btn btn-thm px-4 py-2"
              disabled={submitting}
              style={{ borderRadius: "30px" }}
            >
              {submitting ? "Submitting..." : "Submit Property Listing"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostPropertyWizard;
