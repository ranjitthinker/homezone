"use client";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/context/SettingsProvider";

const CallToActions = () => {
  const rawSettings = useSettings();

  // ✅ Transform [{key, value}] → flat object
  const settings = Array.isArray(rawSettings?.data)
    ? rawSettings.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {})
    : {};

  const phone = settings?.contact_phone || '920 851 9087';
  const phoneLink = phone ? `tel:${phone.replace(/\s/g, '')}` : 'tel:9208519087';

  return (
    <section className="our-cta pt0">
      <div className="cta-banner bgc-f7 mx-auto maxw1600 pt120 pt60-md pb120 pb60-md bdrs12 position-relative mx20-lg">
        <div className="img-box-5">
          <Image
            width={193}
            height={193}
            className="img-1 spin-right"
            src="/images/about/element-1.png"
            alt="spinner"
          />
        </div>  
        <div className="img-box-6">
          <Image
            width={193}
            height={193}
            className="img-1 spin-left"
            src="/images/about/element-1.png"
            alt="spinner"
          />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-xl-6" data-aos="fade-right">
              <div className="cta-style1">
                <h2 className="cta-title">Need help? Talk to our expert.</h2>
                <p className="cta-text mb-0">
                  Talk to our experts or Browse through more properties.
                </p>
              </div>
            </div>

            <div className="col-lg-5 col-xl-6" data-aos="fade-left">
              <div className="cta-btns-style1 d-block d-sm-flex align-items-center justify-content-lg-end">
                <Link
                  href="/contact"
                  className="ud-btn btn-transparent mr30 mr0-xs">
                  Contact Us
                  <i className="fal fa-arrow-right-long" />
                </Link>

                {/* ✅ Dynamic phone from settings */}
                <Link href={phoneLink} className="ud-btn btn-dark">
                  <span className="flaticon-call vam pe-2" />
                  {phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CallToActions;