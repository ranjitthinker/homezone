"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Pricing = () => {
  const pricingPackages = [
    {
      packageTitle: "Basic (Individual)",
      price: "Free",
      priceYearly: "Free",
      pricePerMonth: "per month",
      priceIcon: "/images/icon/pricing-icon-2.svg",
      planKey: "basic",
      features: [
        "1 Free Verified Property Listing",
        "Active for 30 Days",
        "Standard Visibility in Search",
        "Direct Buyer Inquiries via WhatsApp & Email",
        "Basic Analytics & Views Tracker",
        "Email Support",
      ],
    },
    {
      packageTitle: "Professional (Agent)",
      price: "₹1,999",
      priceYearly: "₹18,999",
      pricePerMonth: "per month",
      priceIcon: "/images/icon/pricing-icon-1.svg",
      uniqueClass: "unique-class",
      planKey: "professional",
      features: [
        "Up to 15 Verified Property Listings",
        "Featured Badge on Homepage & Search",
        "Active for 90 Days with Auto-Refresh",
        "Verified Agent Profile & Direct WhatsApp Leads",
        "Detailed Performance Analytics & Lead Insights",
        "Priority Customer Support (Call & Chat)",
      ],
    },
    {
      packageTitle: "Business (Builder / Agency)",
      price: "₹4,999",
      priceYearly: "₹47,999",
      pricePerMonth: "per month",
      priceIcon: "/images/icon/pricing-icon-3.svg",
      planKey: "business",
      features: [
        "Unlimited Property Listings & Projects Showcase",
        "Top Placement in Featured & Hot Properties",
        "Dedicated Builder/Agency Profile Page",
        "Social Media & Newsletter Promotion",
        "Full CRM Integration & Instant Buyer Leads",
        "Dedicated Relationship Manager & 24/7 Support",
      ],
    },
  ];

  const [isYearlyBilling, setIsYearlyBilling] = useState(false);

  const handleBillingToggle = () => {
    setIsYearlyBilling((prevIsYearlyBilling) => !prevIsYearlyBilling);
  };

  return (
    <>
      <div className="row" data-aos="fade-up" data-aos-delay="200">
        <div className="col-lg-12">
          <div className="pricing_packages_top d-flex align-items-center justify-content-center mb60">
            <div className="toggle-btn">
              <span className="pricing_save1 ff-heading">Billed Monthly</span>
              <label className="switch">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={isYearlyBilling}
                  onChange={handleBillingToggle}
                />
                <span className="pricing_table_switch_slide round" />
              </label>
              <span className="pricing_save2 ff-heading">Billed Yearly</span>
              <span className="pricing_save3">Save 20%</span>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row" data-aos="fade-up" data-aos-delay="300">
        {pricingPackages.map((item, index) => (
          <div className="col-md-6 col-xl-4" key={index}>
            <div className={`pricing_packages ${index === 1 ? "active" : ""}`}>
              <div className="heading mb60">
                <h4 className={`package_title ${item.uniqueClass || ""}`}>
                  {item.packageTitle}
                </h4>
                <h1 className="text2">
                  {isYearlyBilling ? item.priceYearly : item.price}
                </h1>
                <p className="text">
                  {isYearlyBilling ? "per year" : item.pricePerMonth}
                </p>
                <Image
                  width={70}
                  height={70}
                  className="price-icon"
                  src={item.priceIcon}
                  alt="icon"
                />
              </div>
              <div className="details">
                <p className="text mb35">
                  {item.features[0]}
                </p>
                <div className="list-style1 mb40">
                  <ul>
                    {item.features.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <i className="far fa-check text-white bgc-dark fz15" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="d-grid">
                  <Link
                    href={`/contact?plan=${item.planKey}&billing=${isYearlyBilling ? "yearly" : "monthly"}`}
                    className="ud-btn btn-thm-border text-thm"
                  >
                    Choose Plan
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End .row */}
    </>
  );
};

export default Pricing;
