import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

interface ModelResults {
  'Mean Absolute Error'?: number;
  'Mean Squared Error'?: number;
  'R² Score'?: number;
  prediction?: number;
  adjusted_features?: Record<string, number>;
  original_achievement_score?: number;
  new_achievement_score?: number;
  overall_achievement_score?: number;
}

interface MetricsBoxProps {
  modelResults: ModelResults | null;
  isModelResults?: boolean;
}

const MetricsBox: React.FC<MetricsBoxProps> = ({ modelResults, isModelResults }) => {
  if (!modelResults || !modelResults.metrics || !modelResults.metrics.Metrics) return null;

  const metrics = modelResults.metrics.Metrics;

  console.log("Metrics before rendering:", metrics); // Ensure metrics are available

  const calculatePercentageChange = (newValue: number, oldValue: number): number => {
    return ((newValue - oldValue) / oldValue) * 100;
  };

  const renderAchievementScoreComparison = () => {
    if (modelResults.original_achievement_score && modelResults.new_achievement_score) {
      const percentageChange = calculatePercentageChange(
        modelResults.new_achievement_score,
        modelResults.original_achievement_score
      );
      const isImprovement = percentageChange > 0;

      return (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">Achievement Score Comparison</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Original Score</div>
              <div className="text-xl font-bold">
                {modelResults.original_achievement_score.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">New Score</div>
              <div className="text-xl font-bold">
                {modelResults.new_achievement_score.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {isImprovement ? (
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <ArrowTrendingDownIcon className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span className={`font-medium ${isImprovement ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(percentageChange).toFixed(2)}% {isImprovement ? 'improvement' : 'decrease'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderMetricExplanations = () => (
    <div className="mt-4 text-sm text-gray-600">
      <h4 className="font-semibold">Metric Explanations:</h4>
      <ul className="list-disc pl-5">
        <li><strong>Mean Absolute Error (MAE):</strong> Represents the average absolute difference between predicted and actual values. Lower values indicate better predictive accuracy.</li>
        <li><strong>Mean Squared Error (MSE):</strong> Measures the average squared difference between predicted and actual values. It penalizes larger errors more than MAE. Lower values are preferable.</li>
        <li><strong>R² Score:</strong> Indicates the proportion of variance in the dependent variable that's predictable from the independent variables. A score closer to 1 indicates a better fit.</li>
      </ul>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg px-6 py-4">
      <h2 className="text-2xl font-bold mb-4">
        {isModelResults ? 'Lasso Results' : 'Reverse Tuning Results'}
      </h2>

      {renderAchievementScoreComparison()}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Model Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Mean Absolute Error</div>
            <div className="text-xl font-bold">
              {metrics['Mean Absolute Error'] != undefined
                ? metrics['Mean Absolute Error'].toFixed(4)
                : 'N/A'}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Mean Squared Error</div>
            <div className="text-xl font-bold">
              {metrics['Mean Squared Error'] != undefined
                ? metrics['Mean Squared Error'].toFixed(4)
                : 'N/A'}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">R² Score</div>
            <div className="text-xl font-bold">
              {metrics['R² Score'] != undefined
                ? metrics['R² Score'].toFixed(4)
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {renderMetricExplanations()}
    </div>
  );
};

export default MetricsBox;
