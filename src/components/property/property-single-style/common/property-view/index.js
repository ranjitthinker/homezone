'use client';

import React, { useEffect, useState } from 'react';
import WeeklyLineChart from './WeeklyLineChart';
import apiService from '@/utils/api/apiService';
import { API_URLS } from '@/utils/api/apiUrls';
import { useParams } from 'next/navigation';

const PropertyViews = () => {
  const { slug } = useParams().id;
   // Debugging log

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await apiService.get(`${API_URLS.PROPERTY}/${slug}`);

        if (res?.status) {
          const trends = res?.data?.price_trends || [];

          // Convert API data → chart format
          const formatted = trends.map((item) => ({
            name: item.month,
            value: Number(item.price),
          }));

          setChartData(formatted);
        }
      } catch (error) {
        
      }
    };

    if (slug) fetchProperty();
  }, [slug]);

  return (
    <div className="col-md-12">
      <div className="navtab-style1">
        <div className="d-sm-flex align-items-center justify-content-between">
          <h4 className="title fz17 mb20">Property Views (Weekly)</h4>
        </div>

        <div style={{ height: '500px', width: '100%' }}>
          <WeeklyLineChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default PropertyViews;
