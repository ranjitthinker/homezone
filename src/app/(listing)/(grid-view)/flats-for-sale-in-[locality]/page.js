import React, { Suspense } from "react";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";
import Link from "next/link";

// Format locality slug into clean title: e.g. "urban-estate-patiala" -> "Urban Estate, Patiala"
function formatLocalityTitle(slug = "") {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Patiala", ", Patiala");
}

export async function generateMetadata(props) {
  const params = await props.params;
  const rawLocality = params?.locality || "patiala";
  const localityTitle = formatLocalityTitle(rawLocality);

  return {
    title: `Flats & Properties for Sale in ${localityTitle} || Home Zone`,
    description: `Browse 100% verified flats, apartments, luxury villas, and plots for sale in ${localityTitle}. Direct prices, 0 broker spam, instant WhatsApp connect.`,
    keywords: `flats in ${localityTitle}, properties for sale in ${localityTitle}, real estate ${localityTitle}, apartments ${localityTitle}, buy flat in ${localityTitle}`,
    alternates: {
      canonical: `https://www.homzzone.com/flats-for-sale-in-${rawLocality}`,
    },
    openGraph: {
      title: `Verified Flats & Properties in ${localityTitle} - Home Zone`,
      description: `Explore genuine verified residential and commercial properties in ${localityTitle} with zero spam.`,
      url: `https://www.homzzone.com/flats-for-sale-in-${rawLocality}`,
      siteName: "Home Zone Real Estate",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function LocalSeoPropertyPage(props) {
  const params = await props.params;
  const rawLocality = params?.locality || "patiala";
  const localityTitle = formatLocalityTitle(rawLocality);

  // Local SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Properties and Flats for Sale in ${localityTitle}`,
    "description": `Verified real estate listings in ${localityTitle}`,
    "url": `https://www.homzzone.com/flats-for-sale-in-${rawLocality}`,
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Home Zone Real Estate",
      "telephone": "+91-9855515783",
      "url": "https://www.homzzone.com"
    }
  };

  const popularLocalities = [
    { label: "Urban Estate", slug: "urban-estate-patiala" },
    { label: "Model Town", slug: "model-town-patiala" },
    { label: "Leela Bhawan", slug: "leela-bhawan-patiala" },
    { label: "Bahadurgarh", slug: "bahadurgarh-patiala" },
    { label: "Sirhind Road", slug: "sirhind-road-patiala" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* SEO Hero Header */}
      <section className="bgc-f7 pt100 pb20 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-danger text-white px-3 py-1 mb-2 fw600" style={{ borderRadius: "20px", fontSize: "12px" }}>
                HYPERLOCAL VERIFIED LISTINGS
              </span>
              <h1 className="title fz30 fw700 mb-2">
                Properties &amp; Flats for Sale in {localityTitle}
              </h1>
              <p className="text-muted fz14 mb-0">
                Explore handpicked homes, apartments, and commercial properties verified by Home Zone. Get direct site visits and instant WhatsApp quotes.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <a
                href={`https://wa.me/919855515783?text=${encodeURIComponent(
                  `Hi Home Zone team, I am searching for properties/flats in ${localityTitle}. Please share available options.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ud-btn btn-thm text-white py-2 px-3"
                style={{ backgroundColor: "#25D366", borderColor: "#25D366", borderRadius: "30px", fontSize: "13px" }}
              >
                <i className="fab fa-whatsapp me-2" /> Inquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Locality Quick Pills */}
          <div className="d-flex flex-wrap gap-2 mt-3 pt-2 border-top">
            <span className="fz13 fw600 text-muted align-self-center me-1">Nearby Localities:</span>
            {popularLocalities.map((loc) => (
              <Link
                key={loc.slug}
                href={`/flats-for-sale-in-${loc.slug}`}
                className={`badge border px-3 py-2 text-decoration-none ${
                  rawLocality === loc.slug ? "bg-dark text-white" : "bg-white text-dark"
                }`}
                style={{ borderRadius: "20px", fontSize: "12px" }}
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Property Filtering */}
      <Suspense fallback={<div className="text-center py-5">Loading properties...</div>}>
        <ProperteyFiltering />
      </Suspense>

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
}
