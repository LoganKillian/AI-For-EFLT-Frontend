import React, { useState } from 'react';
import WarningPopup from './WarningPopup'; // WarningPopup 

interface ComparisonSelectorProps {
  districts: string[];
  onCompare: (selected: string[]) => void;
}

const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({
  districts,
  onCompare,
}) => {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([null, null]);
  const [isWarningOpen, setIsWarningOpen] = useState(false); 
  const [warningMessage, setWarningMessage] = useState(''); 

  const handleSelect = (index: number, district: string) => {
    const updatedDistricts = [...selectedDistricts];
    updatedDistricts[index] = district;
    setSelectedDistricts(updatedDistricts);
  };

  const handleCompareClick = () => {
    const [districtA, districtB] = selectedDistricts;

   
    if (!districtA || !districtB) {
      setWarningMessage('Please select two districts.');
      setIsWarningOpen(true);
      return;
    }

    if (districtA === districtB) {
      setWarningMessage('You cannot compare the same district.');
      setIsWarningOpen(true);
      return;
    }

    
    onCompare(selectedDistricts);
  };

  const closeWarning = () => {
    setIsWarningOpen(false); 
    setWarningMessage(''); 
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Districts to Compare</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-2">District 1</label>
          <select
            onChange={(e) => handleSelect(0, e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">District 2</label>
          <select
            onChange={(e) => handleSelect(1, e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCompareClick}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Compare
      </button>

      {/* WarningPopup  */}
      <WarningPopup
        isOpen={isWarningOpen}
        onClose={closeWarning}
        onConfirm={closeWarning}
        message={warningMessage} 
      />
    </div>
  );
};

export default ComparisonSelector;
