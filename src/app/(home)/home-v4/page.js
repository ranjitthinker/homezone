import MobileMenu from '@/components/common/mobile-menu';
import CallToActions from '@/components/home/home-v4/CallToActions';
// import DefaultHeader from '@/components/common/DefaultHeader';
import PropertiesByCities from '@/components/home/home-v1/PropertiesByCities';
import Hero from '@/components/home/home-v4/hero';
import Features from '@/components/home/home-v4/Features';
import Link from 'next/link';
import Funfact from '@/components/home/home-v4/Funfact';
import About from '@/components/home/home-v4/about';
import Testimonial from '@/components/home/home-v4/Testimonial';
// import FilterProperties from "@/components/home/home-v4/FilterProperties";
import Footer from '@/components/common/default-footer';
import FeaturedListings from '@/components/home/home-v6/FeatuerdListings';
import ApartmentType from '@/components/home/home-v1/ApartmentType';
import Explore from '@/components/common/Explore';
import Blog from '@/components/common/Blog';
import Header from '@/components/home/home-v1/Header';
import FeaturedHomes from '@/components/home/home-v7/FeaturedHomes';
import InqueryForm from '@/components/home/home-v7/InqueryForm';
import Image from 'next/image';
import 'swiper/swiper-bundle.css';
import { useSettings } from '@/context/SettingsProvider';

export const metadata = {
  title: 'Home v4 || Homez - Real Estate NextJS Template',
};

const Home_V4 = async () => {
  // ✅ Correct
  // const response = await apiService.get('settings');
  // const settings = response.data; // Axios puts data here directly

  //
  // ✅ Correct

  return (
    <>
      {/* Main Header Nav */}
      {/* <DefaultHeader /> */}
      <Header/>
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Hero Slide */}

      {/* Home Banner Style V1 */}
      <section className="home-banner-style4 p0 bgc-white">
        <Hero />
      </section>

      {/* Explore property-city */}
      <section className="pb40-md pb90">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-9">
              <div className="main-title2">
                <h2 className="title">Properties by Cities</h2>
                <p className="paragraph">
                  Explore the best properties available in top cities, tailored to your needs and lifestyle.
                </p>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <a className="ud-btn2" href="#">
                  See All Cities
                  <i className="fal fa-arrow-right-long" />
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider position-relative">
                <PropertiesByCities />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Explore property-city */}

      {/* Featured Listings */}
      <section className="pb40 pb30-md">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div className="main-title" data-aos="fade-up" data-aos-delay="100">
                <h2 className="title">Discover Our Featured Listings</h2>
                <p className="paragraph">
                  Find the best properties available in top cities, tailored to your needs and lifestyle.
                </p>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination featured-pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="featured-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-listing-slider">
                <FeaturedListings />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Featured Listings */}

      {/* Featured Homes */}
      <section className="pt-0 pb90 pb30-md bgc-white">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="title">Featured Homes</h2>
                <p className="paragraph">
                  Get some Inspirations from 800+ Properties
                </p>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="properties_homes-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination properties_homes_pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="properties_homes-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="explore-apartment-5col-slider">
                <FeaturedHomes />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Featured Homes */}

      {/* Popular Property */}
      {/* <section className="pt-0 pb60">
        <div className="container">
          <FilterProperties />
        </div>
      </section> */}

      {/* Abut intro */}
      <section className="pt30 pb-0">
        <div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-5 pl30-md pl15-xs" data-aos="fade-left" data-aos-delay="300">
                <div className="mb30">
                  <h2 className="title text-capitalize">
                    Let’s find the right <br className="d-none d-md-block" /> selling option for you
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features />
                </div>
                <Link href="#" className="ud-btn btn-dark">
                  Learn More
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}

      {/* Funfact */}

                <div className="col-auto">
                  <button className="next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="explore-apartment-slider" data-aos="fade-up" data-aos-delay="300">
                <ApartmentType />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Explore Apartment */}

      {/* Explore Apartment */}
      <section className="pt0 pb90 pb10-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up" data-aos-delay="300">
              <div className="main-title text-center">
                <h2 className="title">See How Realton Can Help</h2>
                <p className="paragraph">Aliquam lacinia diam quis lacus euismod</p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Explore />
          </div>
        </div>
      </section>
      {/* End Explore Apartment */}

      {/* About Us */}
      <section className="pt0 pb40-md">
        <About /> 
      </section>
      {/* End About Us */}

      {/* Our Testimonials */}
      <section className="pt110 pb40-md">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div className="main-title" data-aos="fade-up" data-aos-delay="300">
                <h2 className="title">People Love Living with Realton</h2>
                <p className="paragraph">Trusted by thousands of happy homeowners and renters worldwide.</p>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
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
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="testimonial-slider" data-aos="fade-up" data-aos-delay="300">
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Testimonials */}

      {/* Explore Blog */}
      <section className="mb75 mb0-md pb30-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up">
              <div className="main-title text-start text-md-center">
                <h2 className="title">From Our Blog</h2>
                <p className="paragraph">Aliquam lacinia diam quis lacus euismod</p>
              </div>
            </div>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
        </div>
      </section>

        {/* Real Estate Inquiry Form */}
      <section>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 col-xl-5"
              data-aos="fade-left"
              data-aos-delay="0"
            >
              <div className="main-title mb40">
                <h2 className="title">Real Estate Inquiry Form</h2>
                <p className="paragraph fz15">
                  As the complexity of buildings to increase
                </p>
              </div>
              <div className="inquiry-form mb30-md">
                <InqueryForm />
              </div>
            </div>
            {/* End col-6 */}

            <div
              className="col-lg-6 col-xl-6 offset-xl-1"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="inquiry-form">
                <div className="inquiry-img">
                  <Image
                    width={591}
                    height={778}
                    className="w-100 h-100 cover"
                    src="/images/about/about-4.webp"
                    alt="about"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Real Estate Inquiry Form */}

      {/* Our CTA */}
      <section className="our-cta p-0">
        <CallToActions />
      </section>
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home_V4;
