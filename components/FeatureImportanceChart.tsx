import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FeatureImportanceData {
  feature: string;
  importance?: number;
  Coefficients?: number;
}

interface FeatureImportanceChartProps {
  data: FeatureImportanceData[];
}

const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No feature importance data available</div>;
  }

  // Normalize the data structure to handle both Lasso and reverse tuning responses
  const normalizedData = data.map(item => ({
    feature: item.feature,
    importance: item.importance //|| item.Coefficients // Use importance if available, otherwise use absolute Coefficients
  }));

  // Sort by importance in descending order
  const sortedData = normalizedData.sort((a, b) => b.importance - a.importance);

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