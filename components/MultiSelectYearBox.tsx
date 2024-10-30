import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MultiSelectYearBoxProps {
  years: (string | number)[];
  onSelect: (years: string[]) => void;
  selectedYears: string[];
}

const MultiSelectYearBox: React.FC<MultiSelectYearBoxProps> = ({ 
  years, 
  onSelect, 
  selectedYears 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Convert all years to strings for consistent handling
  const yearsAsStrings = years.map(year => year.toString());

  const handleToggleYear = (year: string) => {
    const updatedSelection = selectedYears.includes(year)
      ? selectedYears.filter(y => y !== year)
      : [...selectedYears, year];
    onSelect(updatedSelection);
  };

  const handleSelectAllToggle = () => {
    const allSelected = yearsAsStrings.length === selectedYears.length;
    onSelect(allSelected ? [] : [...yearsAsStrings]);
  };

  const filteredYears = yearsAsStrings.filter(year =>
    year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="min-w-[300px] bg-white border border-gray-400 rounded shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-4 py-2">
          {selectedYears.length === 0 ? (
            <span className="text-gray-500">Select years...</span>
          ) : (
            <span>{selectedYears.length} years selected</span>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-400 rounded shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Search years..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            <div
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectAllToggle();
              }}
            >
              <div className="w-5 h-5 border rounded mr-2 flex items-center justify-center">
                {yearsAsStrings.length === selectedYears.length && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </div>
              Select All
            </div>
            
            {filteredYears.map((year) => (
              <div
                key={year}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleYear(year);
                }}
              >
                <div className="w-5 h-5 border rounded mr-2 flex items-center justify-center">
                  {selectedYears.includes(year) && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                {year}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectYearBox;