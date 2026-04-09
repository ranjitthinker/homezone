"use client";
import { useState } from "react";
import Image from "next/image";
import GalleryWithOptions from "./GalleryWithOptions";

const PropertyGallery = ({ property }) => {
  const [showGalleryWithOptions, setShowGalleryWithOptions] = useState(false);
  
  const handleImageClick = () => {
    setShowGalleryWithOptions(true);
  };

  // Get all images from gallery groups for thumbnail display
  const getAllGalleryImages = () => {
    if (!property?.media?.gallery_groups) return [];
    
    const allImages = [];
    property.media.gallery_groups.forEach(group => {
      if (group.images && Array.isArray(group.images)) {
        group.images.forEach(imageUrl => {
          allImages.push({
            src: imageUrl,
            alt: `${group.title} image`
          });
        });
      }
    });
    return allImages;
  };

  const galleryImages = getAllGalleryImages();
  const featuredImage = property?.media?.featured_image?.file_path || '/images/listings/listing-single-1.jpg';
  
  return (
    <>
      {showGalleryWithOptions ? (
        <GalleryWithOptions 
          property={property} 
          onClose={() => setShowGalleryWithOptions(false)} 
        />
      ) : (
        <div className="row">
          <div className="col-sm-6">
            <div className="sp-img-content mb15-md">
              <div className="popup-img preview-img-1 sp-img">
                <Image
                  src={featuredImage}
                  width={591}
                  height={558}
                  onClick={handleImageClick}
                  alt={property?.title || "Property image"}
                  role="button"
                  className="w-100 h-100 cover cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-sm-6">
            <div className="row">
              {galleryImages.slice(0, 4).map((image, index) => (
                <div className="col-6 ps-sm-0" key={index}>
                  <div className="sp-img-content">
                    <div
                      className={`popup-img preview-img-${index + 2} sp-img mb10`}
                      style={{ position: 'relative' }}
                    >
                      <Image
                        width={270}
                        height={250}
                        className="w-100 h-100 cover cursor-pointer"
                        onClick={handleImageClick}
                        role="button"
                        src={image.src}
                        alt={image.alt}
                      />
                      {index === 2 && galleryImages.length > 4 && (
                        <div 
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            borderRadius: '8px'
                          }}
                        >
                          +{galleryImages.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
