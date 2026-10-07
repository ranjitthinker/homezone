import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pricing from "@/components/pages/pricing/Pricing";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import Link from "next/link";

export const metadata = {
  title: "Pricing Plans || Home Zone Real Estate",
};

const PricingPlan = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Banner */}
      <BreadcrumbBanner
        pageKey="pricing"
        title="Membership Plans"
        items={[
          { label: "Home", href: "/" },
          { label: "Plans" },
        ]}
      />
      {/* End Breadcrumb Banner */}

      {/* Pricing Section Area */}
      <section className="our-pricing pb90 pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb30">
                <h2>Membership Plans</h2>
                <p>Choose the right plan tailored to your property listing and promotion needs.</p>
              </div>
            </div>
          </div>
          {/* End .row */}
          <Pricing />
        </div>
        {/* End .container */}
      </section>
      {/* End Pricing Section Area */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default PricingPlan;
