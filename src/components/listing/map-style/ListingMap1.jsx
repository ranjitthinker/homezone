"use client";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const FALLBACK = '/images/listings/listing-single-slide1.jpg';
const DEFAULT_CENTER = [30.3398, 76.3869];

// ✅ Fix Leaflet default icon broken in Next.js
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

// ✅ Custom price marker icon
const createPriceIcon = (price) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        background: #EB6753;
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(235,103,83,0.4);
        border: 2px solid white;
      ">${price}</div>
    `,
    iconAnchor: [40, 16],
  });

// ✅ Recenter map when properties change
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export default function ListingMap1({ properties = [] }) {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fixLeafletIcon();
    setMounted(true);
  }, []);

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

  const center = useMemo(() => {
    const first = markers[0];
    return first ? [first.lat, first.lng] : DEFAULT_CENTER;
  }, [markers]);

  const zoom = markers.length === 1 ? 14 : 6;

  if (!mounted) return (
    <div style={{ width: '100%', height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Loading map...</p>
    </div>
  );

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
          border: none !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: 220px !important;
        }
        .leaflet-popup-tip { background: #fff !important; }
        .leaflet-popup-close-button {
          top: 6px !important;
          right: 8px !important;
          color: #fff !important;
          font-size: 18px !important;
          z-index: 10;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}>

        <RecenterMap center={center} zoom={zoom} />

        {/* ✅ OpenStreetMap tiles — free, no API key needed */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={createPriceIcon(marker.price)}
            eventHandlers={{ click: () => setActiveId(marker.id) }}>

            <Popup onClose={() => setActiveId(null)}>
              <div style={{ width: '220px' }}>
                {/* Property image */}
                <div style={{ position: 'relative' }}>
                  <Image
                    width={220}
                    height={130}
                    src={marker.image}
                    alt={marker.title}
                    style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 8, left: 10,
                    background: '#EB6753', color: '#fff',
                    padding: '3px 10px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: 700,
                  }}>
                    {marker.price} / <span>mo</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '12px' }}>
                  <h6 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                    <Link href={`/property/${marker.slug}`} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                      {marker.title}
                    </Link>
                  </h6>
                  <p style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                    {marker.address}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#555' }}>
                    <span>🛏 {marker.bed} bed</span>
                    <span>🚿 {marker.bath} bath</span>
                    <span>📐 {marker.sqft} sqft</span>
                  </div>
                  <hr style={{ margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600,
                      color: marker.forRent ? '#28a745' : '#EB6753',
                    }}>
                      For {marker.forRent ? 'Rent' : 'Sale'}
                    </span>
                    <Link href={`/property/${marker.slug}`} style={{
                      fontSize: '11px', color: '#EB6753',
                      fontWeight: 600, textDecoration: 'none',
                    }}>
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}