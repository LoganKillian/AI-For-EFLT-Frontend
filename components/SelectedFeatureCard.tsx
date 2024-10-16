import React, { useState } from 'react';

interface SelectedFeatureCardProps {
  feature: string;
  onRemove: (feature: string) => void;
  onPercentageChange: (feature: string, percentage: number) => void;
}

const SelectedFeatureCard: React.FC<SelectedFeatureCardProps> = ({ feature, onRemove, onPercentageChange }) => {
  const [percentage, setPercentage] = useState('');

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPercentage(value);
    onPercentageChange(feature, parseFloat(value) || 0);
  };

  return (
    <div className="bg-white shadow-md rounded px-4 py-3 mb-4 flex flex-col relative">
      <span className="block text-gray-700 text-sm font-bold mb-2">{feature}</span>
      <div className="flex items-center">
        <input
          type="number"
          value={percentage}
          onChange={handlePercentageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          placeholder="Enter %"
        />
        <span>%</span>
      </div>
      <button 
        onClick={() => onRemove(feature)}
        className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
      >
        ×
      </button>
    </div>
  );
};

export default SelectedFeatureCard;