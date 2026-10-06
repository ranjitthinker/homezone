'use client';

import MainMenu from '@/components/common/MainMenu';
import SidebarPanel from '@/components/common/sidebar-panel';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsProvider';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const pathname = usePathname();
  const settings = useSettings();

  const siteLogo = settings?.data?.find((item) => item.key === 'logo_light')?.value || '/images/header-logo.svg';
  const siteLogoDark = settings?.data?.find((item) => item.key === 'logo_dark')?.value || '/images/header-logo2.svg';

  // ✅ Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavbar(window.scrollY >= 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .header-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #eb6753, #e0533d);
          color: #ffffff !important;
          font-weight: 600;
          font-size: 14px;
          line-height: 1;
          padding: 12px 24px;
          border-radius: 60px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 15px rgba(235, 103, 83, 0.4);
          border: none;
          white-space: nowrap;
          cursor: pointer;
        }
        .header-contact-btn:hover {
          background: linear-gradient(135deg, #e0533d, #c94430);
          color: #ffffff !important;
          box-shadow: 0 6px 22px rgba(235, 103, 83, 0.6);
          transform: translateY(-2px);
        }
        .header-contact-btn .btn-icon {
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <header className={`header-nav nav-homepage-style main-menu ${navbar ? 'sticky slideInDown animated' : ''}`}>
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={180}
                        height={75}
                        src={siteLogo}
                        alt="Header Logo"
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={180}
                        height={75}
                        src={siteLogoDark}
                        alt="Header Logo"
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <Link href="/contact" className="header-contact-btn">
                    <span className="flaticon-call btn-icon" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="SidebarPanel" aria-labelledby="SidebarPanelLabel">
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
