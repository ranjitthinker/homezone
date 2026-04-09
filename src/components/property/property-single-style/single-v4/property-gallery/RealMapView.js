import React from "react";

const RealMapView = ({ coordinates }) => {
  const lat = coordinates?.latitude ?? '30.3398';
  const lng = coordinates?.longitude ?? '76.3869';

  // ✅ Dynamic embed URL using real property coordinates
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <iframe
      className="h600 w-100"
      src={embedUrl}
      allowFullScreen
    />
  );
};
export default RealMapView;
