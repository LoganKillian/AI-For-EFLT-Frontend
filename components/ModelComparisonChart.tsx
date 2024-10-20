import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// CompareModelResults 
const ModelComparisonChart = ({ CompareModelResults }) => {
  // 
  const data = {
    labels: ['MAE', 'MSE', 'R²', 'Achievement Score'], 
    datasets: [
      {
        label: 'District 1', 
        data: [
          CompareModelResults.district1.mae,
          CompareModelResults.district1.mse,
          CompareModelResults.district1.r2,
          CompareModelResults.district1.achievementScore,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'District 2', 
        data: [
          CompareModelResults.district2.mae,
          CompareModelResults.district2.mse,
          CompareModelResults.district2.r2,
          CompareModelResults.district2.achievementScore,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)', 
      },
    ],
  };

 
  const options = {
    responsive: true, 
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Model Comparison between District 1 and District 2', 
      },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Model Comparison Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ModelComparisonChart;
