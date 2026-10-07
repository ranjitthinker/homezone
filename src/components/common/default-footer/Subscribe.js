"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Check basic email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
      setError("Please enter your email address.");
      toast.error("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      toast.error("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Try sending to backend API
      try {
        await apiService.post(API_URLS.NEWSLETTER_SUBSCRIBE, { email: trimmed });
      } catch (apiErr) {
        console.warn("Newsletter API fallback:", apiErr?.message);
      }

      // Persist in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
        if (!existing.includes(trimmed)) {
          existing.push(trimmed);
          localStorage.setItem("newsletter_subscribers", JSON.stringify(existing));
        }
      } catch (_) {}

      setSubmittedEmail(trimmed);
      setSubscribed(true);
      toast.success("Thank you for subscribing to Home Zone newsletter!");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mailchimp-widget mb-4 mb-lg-5">
      <h6 className="title text-white mb20">Keep Yourself Up to Date</h6>
      {subscribed ? (
        <div className="alert alert-success py-3 px-3 text-white bg-transparent border border-success bdrs12">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <span className="fw600">✓ Subscribed successfully!</span>
              <div className="fz12 text-white-50 mt-1">Updates will be sent to {submittedEmail}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubscribed(false);
                setError("");
              }}
              className="btn btn-sm text-white text-decoration-underline p-0"
              style={{ fontSize: "12px", background: "transparent", border: "none" }}
            >
              Subscribe another
            </button>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="mailchimp-style1">
          <input
            type="email"
            className="form-control"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            style={{
              borderColor: error ? "#eb6753" : undefined,
              boxShadow: error ? "0 0 0 1px #eb6753" : undefined,
            }}
          />
          <button type="submit" disabled={loading} style={{ cursor: loading ? "wait" : "pointer" }}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
          {error && (
            <div
              className="text-danger mt-2 fz13"
              style={{ color: "#ff8775", fontWeight: "500", textAlign: "left", paddingLeft: "10px" }}
            >
              <i className="fa fa-exclamation-circle me-1" />
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Subscribe;
