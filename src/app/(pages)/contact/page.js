import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Link from "next/link";

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

      {/* Start Our Contact Form & Office Address Section */}
      <section className="pb70" style={{ paddingTop: '100px', backgroundColor: '#f7f7f7' }}>
        <div className="container">
          {/* Page Heading */}
          <div className="row mb30">
            <div className="col-lg-12">
              <span
                className="badge px-3 py-2 fw600 mb-2"
                style={{
                  backgroundColor: '#fff0ed',
                  color: '#eb6753',
                  borderRadius: '30px',
                  fontSize: '13px',
                }}
              >
                GET IN TOUCH
              </span>
              <h2 className="title fz32 fw700 mb-2" style={{ color: '#181a20' }}>
                Contact Home Zone Real Estate
              </h2>
              <p className="text text-muted fz15 mb-0">
                Have questions about our residential or commercial properties? Visit our office or connect directly with our advisory team.
              </p>
            </div>
          </div>

          <div className="row g-4 align-items-start">
            {/* Left Column: Contact Form */}
            <div className="col-lg-6">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p35 bgc-white h-100">
                <h4 className="form-title mb20 fw700" style={{ color: '#181a20' }}>
                  Send Us a Message
                </h4>
                <p className="text-muted fz14 mb25">
                  Fill out the form below and one of our dedicated property advisors will get back to you shortly.
                </p>
                <Form />
              </div>
            </div>
            {/* End .col */}

            {/* Right Column: Office Address & Direct Connect Card */}
            <div className="col-lg-6">
              <div
                className="default-box-shadow1 bdrs12 bdr1 p35 bgc-white h-100"
                style={{ border: '1px solid #ebebeb' }}
              >
                <div className="mb30">
                  <span
                    className="badge px-3 py-2 fw600 mb-2"
                    style={{
                      backgroundColor: '#ebf5ff',
                      color: '#0066cc',
                      borderRadius: '30px',
                      fontSize: '12px',
                    }}
                  >
                    HEAD OFFICE & SUPPORT
                  </span>
                  <h3 className="fz24 fw700 mt-2 mb-2" style={{ color: '#181a20' }}>
                    Visit Our Office
                  </h3>
                  <p className="text-muted fz14 mb-0">
                    Feel free to visit our office during working hours or call our helpline for instant assistance with verified property deals.
                  </p>
                </div>

                {/* Office Info Items */}
                <div className="d-flex flex-column gap-3 mb30">
                  {/* Address */}
                  <div
                    className="d-flex align-items-start p-3 rounded-3"
                    style={{ backgroundColor: '#fcfcfc', border: '1px solid #f0f0f0' }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: '#fff0ed',
                        color: '#eb6753',
                        fontSize: '20px',
                      }}
                    >
                      <i className="flaticon-map" />
                    </div>
                    <div>
                      <h6 className="fz14 fw600 mb-1" style={{ color: '#717171' }}>
                        Office Address
                      </h6>
                      <p className="fz15 fw600 mb-1" style={{ color: '#181a20' }}>
                        Bahadurgarh, Patiala, Punjab, India
                      </p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Bahadurgarh+Patiala+Punjab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fz13 fw600 text-decoration-underline"
                        style={{ color: '#eb6753' }}
                      >
                        Get Directions on Google Maps <i className="fal fa-arrow-up-right ms-1" />
                      </a>
                    </div>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div
                    className="d-flex align-items-start p-3 rounded-3"
                    style={{ backgroundColor: '#fcfcfc', border: '1px solid #f0f0f0' }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: '#e8f7ee',
                        color: '#28a745',
                        fontSize: '20px',
                      }}
                    >
                      <i className="flaticon-call" />
                    </div>
                    <div>
                      <h6 className="fz14 fw600 mb-1" style={{ color: '#717171' }}>
                        Call & WhatsApp Helpline
                      </h6>
                      <p className="fz16 fw700 mb-1" style={{ color: '#181a20' }}>
                        <a href="tel:+919855515783" style={{ color: 'inherit' }}>
                          +91-9855515783
                        </a>
                      </p>
                      <small className="text-muted">Direct phone consultations available</small>
                    </div>
                  </div>

                  {/* Email */}
                  <div
                    className="d-flex align-items-start p-3 rounded-3"
                    style={{ backgroundColor: '#fcfcfc', border: '1px solid #f0f0f0' }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: '#edf5ff',
                        color: '#1a73e8',
                        fontSize: '20px',
                      }}
                    >
                      <i className="flaticon-email" />
                    </div>
                    <div>
                      <h6 className="fz14 fw600 mb-1" style={{ color: '#717171' }}>
                        Email Inquiries
                      </h6>
                      <p className="fz15 fw600 mb-0">
                        <a href="mailto:support@homezone.com" style={{ color: '#181a20' }}>
                          support@homezone.com
                        </a>
                      </p>
                      <p className="fz13 text-muted mb-0">
                        <a href="mailto:info@homezone.com" style={{ color: '#717171' }}>
                          info@homezone.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div
                    className="d-flex align-items-start p-3 rounded-3"
                    style={{ backgroundColor: '#fcfcfc', border: '1px solid #f0f0f0' }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: '#fff7e6',
                        color: '#d48806',
                        fontSize: '20px',
                      }}
                    >
                      <i className="flaticon-clock" />
                    </div>
                    <div>
                      <h6 className="fz14 fw600 mb-1" style={{ color: '#717171' }}>
                        Working Hours
                      </h6>
                      <p className="fz14 fw600 mb-0" style={{ color: '#181a20' }}>
                        Monday – Saturday: 9:30 AM – 7:00 PM
                      </p>
                      <small className="text-muted">Sunday: By Prior Appointment</small>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="d-flex flex-wrap gap-2 pt-2">
                  <a
                    href="tel:+919855515783"
                    className="ud-btn btn-thm flex-grow-1 text-center"
                    style={{ borderRadius: '30px', padding: '12px 20px', fontSize: '14px' }}
                  >
                    <i className="fal fa-phone-alt me-2" /> Call Advisor
                  </a>
                  <a
                    href="https://wa.me/919855515783?text=Hello%20Home%20Zone,%20I%20am%20interested%20in%20your%20properties."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ud-btn btn-white flex-grow-1 text-center"
                    style={{
                      borderRadius: '30px',
                      padding: '12px 20px',
                      fontSize: '14px',
                      border: '1px solid #28a745',
                      color: '#28a745',
                      backgroundColor: '#fff',
                    }}
                  >
                    <i className="fab fa-whatsapp me-2" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form & Office Address Section */}

      {/* Our Contact With Map pointing to Bahadurgarh, Patiala */}
      <section className="p-0">
        <iframe
          className="home8-map contact-page"
          loading="lazy"
          src="https://maps.google.com/maps?q=Bahadurgarh%2C%20Patiala%2C%20Punjab%2C%20India&t=m&z=14&output=embed&iwloc=near"
          title="Home Zone Real Estate, Bahadurgarh, Patiala, Punjab"
          aria-label="Home Zone Real Estate, Bahadurgarh, Patiala, Punjab"
          style={{ width: '100%', height: '420px', border: 0 }}
        />
      </section>
      {/* End Our Contact With Map */}

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
