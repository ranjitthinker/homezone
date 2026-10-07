import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FilteringAgency from "@/components/property/FilteringAgency";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import React from "react";

export const metadata = {
  title: "Agencies || Home Zone Real Estate",
};

const Agency = () => {
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
        pageKey="agency"
        title="Real Estate Agencies"
        items={[
          { label: "Home", href: "/" },
          { label: "Agencies" },
        ]}
      />
      {/* End Breadcrumb Banner */}

      {/* Agent Section Area */}
      <FilteringAgency/>

      {/* End Agent Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Agency;
