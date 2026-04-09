"use client";
import Image from "next/image";
import Link from "next/link";
import ContactMeta from "./ContactMeta";
import Subscribe from "./Subscribe";
import MenuWidget from "./MenuWidget";
import Copyright from "./Copyright";
import { useSettings } from "@/context/SettingsProvider";

const Footer = () => {
  const rawSettings = useSettings();

  // ✅ Transform [{key, value}] → flat object once here
  const settings = Array.isArray(rawSettings?.data)
    ? rawSettings.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : {};

  const logo = settings?.logo_light || settings?.site_logo || '/images/header-logo2.svg';

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget light-style mb-4 mb-lg-5">
              <Link className="footer-logo" href="/">
                <Image
                  width={138}
                  height={44}
                  className="mb40"
                  src={logo}
                  alt={settings?.site_name || 'Logo'}
                />
              </Link>
              <ContactMeta settings={rawSettings} />  {/* ✅ now receives flat object */}
            </div>
          </div>
          <MenuWidget />
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget mb-4 mb-lg-5">
              <div className="mailchimp-widget mb30">
                <h6 className="title mb30">Keep Yourself Up to Date</h6>
                <Subscribe />
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