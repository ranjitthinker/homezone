'use client';

import MainMenu from '@/components/common/MainMenu';
import SidebarPanel from '@/components/common/sidebar-panel';
import LoginSignupModal from '@/components/common/login-signup-modal';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsProvider';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const pathname = usePathname();
  const settings = useSettings();

  const siteLogo = settings?.data?.find((item) => item.key === 'site_logo')?.value || '/images/header-logo2.svg';

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
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? 'sticky slideInDown animated' : ''
        }`}
      >
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
                        src={siteLogo}
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
                  <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                    <Image
                      width={25}
                      height={9}
                      className="img-2"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a>
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="SidebarPanel" aria-labelledby="SidebarPanelLabel">
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
