import React, { useState } from "react";

interface LassoBoxProps {
  onConfirm: (tolerance: number, alpha: number) => void;
}

function showAlpha() {
  var alpha = document.getElementById("alpha");
  var result = document.getElementById("alphaResult");
  alphaResult.innerText = alpha.value;
}

function showTolerance() {
  var tolerance = document.getElementById("tolerance");
  var result = document.getElementById("toleranceResult");
  toleranceResult.innerText = tolerance.value;
}

const LassoBox: React.FC<LassoBoxProps> = ({ onConfirm }) => {
  const [tolerance, setTolerance] = useState("");
  const [alpha, setAlpha] = useState("");

  const handleConfirm = () => {
    const toleranceValue = parseFloat(tolerance);
    const alphaValue = parseFloat(alpha);

    if (
      toleranceValue >= 0.0001 &&
      toleranceValue <= 0.01 &&
      alphaValue >= 0.0001 &&
      alphaValue <= 0.01
    ) {
      onConfirm(toleranceValue, alphaValue);
    } else {
      alert(
        "Please enter values within the allowed ranges:\nAlpha: 0.0001 - 0.01\nTolerance: 0.0001 - 0.01",
      );
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">
        Identify feature importance with LassoCV
      </h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tolerance"
        >
          Tolerance (0.0001 - 0.01)
        </label>
        <input
          className="shadow appearance-none border rounded size-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tolerance"
          type="range"
          min="0.0001"
          max="0.01"
          step="0.0001"
          value="0.005"
          placeholder="Enter tolerance value"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
          onInput={(e) => showTolerance()}
        />
        <p>
          Value: <span id="toleranceResult"></span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Tolerance affects the precision of the LassoCV model. Lower values
          increase precision but may increase computation time.
        </p>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="alpha"
        >
          Alpha (0.0001 - 0.01)
        </label>
        <input
          className="shadow appearance-none border rounded size-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="alpha"
          type="range"
          min="0.0001"
          max="0.01"
          defaultValue="0.005"
          step="0.0001"
          placeholder="Enter alpha value"
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          onInput={(e) => showAlpha()}
        />
        <p>
          Value: <span id="alphaResult"></span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Alpha controls the strength of regularization in the LassoCV model.
          Higher values increase regularization (higher regularization means
          less features have impact).
        </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleConfirm}
        disabled={!tolerance || !alpha}
      >
        Confirm
      </button>
    </div>
  );
};

export default LassoBox;
