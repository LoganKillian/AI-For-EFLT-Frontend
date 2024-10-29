import React from 'react';

interface SelectFeatureBoxProps {
  features: string[];
  onSelect: (district: string) => void;
}

const SelectFeatureBox: React.FC<SelectFeatureBoxProps> = ({ features, onSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFeature = e.target.value;
    if (selectedFeature) {
      onSelect(selectedFeature);
    }
  };

  return (
    <select 
      onChange={handleChange}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Select a feature</option>
      {features.slice().sort((a, b) => a.localeCompare(b)).map((feature) => (
        <option key={feature} value={feature}>
          {feature}
        </option>
      ))}
    </select>
  );
};

export default SelectFeatureBox;