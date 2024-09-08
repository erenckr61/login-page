// components/HorizontalBar.js
import React from 'react';

const HorizontalBar = ({ label, value, maxValue = 100 }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-green-500 h-full rounded-full"
        ></div>
      </div>
    </div>
  );
};

export default HorizontalBar;
