'use client';

import React, { useState, useEffect } from 'react';
import SingleReview from './SingleReview';
import { useParams } from 'next/navigation';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import toast from 'react-hot-toast';

const AllReviews = () => {
  const params = useParams();
  const propertyId = params?.slug || params?.id; // safe fallback

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(`${API_URLS.PROPERTY_REVIEW}/${propertyId}`);

      if (response.data.success) {
        setReviews(response.data.data);
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <i className="fas fa-star fz12 pe-2" />
            5.0 · {reviews.length} reviews
          </div>

          {loading ? (
            <div className="col-lg-12">
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="col-lg-12">
              <div className="text-center py-4">
                <i className="fas fa-comment-slash fa-3x text-muted mb-3"></i>
                <p className="text-muted">No reviews yet. Be the first to review this property!</p>
              </div>
            </div>
          ) : (
            reviews.map((review, index) => (
              <SingleReview key={index} review={review} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
