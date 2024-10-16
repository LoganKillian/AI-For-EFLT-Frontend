import React, { useState } from 'react';

interface SelectDistrictBoxProps {
  districts: string[];
  onSelect: (district: string) => void;
}

const SelectDistrictBox: React.FC<SelectDistrictBoxProps> = ({ districts, onSelect }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select 
      value={selectedDistrict}
      onChange={handleChange}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Select a district</option>
      {districts.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </select>
  );
};

export default SelectDistrictBox;