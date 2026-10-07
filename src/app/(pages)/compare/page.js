import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ComapareTable from "@/components/pages/compare/ComapareTable";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import Link from "next/link";

export const metadata = {
  title: "Compare Properties || Home Zone Real Estate",
};

const Compare = () => {
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
        pageKey="compare"
        title="Compare Properties"
        items={[
          { label: "Home", href: "/" },
          { label: "Compare" },
        ]}
        defaultBg="/images/background/compare-bg.jpg"
        textTheme="light"
      />
      {/* End Breadcrumb Banner */}

      {/* Our Compare Area */}
      <section className="our-compare">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-12">
              <div className="table-style2 table-responsive">
                <ComapareTable />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Compare Area */}

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

export default Compare;
