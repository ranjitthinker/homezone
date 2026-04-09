import ListingMap1 from "@/components/listing/map-style/ListingMap1";
import React from "react";

const Map = ({ property }) => {
  return (
    <div style={{ height: '600px' }}>
      <ListingMap1 property={property} />
    </div>
  );
};
export default Map;
