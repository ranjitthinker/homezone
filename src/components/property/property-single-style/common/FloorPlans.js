"use client";

import React, { useState } from "react";
import Image from "next/image";

const FloorPlans = ({ floorPlans = [] }) => {
  
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const [viewModes, setViewModes] = useState({});

  if (!floorPlans || floorPlans.length === 0) {
    return <p className="text-muted">No floor plans available</p>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleViewMode = (floorPlanId, mode) => {
    setViewModes(prev => ({
      ...prev,
      [floorPlanId]: mode
    }));
  };

  const getCurrentImage = (floorPlan) => {
    const currentMode = viewModes[floorPlan.id] || '2d';
    
    const image = currentMode === '2d' ? floorPlan['2D_image'] : floorPlan['3D_image'];
    
    if (image && image !== null) {
      return image.startsWith('http') ? image : `/storage/${image}`;
    }
    
    const fallbackMode = currentMode === '2d' ? '3d' : '2d';
    const fallbackImage = fallbackMode === '2d' ? floorPlan['2D_image'] : floorPlan['3D_image'];
    
    if (fallbackImage && fallbackImage !== null) {
      setViewModes(prev => ({
        ...prev,
        [floorPlan.id]: fallbackMode
      }));
      return fallbackImage.startsWith('http') ? fallbackImage : `/storage/${fallbackImage}`;
    }
    
    return "/images/listings/listing-single-1.png";
  };

  const has2D = (floorPlan) => floorPlan['2D_image'] !== null && floorPlan['2D_image'] !== undefined;
  const has3D = (floorPlan) => floorPlan['3D_image'] !== null && floorPlan['3D_image'] !== undefined;

  return (
    <div>
      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-4" id="floorPlanTabs" role="tablist">
        {floorPlans.map((floorPlan, index) => (
          <li className="nav-item" role="presentation" key={floorPlan.id}>
            <button
              className={`nav-link ${activeFloorPlan === index ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveFloorPlan(index)}
              role="tab"
              aria-selected={activeFloorPlan === index}
            >
              {floorPlan.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="floorPlanTabContent">
        {floorPlans.map((floorPlan, index) => (
          <div
            className={`tab-pane fade ${activeFloorPlan === index ? 'show active' : ''}`}
            role="tabpanel"
            key={floorPlan.id}
          >
            {/* Floor Plan Details */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <h4 className="mb-2 mb-md-0">{floorPlan.title}</h4>
                  <div className="d-flex flex-wrap align-items-center">
                    {floorPlan.size && (
                      <span className="me-3">
                        <span className="fw600">Size: </span>
                        <span className="text">{floorPlan.size}</span>
                      </span>
                    )}
                    {floorPlan.bedrooms && (
                      <span className="me-3">
                        <span className="fw600">Bedrooms: </span>
                        <span className="text">{floorPlan.bedrooms}</span>
                      </span>
                    )}
                    {floorPlan.bathrooms && (
                      <span className="me-3">
                        <span className="fw600">Bathrooms: </span>
                        <span className="text">{floorPlan.bathrooms}</span>
                      </span>
                    )}
                    {floorPlan.price && (
                      <span>
                        <span className="fw600">Price: </span>
                        <span className="text">{formatPrice(floorPlan.price)}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2D/3D Toggle Buttons */}
            {(has2D(floorPlan) || has3D(floorPlan)) && (
              <div className="btn-group mb-3" role="group">
                {has2D(floorPlan) && (
                  <button
                    type="button"
                    className={`btn ${(viewModes[floorPlan.id] || '2d') === '2d' ? '' : 'btn-outline-secondary'}`}
                    style={{
                      backgroundColor: (viewModes[floorPlan.id] || '2d') === '2d' ? '#cf933b' : 'transparent',
                      color: (viewModes[floorPlan.id] || '2d') === '2d' ? '#ffffff' : '#cf933b',
                      borderColor: '#cf933b'
                    }}
                    onClick={() => toggleViewMode(floorPlan.id, '2d')}
                  >
                    2D View
                  </button>
                )}
                {has3D(floorPlan) && (
                  <button
                    type="button"
                    className={`btn ${(viewModes[floorPlan.id] || '2d') === '3d' ? '' : 'btn-outline-secondary'}`}
                    style={{
                      backgroundColor: (viewModes[floorPlan.id] || '2d') === '3d' ? '#cf933b' : 'transparent',
                      color: (viewModes[floorPlan.id] || '2d') === '3d' ? '#ffffff' : '#cf933b',
                      borderColor: '#cf933b'
                    }}
                    onClick={() => toggleViewMode(floorPlan.id, '3d')}
                  >
                    3D View
                  </button>
                )}
              </div>
            )}

            {/* Floor Plan Image */}
            <div className="text-center">
              <Image
                width={736}
                height={544}
                className="w-100 h-100 cover"
                src={getCurrentImage(floorPlan)}
                alt={`${floorPlan.title} - ${viewModes[floorPlan.id] || '2d'} view`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorPlans;