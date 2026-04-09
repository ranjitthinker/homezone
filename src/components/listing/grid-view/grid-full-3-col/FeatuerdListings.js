"use client";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGE = '/images/listings/listing-single-slide1.jpg';

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => (
        <div
          className={`${colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"}`}
          key={listing.id}>
          <div className={colstyle ? "listing-style1 listCustom listing-type" : "listing-style1"}>
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                className="w-100 cover"
                style={{ height: "230px" }}
                src={listing.image || FALLBACK_IMAGE}  // ✅ null guard
                alt={listing.title || 'listing'}
              />
              <div className="sale-sticker-wrap">
                {listing.listed_in !== 'rent' && (          // ✅ API field
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>
              <div className="list-price">
                ₹{Number(listing.price).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="list-content">
              <h6 className="list-title">
                <Link href={`/property/${listing.slug}`}>{listing.title}</Link>
              </h6>

              <p className="list-text">
                {listing.location?.address || 'N/A'}      
              </p>

              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.bedrooms ?? 0} bed    {/* ✅ API field */}
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.bathrooms ?? 0} bath  {/* ✅ API field */}
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.size_ft ?? 0} sqft    {/* ✅ API field */}
                </a>
              </div>

              <hr className="mt-2 mb-2" />

              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">
                  For {listing.listed_in === 'rent' ? 'Rent' : 'Sale'}  {/* ✅ dynamic */}
                </span>
                <div className="icons d-flex align-items-center">
                  <a href="#"><span className="flaticon-fullscreen" /></a>
                  <a href="#"><span className="flaticon-new-tab" /></a>
                  <a href="#"><span className="flaticon-like" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;