'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function MainMenuContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = (searchParams.get('category') || searchParams.get('listed_in') || '').toLowerCase();

  const isHomeActive = pathname === '/';
  const isAboutActive = pathname === '/about';
  const isResidentialActive = pathname === '/properties' && currentCategory === 'residential';
  const isCommercialActive = pathname === '/properties' && currentCategory === 'commercial';
  const isBlogActive = pathname.startsWith('/blog');
  const isContactActive = pathname === '/contact';
  const isCalculatorActive = pathname === '/calculator';

  return (
    <ul className="ace-responsive-menu d-flex justify-content-center mb-0">
      {/* Home */}
      <li>
        <Link className={isHomeActive ? 'menuActive' : ''} href="/">
          Home
        </Link>
      </li>

      {/* About */}
      <li>
        <Link className={isAboutActive ? 'menuActive' : ''} href="/about">
          About
        </Link>
      </li>

      {/* Residential (First) */}
      <li>
        <Link
          className={isResidentialActive ? 'menuActive' : ''}
          href="/properties?category=residential"
        >
          Residential
        </Link>
      </li>

      {/* Commercial (Second) */}
      <li>
        <Link
          className={isCommercialActive ? 'menuActive' : ''}
          href="/properties?category=commercial"
        >
          Commercial
        </Link>
      </li>

      {/* Blog */}
      <li>
        <Link className={isBlogActive ? 'menuActive' : ''} href="/blog">
          Blog
        </Link>
      </li>

      {/* Contact */}
      <li>
        <Link className={isContactActive ? 'menuActive' : ''} href="/contact">
          Contact
        </Link>
      </li>

      {/* Calculator */}
      <li>
        <Link className={isCalculatorActive ? 'menuActive' : ''} href="/calculator">
          Calculator
        </Link>
      </li>
    </ul>
  );
}

const MainMenu = () => {
  return (
    <Suspense fallback={
      <ul className="ace-responsive-menu d-flex justify-content-center mb-0">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/properties?category=residential">Residential</Link></li>
        <li><Link href="/properties?category=commercial">Commercial</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/calculator">Calculator</Link></li>
      </ul>
    }>
      <MainMenuContent />
    </Suspense>
  );
};

export default MainMenu;
