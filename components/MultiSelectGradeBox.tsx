import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MultiSelectGradeBoxProps {
  grades: (string | number)[];
  onSelect: (grades: string[]) => void;
  selectedGrades: string[];
}

const MultiSelectGradeBox: React.FC<MultiSelectGradeBoxProps> = ({ 
  grades, 
  onSelect, 
  selectedGrades 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const gradesAsStrings = grades.map(grade => grade.toString());

  const handleToggleGrade = (grade: string) => {
    const updatedSelection = selectedGrades.includes(grade)
      ? selectedGrades.filter(g => g !== grade)
      : [...selectedGrades, grade];
    onSelect(updatedSelection);
  };

  const handleSelectAllToggle = () => {
    const allSelected = grades.length === selectedGrades.length;
    onSelect(allSelected ? [] : [...gradesAsStrings]);
  };

  const filteredGrades = gradesAsStrings.filter(grade =>
    grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="min-w-[300px] bg-white border border-gray-400 rounded shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-4 py-2">
          {selectedGrades.length === 0 ? (
            <span className="text-gray-500">Select grades...</span>
          ) : (
            <span>{selectedGrades.length} grades selected</span>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-400 rounded shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Search grades..."
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
                {grades.length === selectedGrades.length && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </div>
              Select All
            </div>
            
            {filteredGrades.map((grade) => (
              <div
                key={grade}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleGrade(grade);
                }}
              >
                <div className="w-5 h-5 border rounded mr-2 flex items-center justify-center">
                  {selectedGrades.includes(grade) && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                {grade}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectGradeBox;