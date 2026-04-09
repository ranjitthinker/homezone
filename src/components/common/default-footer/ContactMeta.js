import React from "react";

const ContactMeta = ({ settings }) => {
  // settings is already a flat object from Footer
  const contactInfoList = [
    {
      title: "Total Free Customer Care",
      phone: settings?.contact_phone || '+(0) 123 050 945 02',
      phoneLink: settings?.contact_phone
        ? `tel:${settings.contact_phone.replace(/\s/g, '')}`
        : 'tel:+012305094502',
    },
    {
      title: "Need Live Support?",
      mail: settings?.contact_email || 'hi@HomeZone.com',
      mailLink: settings?.contact_email
        ? `mailto:${settings.contact_email}`
        : 'mailto:hi@HomeZone.com',
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title">{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href={contact.phoneLink}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ContactMeta;