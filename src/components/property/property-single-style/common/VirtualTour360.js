import Image from "next/image";
import React from "react";

const VirtualTour360 = ({ property }) => {
  // Filter images that could be used for virtual tour
  // You might want to add a specific field for virtual tour images
  const virtualTourImages = property?.images?.filter(
    (img) => img.type === "virtual_tour" || img.type === "image"
  ) || [];

  // Get primary image or first image as fallback
  const primaryImage = virtualTourImages.find((img) => img.is_primary) || 
                       virtualTourImages[0];

  if (!primaryImage) {
    return (
      <div className="col-md-12">
        <div className="p-5 text-center bg-light bdrs12">
          <p className="text-muted">No virtual tour available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="col-md-12">
        <Image
          width={736}
          height={373}
          src={primaryImage.file_path}
          alt={`Virtual tour - ${property?.title || "Property"}`}
          className="w-100 bdrs12 h-100 cover"
          priority
        />
      </div>
      
      {/* Optional: Display additional virtual tour images */}
      {virtualTourImages.length > 1 && (
        <div className="col-md-12 mt-3">
          <div className="row g-3">
            {virtualTourImages.slice(1, 4).map((image) => (
              <div key={image.id} className="col-md-4">
                <Image
                  width={240}
                  height={180}
                  src={image.file_path}
                  alt={`Virtual tour ${image.id}`}
                  className="w-100 bdrs12 h-100 cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualTour360;