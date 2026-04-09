'use client';
import Image from 'next/image';
import Link from 'next/link';
import ContactMeta from './ContactMeta';
import Social from './Social';
import Subscribe from './Subscribe';
import MenuWidget from './MenuWidget';
import Copyright from './Copyright';
import { useSettings } from '@/context/SettingsProvider';

const Footer = () => {
  const rawSettings = useSettings();

  // ✅ Transform [{key, value}] → flat object
  const settings = Array.isArray(rawSettings?.data)
    ? rawSettings.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : {};

  const logo = settings?.logo_dark || settings?.site_logo || '/images/header-logo.svg';

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="footer-widget mb-4 mb-lg-5">
              <Link className="footer-logo" href="/">
                <Image
                  width={140}
                  height={40}
                  className="mb40"
                  src={settings?.logo_light || logo} // ✅ dynamic logo
                  alt={settings?.site_name || 'Logo'}
                />
              </Link>
              <ContactMeta settings={settings} /> {/* ✅ pass flat settings */}
              <div className="social-widget">
                <h6 className="text-white mb20">Follow us on social media</h6>
                <Social settings={settings} /> {/* ✅ pass for social too */}
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="footer-widget mb-4 mb-lg-5">
              <Subscribe />
              <div className="row justify-content-between">
                <MenuWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
};
export default Footer;
