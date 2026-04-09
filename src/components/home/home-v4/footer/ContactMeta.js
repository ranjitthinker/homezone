import React from "react";

const ContactMeta = ({ settings }) => {
  // ✅ Transform [{key, value}] → { contact_address: '...', ... }
  const s = Array.isArray(settings?.data)
    ? settings.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : {};

  const contactInfoData = [
    {
      text: "Address",
      info: s?.contact_address || 'N/A',
      link: "#",
    },
    {
      text: "Total Free Customer Care",
      info: s?.contact_phone || 'N/A',
      link: s?.contact_phone ? `tel:${s.contact_phone.replace(/\s/g, '')}` : '#',
    },
    {
      text: "Need Live Support?",
      info: s?.contact_email || 'N/A',
      link: s?.contact_email ? `mailto:${s.contact_email}` : '#',
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoData.map((contact, index) => (
        <div className="contact-info mb25" key={index}>
          <p className="text mb5">{contact.text}</p>
          {contact.link.startsWith("mailto:") ? (
            <h6 className="info-mail">
              <a href={contact.link}>{contact.info}</a>
            </h6>
          ) : contact.link.startsWith("tel:") ? (
            <h6 className="info-phone">
              <a href={contact.link}>{contact.info}</a>
            </h6>
          ) : (
            <h6><a href={contact.link}>{contact.info}</a></h6>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;