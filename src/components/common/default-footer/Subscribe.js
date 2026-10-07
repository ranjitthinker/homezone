"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);
    toast.success("Thank you for subscribing to Home Zone newsletter!");
    setEmail("");
  };

  return (
    <div className="mailchimp-widget mb-4 mb-lg-5">
      <h6 className="title text-white mb20">Keep Yourself Up to Date</h6>
      {subscribed ? (
        <div className="alert alert-success py-2 px-3 text-white bg-transparent border border-success">
          ✓ Subscribed successfully! You will receive our latest property updates.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mailchimp-style1">
          <input
            type="email"
            className="form-control"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
    </div>
  );
};

export default Subscribe;
