import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import CallToActions from "@/components/common/CallToActions";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import Link from "next/link";

export const metadata = {
  title: "Mortgage & EMI Calculator || Home Zone Real Estate",
};

export default function Calculator() {
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
        pageKey="calculator"
        title="Mortgage & EMI Calculator"
        items={[
          { label: "Home", href: "/" },
          { label: "Calculator" },
        ]}
      />
      {/* End Breadcrumb Banner */}

      {/* Calculator Section Area */}
      <section className="pb90 pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz20 mb20">Calculate Your Monthly EMI & Home Loan Payments</h4>
                <p className="text mb30">Estimate your monthly mortgage payments with ease. Enter the total property cost, down payment, interest rate, and tenure.</p>
                <div className="row">
                  <MortgageCalculator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Calculator Section Area */}

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
}