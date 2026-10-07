import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import AboutCompany from "@/components/pages/about/AboutCompany";
import ProjectSlideGallery from "@/components/pages/about/ProjectSlideGallery";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import Link from "next/link";

export const metadata = {
  title: "About Us || Home Zone Real Estate",
};

const About = () => {
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
        pageKey="about"
        title="About Us"
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        defaultBg="/images/background/about-page-bg.cad1db94.jpg"
      />
      {/* End Breadcrumb Banner */}

      {/* About Section: Left Side Image & Right Side Content about Company */}
      <AboutCompany />

      {/* Project Slider & Gallery Section (Left: Slide, Right: Gallery) */}
      <ProjectSlideGallery />

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

export default About;
