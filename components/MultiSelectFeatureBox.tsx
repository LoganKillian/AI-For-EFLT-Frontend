import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface MultiSelectFeatureBoxProps {
  features: string[];
  onSelect: (features: string[]) => void;
  selectedFeatures: string[];
}

const MultiSelectFeatureBox: React.FC<MultiSelectFeatureBoxProps> = ({ 
  features, 
  onSelect, 
  selectedFeatures 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleFeature = (feature: string) => {
    const updatedSelection = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    onSelect(updatedSelection);
  };

  const filteredFeatures = features.filter(feature =>
    feature.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="min-w-[300px] bg-white border border-gray-400 rounded shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-4 py-2">
          {selectedFeatures.length === 0 ? (
            <span className="text-gray-500">Select features...</span>
          ) : (
            <span>{selectedFeatures.length} features selected</span>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-400 rounded shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFeature(feature);
                }}
              >
                <div className="w-5 h-5 border rounded mr-2 flex items-center justify-center">
                  {selectedFeatures.includes(feature) && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectFeatureBox;