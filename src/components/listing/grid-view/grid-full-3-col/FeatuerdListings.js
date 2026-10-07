"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

const FALLBACK_IMAGE = '/images/listings/listing-single-slide1.jpg';

const FeaturedListings = ({ data, colstyle }) => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('favorite_properties') || '{}');
      setFavorites(saved);
    } catch (_) {}
  }, []);

  const toggleFavorite = (e, listing) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem('favorite_properties') || '{}');
      const isFav = !saved[listing.id];
      if (isFav) {
        saved[listing.id] = { id: listing.id, title: listing.title, slug: listing.slug, price: listing.price };
        toast.success(`"${listing.title}" added to favorites!`);
      } else {
        delete saved[listing.id];
        toast.success(`Removed from favorites.`);
      }
      localStorage.setItem('favorite_properties', JSON.stringify(saved));
      setFavorites({ ...saved });
    } catch (_) {}
  };

  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

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
                src={listing.image || FALLBACK_IMAGE}
                alt={listing.title || 'listing'}
              />
              <div className="sale-sticker-wrap">
                {listing.listed_in !== 'rent' && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>
              <div className="list-price">
                ₹{Math.round(Number(listing.price || 0)).toLocaleString('en-IN')}{' '}
                {listing.listed_in === 'rent' && <span>/ mo</span>}
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
                <span className="me-3">
                  <span className="flaticon-bed" /> {listing.bedrooms ?? 0} bed
                </span>
                <span className="me-3">
                  <span className="flaticon-shower" /> {listing.bathrooms ?? 0} bath
                </span>
                <span>
                  <span className="flaticon-expand" /> {listing.size_ft ?? 0} sqft
                </span>
              </div>

              <hr className="mt-2 mb-2" />

              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">
                  For {listing.listed_in === 'rent' ? 'Rent' : 'Sale'}
                </span>
                <div className="icons d-flex align-items-center gap-2">
                  <Link
                    href={`/property/${listing.slug}`}
                    title="View Property"
                    className="text-dark"
                  >
                    <span className="flaticon-fullscreen" />
                  </Link>
                  <Link
                    href={`/property/${listing.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    className="text-dark"
                  >
                    <span className="flaticon-new-tab" />
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(e, listing)}
                    title={favorites[listing.id] ? "Remove from favorites" : "Save to favorites"}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: favorites[listing.id] ? '#e53935' : 'inherit',
                      lineHeight: 1,
                    }}
                  >
                    <span className="flaticon-like" />
                  </button>
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