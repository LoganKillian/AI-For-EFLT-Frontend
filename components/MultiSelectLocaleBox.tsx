import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MultiSelectLocaleBoxProps {
  locales: string[];
  onSelect: (locales: string[]) => void;
  selectedLocales: string[];
}

const MultiSelectLocaleBox: React.FC<MultiSelectLocaleBoxProps> = ({ 
  locales = [],
  onSelect, 
  selectedLocales 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleLocale = (locale: string) => {
    const updatedSelection = selectedLocales.includes(locale)
      ? selectedLocales.filter(l => l !== locale)
      : [...selectedLocales, locale];
    onSelect(updatedSelection);
  };

  const handleSelectAllToggle = () => {
    const allSelected = locales.length === selectedLocales.length;
    onSelect(allSelected ? [] : [...locales]);
  };

  const filteredLocales = locales.filter(locale =>
    locale.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="min-w-[300px] bg-white border border-gray-400 rounded shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-4 py-2">
          {selectedLocales.length === 0 ? (
            <span className="text-gray-500">Select locales...</span>
          ) : (
            <span>{selectedLocales.length} locales selected</span>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-400 rounded shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Search locales..."
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
                {locales.length === selectedLocales.length && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </div>
              Select All
            </div>
            
            {filteredLocales.map((locale) => (
              <div
                key={locale}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleLocale(locale);
                }}
              >
                <div className="w-5 h-5 border rounded mr-2 flex items-center justify-center">
                  {selectedLocales.includes(locale) && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                {locale}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectLocaleBox; 