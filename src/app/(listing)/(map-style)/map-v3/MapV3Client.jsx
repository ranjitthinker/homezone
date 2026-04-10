'use client';

import dynamic from "next/dynamic";

// 🔥 THIS is your problematic component
const PropertyFiltering = dynamic(
  () => import("@/components/listing/map-style/map-v3/PropertyFilteringMapFour"),
  { ssr: false }
);

export default function MapV3Client() {
  return <PropertyFiltering />;
}