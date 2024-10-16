import React, { useState } from 'react';

interface SelectFeatureBoxProps {
  features: string[];
  onSelect: (feature: string) => void;
}

const SelectFeatureBox: React.FC<SelectFeatureBoxProps> = ({ features, onSelect }) => {
  const [selectedFeature, setSelectedFeature] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFeature(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select 
      value={selectedFeature}
      onChange={handleChange}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Select a feature</option>
      {features.map((feature) => (
        <option key={feature} value={feature}>
          {feature}
        </option>
      ))}
    </select>
  );
};

export default SelectFeatureBox;