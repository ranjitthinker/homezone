import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PostPropertyWizard from "@/components/pages/post-property/PostPropertyWizard";

export const metadata = {
  title: "Post Your Property Free in 2 Minutes || Home Zone Real Estate",
  description: "List your residential, commercial, or plot property on Home Zone in just 2 minutes. Reach thousands of verified genuine buyers with 0 brokerage spam.",
};

export default function PostPropertyPage() {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      <section className="pb90" style={{ paddingTop: "100px", backgroundColor: "#f7f7f7" }}>
        <div className="container">
          <div className="row justify-content-center mb30">
            <div className="col-lg-8 text-center">
              <span
                className="badge px-3 py-2 fw600 mb-2"
                style={{ backgroundColor: "#e8f7ee", color: "#28a745", borderRadius: "30px", fontSize: "13px" }}
              >
                100% FREE OWNER &amp; AGENT LISTING
              </span>
              <h2 className="title fz32 fw700 mb-2">Post Your Property in 2 Minutes</h2>
              <p className="text text-muted fz15">
                Connect directly with verified buyers and tenants across Punjab and North India. Zero hidden charges, zero broker spam.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <PostPropertyWizard />
            </div>
          </div>
        </div>
      </section>

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
}
