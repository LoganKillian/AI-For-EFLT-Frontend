import React, { useState } from 'react';

interface LoadModelButtonProps {
  savedModels: string[];
  onLoad: (modelName: string) => void;
  onDelete: (modelName: string) => void;
  onCompare: (model1: string, model2: string) => void; 
}

const LoadModelButton: React.FC<LoadModelButtonProps> = ({ savedModels, onLoad, onDelete, onCompare }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedModel1, setSelectedModel1] = useState('');
  const [selectedModel2, setSelectedModel2] = useState('');
  const [isComparing, setIsComparing] = useState(false); 

  return (
    <>
      <button 
        onClick={() => setShowPopup(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Load Model
      </button>

      {showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {isComparing ? "Select Models to Compare" : "Load Model"}
                    </h3>
                    <div className="mt-2">
                      {isComparing ? (
                        
                        <div className="space-y-4">
                          <select 
                            value={selectedModel1} 
                            onChange={(e) => setSelectedModel1(e.target.value)} 
                            className="w-full border border-gray-300 p-2 rounded"
                          >
                            <option value="">Select Model 1</option>
                            {savedModels.map((model) => (
                              <option key={model} value={model}>{model}</option>
                            ))}
                          </select>
                          <select 
                            value={selectedModel2} 
                            onChange={(e) => setSelectedModel2(e.target.value)} 
                            className="w-full border border-gray-300 p-2 rounded"
                          >
                            <option value="">Select Model 2</option>
                            {savedModels.map((model) => (
                              <option key={model} value={model}>{model}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        
                        savedModels.map((model) => (
                          <div key={model} className="flex justify-between items-center mb-2">
                            <button
                              onClick={() => {
                                onLoad(model);
                                setShowPopup(false);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {model}
                            </button>
                            <button
                              onClick={() => onDelete(model)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {isComparing ? (
                  
                  <button 
                    onClick={() => {
                      onCompare(selectedModel1, selectedModel2);
                      setShowPopup(false);
                      setSelectedModel1('');
                      setSelectedModel2('');
                      setIsComparing(false);
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    disabled={!selectedModel1 || !selectedModel2}
                  >
                    Compare
                  </button>
                ) : (
                  
                  <button 
                    onClick={() => setIsComparing(true)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Compare Models
                  </button>
                )}
                <button 
                  onClick={() => {
                    setShowPopup(false);
                    setIsComparing(false);
                    setSelectedModel1('');
                    setSelectedModel2('');
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadModelButton;
