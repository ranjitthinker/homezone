import React from "react";

const PropertyFeaturesAminites = ({ amenities = [] }) => {
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const itemsPerColumn = Math.ceil(amenities.length / 3);
  const chunkedAmenities = chunkArray(amenities, itemsPerColumn);

  if (!amenities || amenities.length === 0) {
    return <p className="text-muted">No amenities available</p>;
  }

  return (
    <>
      {chunkedAmenities.map((column, columnIndex) => (
        <div key={columnIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            {column.map((amenity) => (
              <p key={amenity.id} className="text mb10">
                <i className={`${amenity.icon_class || 'ri-checkbox-circle-line'} fz20 align-middle pe-2`} />
                {amenity.name}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertyFeaturesAminites;