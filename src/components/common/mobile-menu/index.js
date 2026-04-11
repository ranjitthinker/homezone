"use client";
import Link from "next/link";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import Social from "./Social";
import ProSidebarContent from "./ProSidebarContent";
import { useSettings } from "@/context/SettingsProvider";

const MobileMenu = () => {
  const rawSettings = useSettings();

  // ✅ Transform [{key, value}] → flat object
  const settings = Array.isArray(rawSettings?.data)
    ? rawSettings.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : {};

  const logo = settings?.site_logo || settings?.logo_light;
  const siteName = settings?.site_name || 'Homez';

  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <a
                className="menubar"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <Image
                  width={25}
                  height={9}
                  src="/images/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </a>

              <Link className="mobile_logo" href="/">
                <Image
                  width={138}
                  height={44}
                  src={logo}
                  alt={siteName}
                />
              </Link>

              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true">
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close">
              <span className="far fa-times"></span>
            </div>
            <h4 className="title">Welcome to {siteName}</h4>
          </div>

          <div className="hsidebar-content">
            <div className="hiddenbar_navbar_content">
              <ProSidebarContent />
              <div className="hiddenbar_footer position-relative bdrt1">
                <div className="row pt45 pb30 pl30">
                  <ContactInfo settings={settings} />
                </div>
                <div className="row pt30 pb30 bdrt1">
                  <div className="col-auto">
                    <div className="social-style-sidebar d-flex align-items-center pl30">
                      <h6 className="me-4 mb-0">Follow us</h6>
                      <Social settings={settings} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;