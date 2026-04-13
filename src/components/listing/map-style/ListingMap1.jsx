"use client";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const FALLBACK = '/images/listings/listing-single-slide1.jpg';
const DEFAULT_CENTER = [30.3398, 76.3869];

// ✅ Fix Leaflet icon issue
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};


const createPriceIcon = () =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        background: #cf973c;
        width: 45px;
        height: 45px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 18px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        <svg width="18" height="18" fill="black" viewBox="0 0 24 24">
          <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3z"/>
        </svg>
      </div>
    `,
    iconAnchor: [19, 38],
  });


// ✅ Custom price marker
// const createPriceIcon = (price) =>
//   L.divIcon({
//     className: "",
//     html: `
//       <div style="
//         background: #EB6753;
//         color: white;
//         padding: 4px 10px;
//         border-radius: 20px;
//         font-size: 12px;
//         font-weight: 700;
//         white-space: nowrap;
//         box-shadow: 0 2px 8px rgba(235,103,83,0.4);
//         border: 2px solid white;
//       ">${price}</div>
//     `,
//     iconAnchor: [40, 16],
//   });

// ✅ Recenter when data changes
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// ✅ NEW: Zoom on marker click
const ZoomToMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, {
        duration: 1.2,
      });
    }
  }, [position, map]);

  return null;
};

export default function ListingMap1({ properties = [] }) {
  console.log(properties);
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

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

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: 220px !important;
        }
        .leaflet-popup-close-button {
          top: 6px !important;
          right: 8px !important;
          color: #fff !important;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <RecenterMap center={center} zoom={zoom} />
        <ZoomToMarker position={selectedPosition} />

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={createPriceIcon(marker.price)}
            eventHandlers={{
              click: () => {
                setActiveId(marker.id);
                setSelectedPosition([marker.lat, marker.lng]); // 🔥 zoom trigger
              },
            }}
          >
            <Popup onClose={() => setActiveId(null)}>
              <div style={{ width: '220px' }}>
                <div style={{ position: 'relative' }}>
                  <Image
                    width={220}
                    height={130}
                    src={marker.image}
                    alt={marker.title}
                    style={{
                      width: '100%',
                      height: '130px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 8,
                    left: 10,
                    background: '#EB6753',
                    color: '#fff',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}>
                    {marker.price} 
                  </div>
                </div>

                <div style={{ padding: '12px' }}>
                  <h6 style={{ fontSize: '13px', fontWeight: 700 }}>
                    <Link href={`/property/${marker.slug}`}>
                      {marker.title}
                    </Link>
                  </h6>

                  <p style={{ fontSize: '11px', color: '#888' }}>
                    {marker.address}
                  </p>

                  <div style={{ fontSize: '11px' }}>
                    🛏 {marker.bed} | 🚿 {marker.bath} | 📐 {marker.sqft}
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