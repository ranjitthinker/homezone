import React from "react";
import Link from "next/link";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Our Services",
      links: [
        { label: "Properties for Rent", href: "/properties?listed_in=rent" },
        { label: "Properties for Sale", href: "/properties?listed_in=sale" },
        { label: "Commercial Properties", href: "/properties?listed_in=commercial" },
        { label: "Residential Properties", href: "/properties?listed_in=residential" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Latest Blogs", href: "/blog" },
        { label: "Calculator", href: "/calculator" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "All Properties", href: "/properties" },
        { label: "Featured Listings", href: "/properties?featured=1" },
        { label: "New Arrivals", href: "/properties?sort=newest" },
        { label: "Contact Support", href: "/contact" },
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
