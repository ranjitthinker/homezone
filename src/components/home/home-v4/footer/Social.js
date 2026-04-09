"use client";
import React from "react";
import { useSettings } from "@/context/SettingsProvider";

const Social = () => {
  const settings = useSettings();
  
  // Extract social media URLs from settings
  const facebookUrl = settings?.data?.find(item => item.key === 'facebook_url')?.value || '#';
  const instagramUrl = settings?.data?.find(item => item.key === 'instagram_url')?.value || '#';
  const youtubeUrl = settings?.data?.find(item => item.key === 'youtube_url')?.value || '#';
  const twitterUrl = settings?.data?.find(item => item.key === 'twitter_url')?.value || '#';
  
  const socialLinks = [
    { icon: "fab fa-facebook-f", url: facebookUrl },
    { icon: "fab fa-twitter", url: twitterUrl },
    { icon: "fab fa-instagram", url: instagramUrl },
    { icon: "fab fa-youtube", url: youtubeUrl },
  ];

  return (
    <div className="social-style1 light-style">
      <a className="me-2 fw600 fz15" href="#">
        Follow us
      </a>
      {socialLinks.map((social, index) => (
        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
          <i className={social.icon + " list-inline-item"} />
        </a>
      ))}
    </div>
  );
};

export default Social;
