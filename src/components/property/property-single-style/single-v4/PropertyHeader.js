"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PropertyHeader = ({ property }) => {
  if (!property) return null;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("favorite_properties") || "[]");
      if (Array.isArray(favs) && favs.includes(property.id)) {
        setIsFavorite(true);
      }
    } catch {
      // ignore JSON parse error
    }
  }, [property.id]);

  const handleFavorite = (e) => {
    e.preventDefault();
    try {
      const favs = JSON.parse(localStorage.getItem("favorite_properties") || "[]");
      let newFavs;
      if (favs.includes(property.id)) {
        newFavs = favs.filter((id) => id !== property.id);
        setIsFavorite(false);
        toast("Removed from favorites", { icon: "💔" });
      } else {
        newFavs = [...favs, property.id];
        setIsFavorite(true);
        toast.success("Property saved to favorites!", { icon: "❤️" });
      }
      localStorage.setItem("favorite_properties", JSON.stringify(newFavs));
    } catch {
      setIsFavorite(!isFavorite);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    const shareData = {
      title: property.title || "Home Zone Property",
      text: `Check out ${property.title} on Home Zone`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Property link copied to clipboard!");
        return;
      } catch {
        // fallback
      }
    }

    toast("Link: " + (typeof window !== "undefined" ? window.location.href : ""));
  };

  const handlePrint = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // ✅ Clean integer prices without decimal paise
  const rawPrice = Number(property.price) || 0;
  const cleanPrice = Math.round(rawPrice);
  const formattedPrice = `₹${cleanPrice.toLocaleString("en-IN")}`;

  const sizeFt = property.details?.size_ft;
  const pricePerSqft = sizeFt && sizeFt > 0 ? Math.round(rawPrice / sizeFt).toLocaleString("en-IN") : null;
  const yearBuilt = property.details?.year_built;
  const yearsAgo = yearBuilt ? Number(new Date().getFullYear()) - Number(yearBuilt) : null;
  const address = property.location?.address ?? "Location not available";

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          {/* Title */}
          <h2 className="sp-lg-title">{property.title}</h2>

          <div className="pd-meta mb15 d-md-flex align-items-center">
            {/* Address */}
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {address}
            </p>
          </div>

          <div className="property-meta d-flex align-items-center">
            {/* Listed in */}
            <span className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm">
              <i className="fas fa-circle fz10 pe-2" />
              For {property.listed_in === "rent" ? "Rent" : "Sale"}
            </span>

            {/* Year built / Category */}
            {yearsAgo !== null ? (
              <span className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm">
                <i className="far fa-clock pe-2" />
                {yearsAgo} years ago
              </span>
            ) : (
              <span className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm">
                <i className="far fa-calendar pe-2" />
                {property.category?.name ?? "Property"}
              </span>
            )}

            {/* Size */}
            {sizeFt && (
              <span className="ff-heading ml10 ml0-sm fz15">
                <i className="flaticon-fullscreen pe-2 align-text-top" />
                {sizeFt.toLocaleString()} sq ft
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            {/* Action buttons: Favorite, Share, Print (Compare removed) */}
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end gap-2">
              <button
                type="button"
                className="icon btn p-0 d-inline-flex align-items-center justify-content-center"
                onClick={handleFavorite}
                title={isFavorite ? "Remove from favorites" : "Save to favorites"}
                style={{
                  width: "42px",
                  height: "42px",
                  border: "1px solid #e9e9e9",
                  borderRadius: "8px",
                  backgroundColor: isFavorite ? "#fff0ed" : "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <i
                  className={isFavorite ? "fas fa-heart text-danger fz16" : "far fa-heart fz16"}
                  style={{ color: isFavorite ? "#eb6753" : "#6c757d" }}
                />
              </button>

              <button
                type="button"
                className="icon btn p-0 d-inline-flex align-items-center justify-content-center"
                onClick={handleShare}
                title="Share property"
                style={{
                  width: "42px",
                  height: "42px",
                  border: "1px solid #e9e9e9",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span className="flaticon-share-1 fz16" />
              </button>

              <button
                type="button"
                className="icon btn p-0 d-inline-flex align-items-center justify-content-center"
                onClick={handlePrint}
                title="Print property"
                style={{
                  width: "42px",
                  height: "42px",
                  border: "1px solid #e9e9e9",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span className="flaticon-printer fz16" />
              </button>
            </div>

            {/* Clean Price */}
            <h3 className="price mb-0 fw-bold">{formattedPrice}</h3>

            {/* Price per sqft */}
            {pricePerSqft && (
              <p className="text space fz15 text-muted mb-0">
                ₹{pricePerSqft}/sq ft
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;