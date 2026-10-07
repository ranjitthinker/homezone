import BlogFilterContainer from "@/components/blog/blog-list-v3/BlogFilterContainer";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import Link from "next/link";

export const metadata = {
  title: "Blog || Home Zone Real Estate",
};

const BlogV3 = () => {
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
        pageKey="blog"
        title="Blog & Market Insights"
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      {/* End Breadcrumb Banner */}

      {/* Blog Section Area */}
      <BlogFilterContainer/>
      {/* End Blog Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default BlogV3;
