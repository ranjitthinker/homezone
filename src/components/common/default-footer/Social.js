"use client";
import React from "react";
import { useSettings } from "@/context/SettingsProvider";

const getSocialUrl = (settings, key, defaultVal = "") => {
  if (!settings) return defaultVal;
  if (settings[key]) return settings[key];
  if (Array.isArray(settings?.data)) {
    const item = settings.data.find((i) => i.key === key);
    if (item && item.value) return item.value;
  }
  return defaultVal;
};

const Social = ({ settings: propSettings }) => {
  const contextSettings = useSettings();
  const settings = propSettings || contextSettings;

  const facebookUrl = getSocialUrl(settings, "facebook_url", "https://www.facebook.com/homezzone/");
  const instagramUrl = getSocialUrl(settings, "instagram_url", "https://www.instagram.com/homezone.reality/");
  const youtubeUrl = getSocialUrl(settings, "youtube_url", "");
  const twitterUrl = getSocialUrl(settings, "twitter_url", "");
  const linkedinUrl = getSocialUrl(settings, "linkedin_url", "");

  const socialLinks = [
    { icon: "fab fa-facebook-f", url: facebookUrl },
    { icon: "fab fa-instagram", url: instagramUrl },
    twitterUrl ? { icon: "fab fa-twitter", url: twitterUrl } : null,
    youtubeUrl ? { icon: "fab fa-youtube", url: youtubeUrl } : null,
    linkedinUrl ? { icon: "fab fa-linkedin-in", url: linkedinUrl } : null,
  ].filter(Boolean);

  return (
    <div className="social-style1">
      {socialLinks.map((social, index) => (
        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
          <i className={social.icon + " list-inline-item"} />
        </a>
      ))}
    </div>
  );
};

export default Social;