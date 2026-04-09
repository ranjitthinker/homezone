'use client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'next/navigation';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import toast from 'react-hot-toast';

const ReviewBoxForm = () => {
  const propertyId = useParams().id;

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(null);

  const inqueryType = [
    { value: '5', label: 'Five Star' },
    { value: '4', label: 'Four Star' },
    { value: '3', label: 'Three Star' },
    { value: '2', label: 'Two Star' },
    { value: '1', label: 'One Star' },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? '#eb6753' : isFocused ? '#eb675312' : undefined,
    }),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rating) {
      toast.error('Please select rating');
      return;
    }

    setLoading(true);

    const formData = new FormData(event.target);

    const reviewData = {
      email: formData.get('email'),
      name: formData.get('name'), // Extract name from email
      title: formData.get('title'),
      rating: rating.value, // ✅ FIXED
      review: formData.get('review'),
    };

    const toastId = toast.loading('Submitting review...');

    try {
      const response = await apiService.post(`${API_URLS.PROPERTY_REVIEW}/${propertyId}/store`, reviewData);

      if (response.data.success) {
        toast.success('Review submitted successfully!', { id: toastId });
        event.target.reset();
        setRating(null);
      } else {
        toast.error(response.data.message || 'Something went wrong', {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error('Server error. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const [showSelect, setShowSelect] = useState(false);
  useEffect(() => {
    setShowSelect(true);
  }, []);

  return (
    <form className="comments_form mt30" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-4">
            <label>Name</label>
            <input type="text" name="name" className="form-control" required />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-4">
            <label>Email</label>
            <input type="email" name="email" className="form-control" required />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-4">
            <label>Title</label>
            <input type="text" name="title" className="form-control" required />
          </div>
        </div>

        <div className="col-md-6">
          <label>Rating</label>
          {showSelect && (
            <Select
              value={rating}
              onChange={setRating} // ✅ FIXED
              options={inqueryType}
              styles={customStyles}
            />
          )}
        </div>

        <div className="col-md-12">
          <div className="mb-4">
            <label>Review</label>
            <textarea name="review" rows={6} className="form-control" required />
          </div>

          <button type="submit" className="ud-btn btn-white2" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewBoxForm;
