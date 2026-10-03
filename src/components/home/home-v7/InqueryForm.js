'use client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import { toast } from 'react-hot-toast';

const InqueryForm = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([{ value: 'Apartments', label: 'Apartments' }]);
  const [personalTitle, setPersonalTitle] = useState('Mr');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSize, setMinSize] = useState('');

  useEffect(() => {
    setShowSelect(true);
  }, []);

  const inqueryType = [
    { value: 'Apartments', label: 'Apartments' },
    { value: 'Bungalow', label: 'Bungalow' },
    { value: 'Houses', label: 'Houses' },
    { value: 'Loft', label: 'Loft' },
    { value: 'Office', label: 'Office' },
    { value: 'Townhome', label: 'Townhome' },
    { value: 'Villa', label: 'Villa' },
  ];

  const personalRole = [
    { value: 'Mr', label: 'Mr.' },
    { value: 'Mrs', label: 'Mrs.' },
    { value: 'Miss', label: 'Miss.' },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected ? '#eb6753' : isHovered ? '#eb675312' : isFocused ? '#eb675312' : undefined,
    }),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      toast.error('Please enter your contact phone number.');
      return;
    }

    try {
      setLoading(true);
      const queryTypeString = selectedTypes?.map((t) => t.value).join(', ') || 'Inquiry';
      const messageContent = [
        `Title: ${personalTitle}`,
        `Property Types: ${queryTypeString}`,
        address ? `Preferred Location: ${address}` : null,
        maxPrice ? `Max Budget: ₹${maxPrice}` : null,
        minSize ? `Min Size: ${minSize} sq ft` : null,
      ]
        .filter(Boolean)
        .join(' | ');

      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        query_type: 'home_inquiry',
        quick_pick: queryTypeString,
        message: messageContent,
        agree_contact: true,
        source_page: 'homepage_inquiry_form',
      };

      const res = await apiService.post(`${API_URLS.PROPERTY_QUERY}`, payload);

      if (res?.data?.success || res?.status === 200 || res?.status === 201) {
        toast.success('Your inquiry has been submitted successfully! We will contact you soon.');
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setMaxPrice('');
        setMinSize('');
      } else {
        toast.error(res?.data?.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      toast.error(err?.response?.data?.message || 'Submission failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-style1 inquery_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb20">
            <label className="form-label fw600 dark-color">Inquiry Type</label>
            <div className="bootselect-multiselect">
              {showSelect && (
                <Select
                  value={selectedTypes}
                  onChange={(val) => setSelectedTypes(val)}
                  isMulti
                  options={inqueryType}
                  styles={customStyles}
                  className="text-start"
                  classNamePrefix="select"
                  isSearchable={false}
                  isClearable={false}
                />
              )}
            </div>
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-4">
          <div className="mb20">
            <label className="form-label fw600 dark-color">Title</label>
            <div className="bootselect-multiselect">
              {showSelect && (
                <Select
                  defaultValue={personalRole[0]}
                  onChange={(val) => setPersonalTitle(val?.value || 'Mr')}
                  options={personalRole}
                  styles={customStyles}
                  className="text-start"
                  classNamePrefix="select"
                  isSearchable={false}
                  isClearable={false}
                />
              )}
            </div>
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-8">
          <div className="mb20">
            <label className="form-label fw600 dark-color">Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-6">
          <div className="mb20">
            <label className="form-label fw600 dark-color">Phone Number *</label>
            <input
              type="tel"
              className="form-control"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-6">
          <div className="mb20">
            <label className="form-label fw600 dark-color">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="mb20">
            <label className="form-label fw600 dark-color">Preferred Location / City</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Bandra West, Mumbai"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-6">
          <div className="mb20">
            <label className="form-label fw600 dark-color">Max Budget (₹)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 50,00,000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-6">
          <div className="mb30">
            <label className="form-label fw600 dark-color">Min Size (Sq ft)</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 850"
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="d-grid">
          <button className="ud-btn btn-thm" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Inquiry'} <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default InqueryForm;
