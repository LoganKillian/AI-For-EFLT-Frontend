import React from 'react';

interface SelectDistrictBoxProps {
  districts: string[];
  onSelect: (district: string) => void;
}

const SelectDistrictBox: React.FC<SelectDistrictBoxProps> = ({ districts, onSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = e.target.value;
    if (selectedDistrict) {
      onSelect(selectedDistrict);
    }
  };

  return (
    <select 
      onChange={handleChange}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Select a district</option>
      {districts.slice().sort((a, b) => a.localeCompare(b)).map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </select>
  );
};

export default SelectDistrictBox;