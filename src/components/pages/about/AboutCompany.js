"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/context/SettingsProvider";
import apiService from "@/utils/api/apiService";

const AboutCompany = () => {
  const rawContextSettings = useSettings();
  const [liveSettings, setLiveSettings] = useState(null);

  // Active client-side revalidation to guarantee latest admin updates are always loaded
  useEffect(() => {
    let isMounted = true;
    apiService
      .get("/settings", {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      })
      .then((res) => {
        if (isMounted && res?.data) {
          setLiveSettings(res.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const activeRaw = liveSettings || rawContextSettings;
  const settings = Array.isArray(activeRaw?.data)
    ? activeRaw.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : activeRaw || {};

  const siteName = settings?.site_name || "Home Zone";
  const aboutBadge = settings?.about_badge || "ABOUT OUR COMPANY";
  const aboutHeading =
    settings?.about_heading ||
    `Welcome to ${siteName} - Your Trusted Real Estate Partner`;
  const aboutImage = settings?.about_image || "/images/about/about-2.png";

  const hasCustomDesc1 = Boolean(settings?.about_description_1);
  const rawDesc1 =
    settings?.about_description_1 ||
    `At ${siteName}, we are dedicated to transforming how people discover, buy, sell, and rent properties. Whether you are looking for your dream family home, a high-yield investment, a modern apartment, or commercial spaces, we provide transparent guidance and market-leading expertise every step of the way.`;

  // Split multiple paragraphs separated by newlines
  const desc1Paragraphs = rawDesc1
    ? rawDesc1
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  // If user entered custom desc1, do NOT show fallback demo text for desc2 unless explicitly provided
  const aboutDesc2 = settings?.about_description_2
    ? settings.about_description_2
    : hasCustomDesc1
    ? null
    : `Our mission is to simplify real estate transactions with complete honesty, legal verification, and client-centric solutions. With an in-depth understanding of local markets and emerging developments, we connect buyers with properties that match their vision and budget.`;

  const point1 = settings?.about_point_1 || "100% Verified Legal Documentation";
  const point2 = settings?.about_point_2 || "Prime Residential & Commercial Locations";
  const point3 = settings?.about_point_3 || "Zero Hidden Fees & Transparent Deals";
  const point4 = settings?.about_point_4 || "End-to-End Client Support";

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
                  backgroundColor: "#f7f7f7",
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
                  src={aboutImage}
                  alt={`${siteName} - About Our Company`}
                  unoptimized={Boolean(aboutImage?.startsWith("http"))}
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
                {aboutBadge}
              </span>
              <h2 className="title mb20 fw-bold" style={{ lineHeight: "1.3" }}>
                {aboutHeading}
              </h2>

              {/* Multi-paragraph descriptions with proper line breaks */}
              {desc1Paragraphs.map((para, index) => (
                <p
                  key={index}
                  className="text mb20 fz15 text-muted"
                  style={{ lineHeight: "1.75" }}
                >
                  {para}
                </p>
              ))}

              {aboutDesc2 && (
                <p className="text mb30 fz15 text-muted" style={{ lineHeight: "1.75" }}>
                  {aboutDesc2}
                </p>
              )}

              {/* Key Highlights */}
              <div className="row g-3 mb35">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">{point1}</h6>
                      <p className="text mb-0 fz13 text-muted">Authentic legal documentation</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">{point2}</h6>
                      <p className="text mb-0 fz13 text-muted">Prime real estate hubs</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">{point3}</h6>
                      <p className="text mb-0 fz13 text-muted">Clear pricing with zero hidden costs</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-2">
                    <i className="fas fa-check-circle text-danger mt-1 fs-5" />
                    <div>
                      <h6 className="mb-1 fw-bold">{point4}</h6>
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
                <Link href="/properties" className="ud-btn btn-white border">
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
