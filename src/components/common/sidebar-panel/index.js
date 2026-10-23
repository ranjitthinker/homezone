"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactInfo from "./ContactInfo";
import MenuItems from "./MenuItems";
import SocialLinks from "./SocialLinks";
import { useSettings } from "@/context/SettingsProvider";

const SidebarPanel = () => {
  const settings = useSettings();
  const logo = settings?.site_logo || settings?.logo_dark || "/images/header-logo2.svg";
  const siteName = settings?.site_name || "Home Zone";

  return (
    <div className="rightside-hidden-bar">
      <div className="hsidebar-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
        <Link href="/" className="d-inline-flex align-items-center" data-bs-dismiss="offcanvas">
          <Image
            width={140}
            height={46}
            src={logo}
            alt={siteName}
            style={{ objectFit: "contain", maxHeight: "46px" }}
            unoptimized={Boolean(logo?.startsWith("http"))}
            priority
          />
        </Link>
        <div
          className="sidebar-close-icon cursor-pointer d-flex align-items-center justify-content-center"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          role="button"
          tabIndex={0}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#f7f7f7",
            transition: "all 0.2s ease",
          }}
        >
          <span className="far fa-times fz16 text-dark"></span>
        </div>
      </div>
      {/* End header */}

      <div className="hsidebar-content">
        <div className="hiddenbar_navbar_content">
          <div className="hiddenbar_navbar_menu" style={{ marginBottom: "25px", paddingTop: "15px" }}>
            <MenuItems />
          </div>
          {/* End .hiddenbar_navbar_menu */}

          <div className="hiddenbar_footer position-relative bdrt1">
            <div className="row pt25 pb20 pl30 pr20">
              <ContactInfo />
            </div>
            {/* End .row */}

            <div className="row pt20 pb30 bdrt1">
              <div className="col-auto">
                <div className="social-style-sidebar d-flex align-items-center pl30">
                  <h6 className="me-4 mb-0 fw600">Follow us</h6>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
          {/* hiddenbar_footer */}
        </div>
      </div>
      {/* End hsidebar-content */}
    </div>
  );
};

export default SidebarPanel;
