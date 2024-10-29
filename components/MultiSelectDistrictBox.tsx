import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MultiSelectDistrictBoxProps {
  districts: string[];
  onSelect: (districts: string[]) => void;
  selectedDistricts: string[];
}

const MultiSelectDistrictBox: React.FC<MultiSelectDistrictBoxProps> = ({ 
  districts, 
  onSelect, 
  selectedDistricts 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle district selection or select all based on current state
  const handleToggleDistrict = (district: string) => {
    const updatedSelection = selectedDistricts.includes(district)
      ? selectedDistricts.filter(d => d !== district)
      : [...selectedDistricts, district];
    onSelect(updatedSelection);
  };

  // Handle "Select All" functionality
  const handleSelectAllToggle = () => {
    const allSelected = districts.length === selectedDistricts.length;
    onSelect(allSelected ? [] : [...districts]);
  };

  const filteredDistricts = districts.filter(district =>
    district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="min-w-[300px] bg-white border border-gray-400 rounded shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-4 py-2">
          {selectedDistricts.length === 0 ? (
            <span className="text-gray-500">Select districts...</span>
          ) : (
            <span>{selectedDistricts.length} districts selected</span>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-400 rounded shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Search districts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {/* "Select All" Option */}
            <div
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectAllToggle();
              }}
            >
              <div className="w-5 h-5 border rounded mr-2 flex items-center justify-center">
                {districts.length === selectedDistricts.length && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </div>
              Select All
            </div>
            
            {/* District List */}
            {filteredDistricts.map((district) => (
              <div
                key={district}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleDistrict(district);
                }}
              >
                <div className="w-5 h-5 border rounded mr-2 flex items-center justify-center">
                  {selectedDistricts.includes(district) && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                {district}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDistrictBox;
