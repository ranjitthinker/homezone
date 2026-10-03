import { homeItems, blogItems, listingItems, propertyItems, pageItems } from '@/data/navItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState('');

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) setTopMenu('home');
    });
    blogItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) setTopMenu('blog');
    });
    pageItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) setTopMenu('pages');
    });
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split('/')[1] == pathname.split('/')[1]) return 'menuActive';
  };

  return (
    <ul className="ace-responsive-menu d-flex justify-content-center" style={{ paddingRight: '185px' }}>
      {/* Home */}
      <li>
        <Link className={`${handleActive('/')}`} href="/">
          Home
        </Link>
      </li>

      {/* About */}
      <li>
        <Link className={`${handleActive('/about')}`} href="/about">
          About
        </Link>
      </li>

      {/* Commercial */}
      <li>
        <Link className={`${handleActive('/properties')}`} href="/properties?listed_in=commercial">
          Commercial
        </Link>
      </li>

      {/* Residential */}
      <li>
        <Link href="/properties?listed_in=residential">
          Residential
        </Link>
      </li>

      {/* Blog */}
      <li>
        <Link className={`${handleActive('/blog')}`} href="/blog">
          Blog
        </Link>
      </li>

      {/* Contact */}
      <li>
        <Link className={`${handleActive('/contact')}`} href="/contact">
          Contact
        </Link>
      </li>

      {/* Calculator */}
      <li>
        <Link className={`${handleActive('/calculator')}`} href="/calculator">
          Calculator
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
