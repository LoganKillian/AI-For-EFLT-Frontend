// components/ComparisonLassoBox.tsx
import React, { useState } from 'react';
import WarningPopup from './WarningPopup'; 

interface ComparisonLassoBoxProps {
  district1: string;
  district2: string;
  onConfirm: (params: { district: string; tolerance: number; alpha: number }[]) => void;
}

const ComparisonLassoBox: React.FC<ComparisonLassoBoxProps> = ({
  district1,
  district2,
  onConfirm,
}) => {
  const [tolerance1, setTolerance1] = useState('');
  const [alpha1, setAlpha1] = useState('');
  const [tolerance2, setTolerance2] = useState('');
  const [alpha2, setAlpha2] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const validateInputs = () => {
    const t1 = parseFloat(tolerance1);
    const a1 = parseFloat(alpha1);
    const t2 = parseFloat(tolerance2);
    const a2 = parseFloat(alpha2);

    if (
      isNaN(t1) || isNaN(a1) || t1 <= 0 || a1 <= 0 ||
      isNaN(t2) || isNaN(a2) || t2 <= 0 || a2 <= 0
    ) {
      setShowWarning(true); 
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    if (validateInputs()) {
      onConfirm([
        { district: district1, tolerance: parseFloat(tolerance1), alpha: parseFloat(alpha1) },
        { district: district2, tolerance: parseFloat(tolerance2), alpha: parseFloat(alpha2) },
      ]);
    }
  };

  const handleWarningConfirm = () => {
    setShowWarning(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        {/* District 1 Input Section */}
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="text-xl font-bold mb-4">{district1} Lasso Parameters 1</h3>
          <input
            type="number"
            placeholder="Tolerance"
            value={tolerance1}
            onChange={(e) => setTolerance1(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            placeholder="Alpha"
            value={alpha1}
            onChange={(e) => setAlpha1(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
        </div>

        {/* District 2 Input Section */}
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="text-xl font-bold mb-4">{district2} Lasso Parameters 2</h3>
          <input
            type="number"
            placeholder="Tolerance"
            value={tolerance2}
            onChange={(e) => setTolerance2(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            placeholder="Alpha"
            value={alpha2}
            onChange={(e) => setAlpha2(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          />
        </div>

        {/* Single Confirm Button */}
        <div className="col-span-2 flex justify-center mt-4">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Confirm for Both Districts
          </button>
        </div>
      </div>

      {/* Warning Popup */}
      <WarningPopup
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onConfirm={handleWarningConfirm}
        message="Please provide valid inputs for both districts."
      />
    </>
  );
};

export default ComparisonLassoBox;
