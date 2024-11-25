import React from 'react';

interface SelectedLocaleCardProps {
  locale: string;
  onRemove: (locale: string) => void;
}

const SelectedLocaleCard: React.FC<SelectedLocaleCardProps> = ({ locale, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col relative">
      <span className="block text-gray-700 text-sm font-bold mb-2">Locale: {locale}</span>
      <button 
        onClick={() => onRemove(locale)}
        className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
      >
        ×
      </button>
    </div>
  );
};

export default SelectedLocaleCard; 