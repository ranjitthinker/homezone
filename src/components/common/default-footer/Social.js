import React from "react";

const Social = ({ settings }) => {
  const socialLinks = [
    {
      icon: "fab fa-facebook-f",
      url: settings?.facebook_url || '#',
    },
    {
      icon: "fab fa-twitter",
      url: settings?.twitter_url || '#',
    },
    {
      icon: "fab fa-instagram",
      url: settings?.instagram_url || '#',
    },
    {
      icon: "fab fa-youtube",
      url: settings?.youtube_url || '#',
    },
  ];

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