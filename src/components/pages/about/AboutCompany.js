"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/context/SettingsProvider";

const AboutCompany = () => {
  const rawSettings = useSettings();
  const settings = Array.isArray(rawSettings?.data)
    ? rawSettings.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : rawSettings || {};

  const siteName = settings?.site_name || "Home Zone";

  return (
    <section className="our-about pt60 pb90">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Image */}
          <div className="col-lg-6 mb40-md" data-aos="fade-right" data-aos-delay="200">
            <div className="position-relative pe-lg-3">
              <div
                className="about-img-box rounded-4 overflow-hidden position-relative"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  width={577}
                  height={750}
                  className="w-100 h-auto cover"
                  style={{
                    maxHeight: "580px",
                    objectFit: "cover",
                    display: "block",
                  }}
                  src="/images/about/about-2.png"
                  alt={`${siteName} - About Our Company`}
                  priority
                />
              </div>

              {/* Floating Trust Badge */}
              <div
                className="position-absolute bg-white p-3 rounded-3 shadow d-flex align-items-center gap-3"
                style={{
                  bottom: "30px",
                  left: "30px",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  maxWidth: "280px",
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #eb6753, #e0533d)",
                    borderRadius: "50%",
                  }}
                >
                  <i className="flaticon-home fs-4" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">{siteName}</h6>
                  <small className="text-muted">Verified Real Estate Partner</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content about Company */}
          <div className="col-lg-6 ps-lg-4" data-aos="fade-left" data-aos-delay="300">
            <div className="about-box-1">
              <span
                className="badge px-3 py-2 fw600 mb-3"
                style={{
                  backgroundColor: "#fff0ed",
                  color: "#eb6753",
                  borderRadius: "30px",
                  fontSize: "13px",
                  letterSpacing: "0.5px",
                }}
              >
                ABOUT OUR COMPANY
              </span>
              <h2 className="title mb20 fw-bold">
                Welcome to {siteName} - Your Trusted Real Estate Partner
              </h2>
              <p className="text mb20 fz15 text-muted">
                At <strong>{siteName}</strong>, we are dedicated to transforming how people discover, buy, sell, and rent properties. Whether you are looking for your dream family home, a high-yield investment, a modern apartment, or commercial spaces, we provide transparent guidance and market-leading expertise every step of the way.
              </p>
              <p className="text mb30 fz15 text-muted">
                Our mission is to simplify real estate transactions with complete honesty, legal verification, and client-centric solutions. With an in-depth understanding of local markets and emerging developments, we connect buyers with properties that match their vision and budget.
              </p>

              {/* Key Highlights */}
              <div className="row g-3 mb35">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">100% Verified Listings</h6>
                      <p className="text mb-0 fz13 text-muted">Authentic legal documentation</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">Transparent Deals</h6>
                      <p className="text mb-0 fz13 text-muted">Clear pricing with zero hidden costs</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">Prime Locations</h6>
                      <p className="text mb-0 fz13 text-muted">High-growth investment hotspots</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">End-to-End Support</h6>
                      <p className="text mb-0 fz13 text-muted">Dedicated guidance from search to deal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap align-items-center gap-3">
                <Link href="/contact" className="ud-btn btn-dark">
                  Contact Us
                  <i className="fal fa-arrow-right-long ms-2" />
                </Link>
                <Link href="/grid-full-4-col" className="ud-btn btn-white border">
                  Explore Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
