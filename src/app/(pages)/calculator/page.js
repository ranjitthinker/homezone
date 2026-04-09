import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";

export default function Calculator() {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* End .ps-widget */}
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <h4 className="title fz17 mb30">Mortgage Calculator</h4>
        <div className="row">
          <MortgageCalculator />
        </div>
      </div>
      {/* End .ps-widget */}
    </>
  );
}