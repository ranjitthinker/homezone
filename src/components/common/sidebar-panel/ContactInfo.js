"use client";
import React from "react";
import { useSettings } from "@/context/SettingsProvider";

const ContactInfo = () => {
  const settings = useSettings();

  const phone = settings?.contact_phone || "+(0) 123 050 945 02";
  const email = settings?.contact_email || "hi@HomeZone.com";

  const contactInfo = [
    {
      id: 1,
      title: "Customer Support",
      phone: phone,
      phoneHref: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      id: 2,
      title: "Need Live Support?",
      email: email,
      emailHref: `mailto:${email}`,
    },
  ];

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref}>{info.phone}</a>
              </h6>
            )}
            {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref}>{info.email}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
