import React from 'react';

interface SelectedGradeCardProps {
  grade: string;
  onRemove: (grade: string) => void;
}

const SelectedGradeCard: React.FC<SelectedGradeCardProps> = ({ grade, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col relative">
      <span className="block text-gray-700 text-sm font-bold mb-2">Grade: {grade}</span>
      <button 
        onClick={() => onRemove(grade)}
        className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
      >
        ×
      </button>
    </div>
  );
};

export default SelectedGradeCard;