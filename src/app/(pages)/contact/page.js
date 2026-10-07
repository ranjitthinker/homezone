import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";

export const metadata = {
  title: "Contact Us || Home Zone Real Estate",
};

const Contact = () => {
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
        pageKey="contact"
        title="Contact Us"
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      {/* End Breadcrumb Banner */}

      {/* Our Contact With Map */}
      <section className="p-0">
        <iframe
          className="home8-map contact-page"
          loading="lazy"
          src="https://maps.google.com/maps?q=Bandra%20Kurla%20Complex%2C%20Mumbai%2C%20Maharashtra%2C%20India&t=m&z=14&output=embed&iwloc=near"
          title="Home Zone Real Estate, Bandra Kurla Complex, Mumbai"
          aria-label="Home Zone Real Estate, Bandra Kurla Complex, Mumbai"
        />
      </section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section>
        <div className="container">
          <div className="row d-flex align-items-end">
            <div className="col-lg-5 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                <h4 className="form-title mb25">
                  Have questions? Get in touch!
                </h4>
                <Form />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-5 offset-lg-2">
              <h2 className="mb30 text-capitalize">
                We’d love to hear <br className="d-none d-lg-block" />
                from you.
              </h2>
              <p className="text">
                We are here to answer any question you may have. Home Zone connects you with verified properties, top builders, and trusted real estate experts across top cities.
              </p>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

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

export default Contact;
