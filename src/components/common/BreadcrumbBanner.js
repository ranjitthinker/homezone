"use client";
import React from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsProvider";

export default function BreadcrumbBanner({
  pageKey = "default",
  title = "Page Title",
  items = [],
  children = null,
  defaultBg = "/images/background/about-page-bg.cad1db94.jpg",
  className = "",
  style = {},
  textTheme = null, // "auto" | "dark" | "light"
}) {
  const rawSettings = useSettings();
  const settings = Array.isArray(rawSettings?.data)
    ? rawSettings.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : rawSettings || {};

  // Resolve custom image hierarchy:
  // 1. Specific page banner: settings[`${pageKey}_breadcrumb_image`]
  // 2. Global banner: settings.breadcrumb_banner_image
  // 3. defaultBg
  const specificImage = (pageKey && settings[`${pageKey}_breadcrumb_image`]) || null;
  const globalImage = settings?.breadcrumb_banner_image || null;
  const bgImage = specificImage || globalImage || defaultBg || "/images/background/about-page-bg.cad1db94.jpg";

  // Resolve custom title if set in settings:
  const customTitle = (pageKey && settings[`${pageKey}_breadcrumb_title`]) || title;

  // Resolve text theme
  const configuredTheme = textTheme || settings?.breadcrumb_text_theme || "auto";
  const effectiveLightText =
    configuredTheme === "light" ||
    (configuredTheme === "auto" && pageKey === "compare");

  return (
    <section
      className={`breadcumb-section2 position-relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "360px",
        height: "400px",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {/* Soft overlay when white text is selected or for high contrast */}
      {effectiveLightText ? (
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ) : null}

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcumb-style1">
              <h2
                className={`title mb-2 ${effectiveLightText ? "text-white" : ""}`}
                style={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  textShadow: effectiveLightText ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
                }}
              >
                {customTitle}
              </h2>
              <div className="breadcumb-list d-flex align-items-center flex-wrap">
                {items && items.length > 0 ? (
                  items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                      <React.Fragment key={index}>
                        {item.href && !isLast ? (
                          <Link
                            href={item.href}
                            className={`${effectiveLightText ? "text-white opacity-75 hover-opacity-100" : ""}`}
                            style={{ textDecoration: "none" }}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span
                            className={`${effectiveLightText ? "text-white fw-medium" : "fw-medium"}`}
                            style={{ color: effectiveLightText ? "#fff" : "inherit" }}
                          >
                            {item.label}
                          </span>
                        )}
                        {!isLast && (
                          <span
                            className={`mx-2 ${effectiveLightText ? "text-white opacity-50" : "text-muted"}`}
                          >
                            /
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <>
                    <Link
                      href="/"
                      className={`${effectiveLightText ? "text-white opacity-75" : ""}`}
                    >
                      Home
                    </Link>
                    <span className="ms-2">/ {customTitle}</span>
                  </>
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
