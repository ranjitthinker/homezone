import React from "react";
import Link from "next/link";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Popular Search",
      links: [
        { label: "Properties for Rent", href: "/properties" },
        { label: "Properties for Sale", href: "/properties" },
        { label: "Featured Listings", href: "/properties" },
        { label: "Mortgage Calculator", href: "/calculator" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Pricing Plans", href: "/pricing" },
        { label: "Latest Blogs", href: "/blog" },
        { label: "Compare Properties", href: "/compare" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "All Properties", href: "/properties" },
        { label: "Explore Cities", href: "/#explore-property" },
        { label: "Mortgage Calculator", href: "/calculator" },
        { label: "Contact Us", href: "/contact" },
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
