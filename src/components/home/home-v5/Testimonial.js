"use client";
import testimonialData from "@/data/testimonials";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".testimonila_next__active",
          prevEl: ".testimonila_prev__active",
        }}
        pagination={{
          el: ".testimonila_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {testimonialData.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="item">
              <div className="testimonial-style3 mt-1 mx-1 position-relative mb60">
                <div className="testimonial-content">
                  <span className="icon">“</span>
                </div>
                <div className="thumb d-flex align-items-center mb40">
                  <div
                    className="flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #eb6753, #e0533d)',
                      fontSize: '15px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {testimonial.name
                      .split(' ')
                      .filter((w) => !['&', 'and', 'Col.'].includes(w))
                      .map((n) => n[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0 fw600 fz16 d-flex align-items-center flex-wrap">
                      <span>{testimonial.name}</span>
                      <span className="ms-2 badge bg-success-subtle text-success border border-success-subtle rounded-pill fz11 fw-normal px-2 py-0">
                        <i className="fas fa-check-circle me-1" /> Verified
                      </span>
                    </h6>
                    <p className="mb-0 text-muted fz13">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text">{testimonial.quote}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <button className="testimonila_prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        {/* End prev */}

        <div className="col-auto">
          <div className="pagination swiper--pagination testimonila_pagination__active" />
        </div>
        {/* End pagination */}

        <div className="col-auto">
          <button className="testimonila_next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
        {/* End Next */}
      </div>

      {/* End .row for navigation and pagination */}
    </>
  );
};

export default Testimonial;
