'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const WeeklyLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />

        <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeeklyLineChart;
