"use client";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";

const option = {
  zoomControl: true,
  disableDefaultUI: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ],
  scrollwheel: true,
};
const containerStyle = {
  width: "100%",
  height: "100%",
};

const FALLBACK = '/images/listings/listing-single-slide1.jpg';
const DEFAULT_CENTER = { lat: 30.3398, lng: 76.3869 };

export default function ListingMap1({ properties = [] }) {
  const [getLocation, setLocation] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // ✅ Center on first property with coordinates
  const center = useMemo(() => {
    const first = properties.find(p => p.coordinates?.latitude);
    return first
      ? { lat: parseFloat(first.coordinates.latitude), lng: parseFloat(first.coordinates.longitude) }
      : DEFAULT_CENTER;
  }, [properties]);

  // ✅ Normalize each property for the map
  const markers = useMemo(() =>
    properties
      .filter(p => p.coordinates?.latitude && p.coordinates?.longitude)
      .map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        lat: parseFloat(p.coordinates.latitude),
        lng: parseFloat(p.coordinates.longitude),
        price: `₹${Number(p.price).toLocaleString('en-IN')}`,
        address: p.location?.address || 'N/A',
        forRent: p.listed_in === 'rent',
        bed: p.bedrooms ?? 0,
        bath: p.bathrooms ?? 0,
        sqft: p.size_ft ?? 0,
        image: p.image || FALLBACK,
      })),
  [properties]);

  return (
    <>
      {!isLoaded ? <p>Loading map...</p> : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={properties.length === 1 ? 14 : 6}
          options={option}>

          {/* ✅ All property markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setLocation(marker)}
            />
          ))}

          {/* ✅ Info window on click */}
          {getLocation && (
            <InfoWindow
              position={{ lat: getLocation.lat, lng: getLocation.lng }}
              onCloseClick={() => setLocation(null)}>
              <div style={{ width: "220px" }}>
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image
                      width={220}
                      height={140}
                      className="w-100 cover"
                      style={{ height: "140px", objectFit: "cover" }}
                      src={getLocation.image}
                      alt={getLocation.title}
                    />
                    <div className="list-price">
                      {getLocation.price} / <span>mo</span>
                    </div>
                  </div>
                  <div className="list-content p-2">
                    <h6 className="list-title mb-1" style={{ fontSize: "13px" }}>
                      <Link href={`/property/${getLocation.slug}`}>
                        {getLocation.title}
                      </Link>
                    </h6>
                    <p className="list-text mb-1" style={{ fontSize: "11px" }}>
                      {getLocation.address}
                    </p>
                    <div className="list-meta d-flex align-items-center" style={{ fontSize: "11px" }}>
                      <a href="#" className="me-2">
                        <span className="flaticon-bed" /> {getLocation.bed} bed
                      </a>
                      <a href="#" className="me-2">
                        <span className="flaticon-shower" /> {getLocation.bath} bath
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" /> {getLocation.sqft} sqft
                      </a>
                    </div>
                    <hr className="mt-1 mb-1" />
                    <span className="for-what" style={{ fontSize: "11px" }}>
                      For {getLocation.forRent ? 'Rent' : 'Sale'}
                    </span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}
