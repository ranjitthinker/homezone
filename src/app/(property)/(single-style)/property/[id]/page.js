import DefaultHeader from '@/components/common/DefaultHeader';
import Footer from '@/components/common/default-footer';
import MobileMenu from '@/components/common/mobile-menu';
import EnergyClass from '@/components/property/property-single-style/common/EnergyClass';
import FloorPlans from '@/components/property/property-single-style/common/FloorPlans';
import HomeValueChart from '@/components/property/property-single-style/common/HomeValueChart';
import InfoWithForm from '@/components/property/property-single-style/common/more-info';
import NearbySimilarProperty from '@/components/property/property-single-style/common/NearbySimilarProperty';
import OverView from '@/components/property/property-single-style/common/OverView';
import PropertyAddress from '@/components/property/property-single-style/common/PropertyAddress';
import PropertyDetails from '@/components/property/property-single-style/common/PropertyDetails';
import PropertyFeaturesAminites from '@/components/property/property-single-style/common/PropertyFeaturesAminites';
import PropertyHeader from '@/components/property/property-single-style/single-v4/PropertyHeader';
import PropertyNearby from '@/components/property/property-single-style/common/PropertyNearby';
import PropertyVideo from '@/components/property/property-single-style/common/PropertyVideo';
import PropertyViews from '@/components/property/property-single-style/common/property-view';
import ProperytyDescriptions from '@/components/property/property-single-style/common/ProperytyDescriptions';
import ReviewBoxForm from '@/components/property/property-single-style/common/ReviewBoxForm';
import VirtualTour360 from '@/components/property/property-single-style/common/VirtualTour360';
import AllReviews from '@/components/property/property-single-style/common/reviews';
import ContactWithAgent from '@/components/property/property-single-style/sidebar/ContactWithAgent';
import ScheduleTour from '@/components/property/property-single-style/sidebar/ScheduleTour';
import PropertyGallery from '@/components/property/property-single-style/single-v1/PropertyGallery';
import MortgageCalculator from '@/components/property/property-single-style/common/MortgageCalculator';
import WalkScore from '@/components/property/property-single-style/common/WalkScore';
import { getPropertyById } from '@/utils/services/propertyService';
import MobileBottomBar from '@/components/property/property-single-style/common/MobileBottomBar';
import PropertyNavBar from '@/components/property/property-single-style/common/PropertyNavBar';
import Form from '@/components/pages/contact/Form';

export const metadata = {
  title: 'Property Single V4 || Homez - Real Estate NextJS Template',
};

const SingleV4 = async (props) => {
  const params = await props.params;

  console.log('params.id', params.id);

  const property = await getPropertyById(params.id);

  const slug = property?.slug || ''; // ✅ FIXED

  console.warn('property slug----', slug);

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V4 */}
      <section className="pt-2 pb90 bgc-white">
        <div className="container">
          <div className="row">
            <PropertyHeader property={property} />
          </div>
          {/* End .row */}

          {/* Property Slider Gallery */}
          <div className="row mb30 mt30">
            <PropertyGallery property={property} />
          </div>
          {/* End Property Slider Gallery */}

          {/* // PROPERTY NAVBAR */}
          <PropertyNavBar />

          <div className="row wrap">
            <div className="col-lg-8">
              <div
                id="overview"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Overview</h4>
                <div className="row">
                  <OverView data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div
                id="description"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions data={property} />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div id="details" className="row">
                  <PropertyDetails data={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div
                id="address"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30 mt30">Address</h4>
                <div className="row">
                  <PropertyAddress property={property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div
                id="amenities"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
                <div className="row">
                  <PropertyFeaturesAminites amenities={property.amenities} />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div
                id="energy-class"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Energy Class</h4>
                <div className="row">
                  <EnergyClass />
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div
                id="floor-plans"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Floor Plans</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="accordion-style1 style2">
                      <FloorPlans floorPlans={property.floor_plans} />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div id="video" className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                <h4 className="title fz17 mb30">Video</h4>
                <div className="row">
                  <PropertyVideo videoUrl={property.video_url} />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div
                id="virtual-tour"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">360° Virtual Tour</h4>
                <div className="row">
                  <VirtualTour360 property={property} />
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div
                id="nearby"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                <div className="row">
                  <PropertyNearby nearbyPlaces={property.nearby_places} />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div
                id="walkscore"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Walkscore</h4>
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="fw400 mb20">10425 Tabor St Los Angeles CA 90034 USA</h4>
                    <WalkScore />
                  </div>
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div
                id="mortgage-calculator"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Mortgage Calculator</h4>
                <div className="row">
                  <MortgageCalculator />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div
                id="property-views"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <div className="row">
                  <PropertyViews />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div
                id="home-value"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Home Value</h4>
                <div className="row">
                  <HomeValueChart />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div
                id="get-more-information"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Get More Information</h4>
                <InfoWithForm />
              </div> */}
              {/* End .ps-widget */}

              <div
                id="reviews"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <div className="row">
                  {/* <AllComments /> */}
                  <AllReviews />
                </div>
              </div>
              {/* End .ps-widget */}

              <div
                id="leave-a-review"
                className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative"
              >
                <h4 className="title fz17 mb30">Leave A Review</h4>
                <div className="row">
                  <ReviewBoxForm />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div id="schedule-tour" className="col-lg-4">
              <div className="column">
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="form-title mb5">Contact Developer</h4>
                  {/* <p className="text">Choose your preferred day</p> */}
                  <Form />
                </div>
                {/* End .Schedule a tour */}

                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Get More Information</h6>
                    <ContactWithAgent property={property} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">Discover Our Featured Listings</h2>
                <p className="paragraph">Explore a curated selection of premium properties tailored to your needs.</p>
              </div>
            </div>

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>

                <div className="col-auto">
                  <div className="pagination swiper--pagination featured-pagination__active" />
                </div>

                <div className="col-auto">
                  <button className="featured-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div id="nearby-similar-property" className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <NearbySimilarProperty propertyId={params.id} />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V4  */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      <MobileBottomBar property={property} />
      {/* End Our Footer */}
    </>
  );
};

export default SingleV4;
