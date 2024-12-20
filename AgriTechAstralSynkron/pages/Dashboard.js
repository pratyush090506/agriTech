import React from 'react';
import { Bar } from 'react-chartjs-2';

const Dashboard = ({ data }) => {
  const chartData = {
    labels: ['Bids Placed', 'Active Centers', 'Active Buyers', 'Order Stats'],
    datasets: [
      {
        label: 'Platform Statistics',
        data: data, // Pass dynamic data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard Analytics</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;