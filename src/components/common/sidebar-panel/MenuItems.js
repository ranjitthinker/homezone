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
      // Trigger bootstrap dismiss if available
      try {
        const bs = window.bootstrap || (typeof bootstrap !== 'undefined' ? bootstrap : null);
        if (bs?.Offcanvas) {
          const instance = bs.Offcanvas.getInstance(el);
          if (instance) {
            instance.hide();
            return;
          }
        }
      } catch (e) {
        // ignore
      }

      // Fallback: click close button
      const closeBtn = el.querySelector('.sidebar-close-icon');
      if (closeBtn) {
        closeBtn.click();
      } else {
        el.classList.remove('show');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) backdrop.remove();
      }
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
      title: 'EMI Calculator',
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
    { title: 'Apartments', category: 'Apartments' },
    { title: 'Bungalow', category: 'Bungalow' },
    { title: 'Houses', category: 'Houses' },
    { title: 'Loft', category: 'Loft' },
    { title: 'Office', category: 'Office' },
    { title: 'Townhome', category: 'Townhome' },
    { title: 'Villa', category: 'Villa' },
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

      {/* Property Categories */}
      <div className="pt-3 border-top">
        <p className="fz12 text-uppercase text-muted fw-bold letter-spacing-1 mb-3 px-4" style={{ letterSpacing: '1px' }}>
          Explore Property Types
        </p>
        <div className="px-4 d-flex flex-wrap gap-2">
          {propertyTypes.map((pt, idx) => (
            <Link
              key={idx}
              href={`/properties?propertyType=${encodeURIComponent(pt.category)}`}
              data-bs-dismiss="offcanvas"
              onClick={handleLinkClick}
              className="badge bg-light text-dark border px-3 py-2 rounded-pill fz12 hover-bg-thm hover-text-white transition text-decoration-none"
              style={{ fontWeight: 500 }}
            >
              {pt.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const MenuItems = () => {
  return (
    <Suspense fallback={<div className="p-4 text-muted fz14">Loading menu...</div>}>
      <MenuItemsContent />
    </Suspense>
  );
};

export default MenuItems;
