"use client";
import React, { useEffect, useState } from "react";

const Social = () => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  const socialLinks = [
    {
      icon: "fab fa-facebook-f",
      title: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      icon: "fab fa-twitter",
      title: "Share on Twitter / X",
      href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=Check%20out%20this%20article%20on%20Home%20Zone`,
    },
    {
      icon: "fab fa-whatsapp",
      title: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${shareUrl}`,
    },
    {
      icon: "fab fa-linkedin-in",
      title: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },
  ];

  return (
    <>
      {socialLinks.map((item, index) => (
        <a
          className="mr20 text-muted hover-color"
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.title}
          aria-label={item.title}
        >
          <i className={item.icon} />
        </a>
      ))}
    </>
  );
};

export default Social;
