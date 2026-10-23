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

  // ✅ Open Sidebar Panel reliably
  const handleOpenSidebar = async (e) => {
    if (e) e.preventDefault();
    if (typeof window === 'undefined') return;

    const sidebarEl = document.getElementById('SidebarPanel');
    if (!sidebarEl) return;

    try {
      const bootstrap = await import('bootstrap');
      const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(sidebarEl);
      offcanvasInstance.show();
      return;
    } catch (err) {
      console.warn('Bootstrap offcanvas show fallback:', err);
    }

    sidebarEl.classList.add('show');
    sidebarEl.style.visibility = 'visible';
    let backdrop = document.querySelector('.offcanvas-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'offcanvas-backdrop fade show';
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', () => {
        sidebarEl.classList.remove('show');
        sidebarEl.style.visibility = '';
        backdrop.remove();
      });
    }
  };

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
        .header-hamburger-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 50%;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          color: #1a1a1a;
          outline: none;
        }
        .header-hamburger-btn:hover {
          background: #eb6753;
          border-color: #eb6753;
          color: #ffffff;
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(235, 103, 83, 0.35);
        }
        .header-hamburger-btn .hamburger-icon-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 18px;
          height: 13px;
        }
        .header-hamburger-btn .hamburger-bar {
          display: block;
          height: 2px;
          width: 100%;
          background-color: currentColor;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .header-hamburger-btn:hover .hamburger-bar {
          background-color: #ffffff;
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
                <div className="d-flex align-items-center gap-2 gap-sm-3">
                  <Link href="/contact" className="header-contact-btn">
                    <span className="flaticon-call btn-icon" />
                    <span>Contact Us</span>
                  </Link>

                  <button
                    type="button"
                    className="header-hamburger-btn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                    aria-label="Open Navigation Menu"
                    title="Open Navigation Menu"
                    onClick={handleOpenSidebar}
                  >
                    <span className="hamburger-icon-box">
                      <span className="hamburger-bar" />
                      <span className="hamburger-bar" />
                      <span className="hamburger-bar" />
                    </span>
                  </button>
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
