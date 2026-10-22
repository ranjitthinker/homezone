import React from "react";
import Link from "next/link";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Property Categories",
      links: [
        { label: "Residential Properties", href: "/properties?category=residential" },
        { label: "Commercial Properties", href: "/properties?category=commercial" },
        { label: "All Properties", href: "/properties" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Residential", href: "/properties?category=residential" },
        { label: "Commercial", href: "/properties?category=commercial" },
        { label: "Blog & Insights", href: "/blog" },
        { label: "EMI Calculator", href: "/calculator" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Discover & Support",
      links: [
        { label: "Browse Properties", href: "/properties" },
        { label: "Head Office & Support", href: "/contact" },
        { label: "Get Directions", href: "/contact" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
