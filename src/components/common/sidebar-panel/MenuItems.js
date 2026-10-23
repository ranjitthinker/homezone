'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function MenuItemsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = (searchParams?.get('category') || searchParams?.get('listed_in') || '').toLowerCase();

  const handleLinkClick = () => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById('SidebarPanel');
    if (el) {
      // 1. Try bootstrap instance hide
      try {
        const bs = window.bootstrap || (typeof bootstrap !== 'undefined' ? bootstrap : null);
        if (bs?.Offcanvas) {
          const inst = bs.Offcanvas.getInstance(el);
          if (inst) {
            inst.hide();
          }
        }
      } catch (e) {
        // ignore
      }

      // 2. Click close button
      const closeBtn = el.querySelector('.sidebar-close-icon');
      if (closeBtn) closeBtn.click();

      // 3. Fallback CSS cleanup
      el.classList.remove('show');
      document.body.classList.remove('offcanvas-open', 'modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      const backdrops = document.querySelectorAll('.offcanvas-backdrop');
      backdrops.forEach((b) => b.remove());
    }
  };

  const mainNav = [
    { id: 'home', title: 'Home', href: '/', icon: 'fas fa-home', isActive: pathname === '/' },
    { id: 'about', title: 'About Us', href: '/about', icon: 'fas fa-info-circle', isActive: pathname === '/about' },
    {
      id: 'residential',
      title: 'Residential Properties',
      href: '/properties?category=residential',
      icon: 'fas fa-home',
      isActive: pathname === '/properties' && currentCategory === 'residential',
    },
    {
      id: 'commercial',
      title: 'Commercial Properties',
      href: '/properties?category=commercial',
      icon: 'fas fa-building',
      isActive: pathname === '/properties' && currentCategory === 'commercial',
    },
    {
      id: 'blog',
      title: 'Blog & Articles',
      href: '/blog',
      icon: 'fas fa-newspaper',
      isActive: pathname.startsWith('/blog'),
    },
    {
      id: 'calculator',
      title: 'EMI & Loan Calculator',
      href: '/calculator',
      icon: 'fas fa-calculator',
      isActive: pathname === '/calculator',
    },
    {
      id: 'contact',
      title: 'Contact Us',
      href: '/contact',
      icon: 'fas fa-phone-alt',
      isActive: pathname === '/contact',
    },
  ];

  const propertyTypes = [
    { title: 'Apartments', category: 'apartment' },
    { title: 'Villas', category: 'villa' },
    { title: 'Builder Floors', category: 'builder-floor' },
    { title: 'Plots & Land', category: 'plot-land' },
    { title: 'Commercial', category: 'commercial' },
    { title: 'Office Spaces', category: 'office-space' },
    { title: 'Farm Houses', category: 'farm-house' },
  ];

  return (
    <div className="sidebar-menu-wrapper">
      {/* Primary Site Navigation */}
      <div className="mb-4">
        <p className="fz12 text-uppercase text-muted fw-bold letter-spacing-1 mb-2 px-4" style={{ letterSpacing: '1px' }}>
          Menu Navigation
        </p>
        <ul className="navbar-nav">
          {mainNav.map((item) => (
            <li className="nav-item" key={item.id}>
              <Link
                className={`nav-link d-flex align-items-center ${item.isActive ? 'text-thm fw-bold' : ''}`}
                href={item.href}
                data-bs-dismiss="offcanvas"
                onClick={handleLinkClick}
                style={{
                  padding: '12px 28px',
                  borderLeft: item.isActive ? '3px solid #eb6753' : '3px solid transparent',
                  background: item.isActive ? 'rgba(235, 103, 83, 0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                  fontSize: '15px',
                }}
              >
                <i
                  className={`${item.icon} me-3`}
                  style={{
                    width: '20px',
                    textAlign: 'center',
                    color: item.isActive ? '#eb6753' : '#6c757d',
                    fontSize: '15px',
                    position: 'static',
                    transform: 'none',
                    lineHeight: '1',
                  }}
                />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Real Property Categories */}
      <div className="pt-3 border-top">
        <p className="fz12 text-uppercase text-muted fw-bold letter-spacing-1 mb-3 px-4" style={{ letterSpacing: '1px' }}>
          Explore Property Types
        </p>
        <div className="px-4 d-flex flex-wrap gap-2">
          {propertyTypes.map((pt, idx) => {
            const isCatActive = currentCategory === pt.category;
            return (
              <Link
                key={idx}
                href={`/properties?category=${encodeURIComponent(pt.category)}`}
                data-bs-dismiss="offcanvas"
                onClick={handleLinkClick}
                className={`badge px-3 py-2 rounded-pill fz12 transition text-decoration-none ${
                  isCatActive
                    ? 'bg-thm text-white border-0'
                    : 'bg-light text-dark border hover-bg-thm hover-text-white'
                }`}
                style={{
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  backgroundColor: isCatActive ? '#eb6753' : '#f8f9fa',
                  color: isCatActive ? '#ffffff' : '#212529',
                }}
              >
                {pt.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MenuItems() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-muted fz14">
          <div className="spinner-border spinner-border-sm me-2 text-thm" role="status" />
          Loading menu...
        </div>
      }
    >
      <MenuItemsContent />
    </Suspense>
  );
}
