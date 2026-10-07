"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import apiService from "@/utils/api/apiService";
import { API_URLS } from "@/utils/api/apiUrls";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      toast.error("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    try {
      setLoading(true);
      try {
        await apiService.post(API_URLS.NEWSLETTER_SUBSCRIBE, { email: trimmed });
      } catch (_) {}

      try {
        const existing = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
        if (!existing.includes(trimmed)) {
          existing.push(trimmed);
          localStorage.setItem("newsletter_subscribers", JSON.stringify(existing));
        }
      } catch (_) {}

      setSubscribed(true);
      toast.success("Thank you for subscribing to Home Zone newsletter!");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="text-white fz14 py-2">
        ✓ Thank you for subscribing!
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mailchimp-style1 at-home4 white-version">
      <input
        type="email"
        className="form-control"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        <span className="flaticon-send"></span>
      </button>
    </form>
  );
};

export default Subscribe;
