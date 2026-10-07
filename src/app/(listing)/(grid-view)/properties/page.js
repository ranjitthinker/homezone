import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import Link from "next/link";
import React, { Suspense } from "react";  

export const metadata = {
  title: "Properties || Home Zone Real Estate",
};

const GridFull3Col = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Banner */}
      <BreadcrumbBanner
        pageKey="properties"
        title="Explore Properties"
        items={[
          { label: "Home", href: "/" },
          { label: "Properties" },
        ]}
      >
        <a
          className="filter-btn-left mobile-filter-btn d-block d-lg-none"
          data-bs-toggle="offcanvas"
          href="#listingSidebarFilter"
          role="button"
          aria-controls="listingSidebarFilter"
        >
          <span className="flaticon-settings" /> Filter
        </a>
      </BreadcrumbBanner>
      {/* End Breadcumb Banner */}

      {/* Property Filtering */}
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        <ProperteyFiltering />
      </Suspense>
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default GridFull3Col;
