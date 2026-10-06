"use client";
import React from "react";
import { useSettings } from "@/context/SettingsProvider";

const footerLinks = [
  { text: "Privacy", href: "#" },
  { text: "Terms", href: "#" },
  { text: "Sitemap", href: "#" },
];

const getSocialUrl = (settings, key, defaultVal = "") => {
  if (!settings) return defaultVal;
  if (settings[key]) return settings[key];
  if (Array.isArray(settings?.data)) {
    const item = settings.data.find((i) => i.key === key);
    if (item && item.value) return item.value;
  }
  return defaultVal;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const settings = useSettings(); 
  
  // Extract social media URLs from settings
  const facebookUrl = getSocialUrl(settings, 'facebook_url', 'https://www.facebook.com/homezzone/');
  const instagramUrl = getSocialUrl(settings, 'instagram_url', 'https://www.instagram.com/homezone.reality/');
  const youtubeUrl = getSocialUrl(settings, 'youtube_url', '');
  const siteName = getSocialUrl(settings, 'site_name', 'Home Zone');


  return (
    <footer className="dashboard_footer pt30 pb10">
      <div className="container">
        <div className="row items-center justify-content-center justify-content-md-between">
          <div className="col-auto">
            <div className="copyright-widget">
              <p className="text">
                © {siteName} {currentYear}{" "}
                - All rights reserved
              </p>
            </div>
          </div>

          <div className="col-auto">
            <div className="footer_bottom_right_widgets text-center text-lg-end">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-3 mb-2">
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-muted">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted">
                  <i className="fab fa-instagram"></i>
                </a>
                {youtubeUrl && (
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-muted">
                    <i className="fab fa-youtube"></i>
                  </a>
                )}
              </div>
              <p>
                {footerLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <a href={link.href}>{link.text}</a>
                    {index !== footerLinks.length - 1 && " · "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
