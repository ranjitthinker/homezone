import React from "react";
import Link from "next/link";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  const footerMenuItems = [
    {
      label: "About",
      link: "/about",
    },
    {
      label: "Contact",
      link: "/contact",
    },
    {
      label: "EMI Calculator",
      link: "/calculator",
    },
  ];

  return (
    <div className="container white-bdrt1 py-4">
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center text-lg-start">
            <p className="copyright-text text-gray ff-heading">
              © Home Zone {getCurrentYear()}{" "}
              - All rights reserved
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6">
          <div className="text-center text-lg-end">
            <p className="footer-menu ff-heading text-gray">
              {footerMenuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <Link className="text-gray" href={item.link}>
                    {item.label}
                  </Link>
                  {index !== footerMenuItems.length - 1 && " · "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}
      </div>
    </div>
  );
};

export default Footer;
