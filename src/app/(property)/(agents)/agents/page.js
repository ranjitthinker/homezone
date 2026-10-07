import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FilteringAgent from "@/components/property/FilteringAgent";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import React from "react";

export const metadata = {
  title: "Agents || Home Zone Real Estate",
};

const Agents = () => {
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
        pageKey="agents"
        title="Real Estate Agents"
        items={[
          { label: "Home", href: "/" },
          { label: "Agents" },
        ]}
      />
      {/* End Breadcrumb Banner */}

      {/* Agent Section Area */}
      <FilteringAgent/>
      
      {/* End Agent Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Agents;
