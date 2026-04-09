import { homeItems, blogItems, listingItems, propertyItems, pageItems } from '@/data/navItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState('');
  const [submenu, setSubmenu] = useState('');
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) {
        setTopMenu('home');
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) {
        setTopMenu('blog');
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) {
        setTopMenu('pages');
      }
    });
    // propertyItems.forEach((item) =>
    //   item.subMenuItems.forEach((elm) => {
    //     if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //       setTopMenu("property");
    //       setSubmenu(item.label);
    //     }
    //   })
    // );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split('/')[1] == pathname.split('/')[1]) {
      return 'menuActive';
    }
  };
  return (
    <ul className="ace-responsive-menu d-flex justify-content-center" style={{paddingRight: "185px"}}>
      <li>
        <Link className={`${handleActive('/')}`} href="/">
          Homes
        </Link>
      </li>
      {/* End homeItems */}

      <li>
        <Link className={`${handleActive('/properties')}`} href="/properties">
          Listing
        </Link>
      </li>
      {/* End listings */}

      {/* <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span
            className={topMenu == "property" ? "title menuActive" : "title"}
          >
            Property
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {propertyItems.map((item, index) => (
            <li key={index} className="dropitem">
              <a href="#">
                <span
                  className={
                    submenu == item.label ? "title menuActive" : "title"
                  }
                >
                  {item.label}
                </span>
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                {item.subMenuItems.map((subMenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(subMenuItem.href)}`}
                      href={subMenuItem.href}
                    >
                      {subMenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li> */}
      {/* End property Items */}

      <li>
        <Link className={`${handleActive('/blog')}`} href="/blog">
          Blog
        </Link>
      </li>
      {/* End blog Items */}

      <li>
        <Link className={`${handleActive('/about')}`} href="/about">
          About
        </Link>
      </li>
      {/* End About */}

      <li>
        <Link className={`${handleActive('/contact')}`} href="/contact">
          Contact
        </Link>
      </li>

      <li>
        <Link className={`${handleActive('/calculator')}`} href="/calculator">
          Calculator
        </Link>
      </li>
      {/* End Contact */}

      {/* <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "pages" ? "title menuActive" : "title"}>
            Pages
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {pageItems.filter(item => item.label !== "About" && item.label !== "Contact").map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li> */}
      {/* End pages Items */}
    </ul>
  );
};

export default MainMenu;
