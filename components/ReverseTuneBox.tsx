import React from 'react';

interface ReverseTuneBoxProps {
  mae: number;
  mse: number;
  r2: number;
  achievementScore: number;
}

const ReverseTuneBox: React.FC<ReverseTuneBoxProps> = ({ mae, mse, r2, achievementScore }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Model Results</h2>
      <div className="mb-2">
        <span className="font-bold">MAE:</span> {mae.toFixed(4)}
      </div>
      <div className="mb-2">
        <span className="font-bold">MSE:</span> {mse.toFixed(4)}
      </div>
      <div className="mb-2">
        <span className="font-bold">R^2:</span> {r2.toFixed(4)}
      </div>
      <div className="mb-2">
        <span className="font-bold">New Achievement Score:</span> {achievementScore.toFixed(2)}
      </div>
    </div>
  );
};

export default ReverseTuneBox;