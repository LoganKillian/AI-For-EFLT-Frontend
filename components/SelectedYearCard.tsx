import React from 'react';

interface SelectedYearCardProps {
  year: string;
  onRemove: (year: string) => void;
}

const SelectedYearCard: React.FC<SelectedYearCardProps> = ({ year, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col relative">
      <span className="block text-gray-700 text-sm font-bold mb-2">Year: {year}</span>
      <button 
        onClick={() => onRemove(year)}
        className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
      >
        ×
      </button>
    </div>
  );
};

export default SelectedYearCard;