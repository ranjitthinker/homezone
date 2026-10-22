import BlogFilterContainer from "@/components/blog/blog-list-v3/BlogFilterContainer";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
