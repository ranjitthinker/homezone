import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import CallToActions from "@/components/common/CallToActions";

export const metadata = {
  title: "Home Loan EMI & Stamp Duty Calculator || Home Zone Real Estate",
  description: "Calculate accurate monthly home loan EMIs, interest breakdown, and Punjab stamp duty/registry charges instantly on Home Zone.",
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

      {/* Calculator Section Area */}
      <section className="pb90" style={{ paddingTop: '100px', backgroundColor: '#f7f7f7' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <span className="badge px-3 py-2 fw600 mb-2" style={{ backgroundColor: '#fff0ed', color: '#eb6753', borderRadius: '30px', fontSize: '13px' }}>
                  FINANCIAL PLANNING TOOLS
                </span>
                <h2 className="title fz28 fw700 mb-2">Home Loan EMI &amp; Stamp Duty Calculator</h2>
                <p className="text text-muted mb30 fz15">
                  Plan your property purchase with total clarity. Estimate your monthly loan installments, total interest, and government registration fees.
                </p>
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