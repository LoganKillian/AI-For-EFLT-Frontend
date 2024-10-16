import React from 'react';

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onRefresh }) => {
  return (
    <button 
      onClick={onRefresh}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
    >
      Refresh Page
    </button>
  );
};

export default RefreshButton;