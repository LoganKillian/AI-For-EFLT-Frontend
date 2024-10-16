import React, { useState } from 'react';

interface LassoBoxProps {
  onConfirm: (tolerance: number, alpha: number) => void;
  onWarning: (tolerance: number, alpha: number) => void;
}

const LassoBox: React.FC<LassoBoxProps> = ({ onConfirm, onWarning }) => {
  const [tolerance, setTolerance] = useState('');
  const [alpha, setAlpha] = useState('');

  const handleConfirm = () => {
    const toleranceValue = parseFloat(tolerance);
    const alphaValue = parseFloat(alpha);
    
    if (isValidInput(toleranceValue) && isValidInput(alphaValue)) {
      onConfirm(toleranceValue, alphaValue);
    } else {
      onWarning(toleranceValue, alphaValue);
    }
  };

  const isValidInput = (value: number) => {
    return value >= 0.0001 && value <= 1.0;
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Identify feature importance with LassoCV</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tolerance">
          Tolerance
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tolerance"
          type="number"
          step="any"
          placeholder="Enter tolerance value"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
        />
        <p className="text-sm text-gray-600 mt-1">
          Tolerance affects the precision of the LassoCV model. Lower values increase precision but may increase computation time.
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alpha">
          Alpha
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="alpha"
          type="number"
          step="any"
          placeholder="Enter alpha value"
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
        />
        <p className="text-sm text-gray-600 mt-1">
          Alpha controls the strength of regularization in the LassoCV model. Higher values increase regularization.
        </p>
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </div>
  );
};

export default LassoBox;