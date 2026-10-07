import React from "react";
import Link from "next/link";

const tags = [
  { name: "Real Estate", slug: "real-estate" },
  { name: "Luxury Homes", slug: "luxury-homes" },
  { name: "Investment", slug: "investment" },
  { name: "RERA", slug: "rera" },
  { name: "Home Loan", slug: "home-loan" },
];

const Tags = () => {
  return (
    <>
      {tags.map((tag, index) => (
        <Link className="mr10" href="/blog" key={index}>
          {tag.name}
        </Link>
      ))}
    </>
  );
};

export default Tags;
