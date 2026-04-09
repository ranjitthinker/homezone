'use client'
import { useState, useEffect } from 'react';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';

const Amenities = ({ filterFunctions }) => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(`${API_URLS.AMENITIES}`);
        if (response.data.success) {
          setAmenities(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching amenities:', err);
        setError('Failed to load amenities');
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  if (loading) {
    return (
      <div className="col-12">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading amenities...</span>
          </div>
          <p className="mt-3 text-muted">Loading amenities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-12">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  }

  if (amenities.length === 0) {
    return (
      <div className="col-12">
        <div className="text-center py-4">
          <p className="text-muted">No amenities available</p>
        </div>
      </div>
    );
  }

 return (
  <div className="row g-3">
    {amenities.map((amenity, index) => (
      <div
        className="col-12 col-sm-6 col-md-4 col-lg-4"
        key={amenity.id || index}
      >
        <label className=" rounded p-2 d-flex align-items-center justify-content-start gap-2 cursor-pointer">
          
          {/* Checkbox */}
          <input
            type="checkbox"
            className="form-check-input m-0"
            checked={
              filterFunctions?.categories?.includes(amenity.name) || false
            }
            onChange={() =>
              filterFunctions?.handlecategories?.(amenity.name)
            }
          />

          {/* Icon */}
          {amenity.icon_class && (
            <i className={`${amenity.icon_class}`} />
          )}

          {/* Text */}
          <span className="small fw-medium text-dark">
            {amenity.name}
          </span>
        </label>
      </div>
    ))}
  </div>
);
};

export default Amenities;