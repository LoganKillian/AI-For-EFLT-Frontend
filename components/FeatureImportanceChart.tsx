import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Adjustable array to determine which features to hide in chart
const FEATURES_TO_IGNORE = [
  'perasn',
  'perblk',
  'perhsp',
  'perind',
  'perwht',
  'perecd',
  'perell'
];

interface FeatureImportanceData {
  feature: string;
  importance?: number;
  Coefficients?: number;
}

interface FeatureImportanceChartProps {
  data: FeatureImportanceData[];
  featureDescriptions: { [key: string]: string }; 
}

const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ data, featureDescriptions }) => {
  if (!data || data.length === 0) {
    return <div>No feature importance data available</div>;
  }

  // Filter out ignored features and normalize the data
  const normalizedData = data
    .filter(item => !FEATURES_TO_IGNORE.includes(item.feature))
    .map(item => ({
      feature: item.feature,
      importance: item.importance
    }));

  // Sort by importance in descending order
  const sortedData = normalizedData.sort((a, b) => (b.importance || 0) - (a.importance || 0));

  const chartData = {
    labels: sortedData.map(item => item.feature),
    datasets: [
      {
        label: 'Feature Importance',
        data: sortedData.map(item => item.importance),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Feature Importance',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const feature = context.label || ""; 
            const importance = (context.raw as number).toFixed(3);
            const description = featureDescriptions?.[feature] ?? 'No description available'; 
            
            return [
              `Feature Importance: ${importance}`,  
              `${feature}: ${description}`,  
            ];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Importance',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Features',
        },
      },
    },
  };

  return <div style={{ height: '800px' }}><Bar data={chartData} options={options} /></div>;
};

export default FeatureImportanceChart;

