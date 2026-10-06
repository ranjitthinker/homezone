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
  const twitterUrl = getSocialUrl(settings, "twitter_url", "");
  const linkedinUrl = getSocialUrl(settings, "linkedin_url", "");
  const youtubeUrl = getSocialUrl(settings, "youtube_url", "");

  const socialLinks = [
    { id: 1, iconClass: "fab fa-facebook-f", href: facebookUrl },
    { id: 2, iconClass: "fab fa-instagram", href: instagramUrl },
    twitterUrl ? { id: 3, iconClass: "fab fa-twitter", href: twitterUrl } : null,
    linkedinUrl ? { id: 4, iconClass: "fab fa-linkedin-in", href: linkedinUrl } : null,
    youtubeUrl ? { id: 5, iconClass: "fab fa-youtube", href: youtubeUrl } : null,
  ].filter(Boolean);

  return (
    <>
      {socialLinks.map((link) => (
        <a
          className="me-3"
          href={link.href}
          key={link.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={link.iconClass}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
