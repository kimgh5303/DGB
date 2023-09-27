/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ChartComponent = ({ escores, sscores, gscores }) => {
  const data = {
    labels: ['ESG-E', 'ESG-S', 'ESG-G',],
    datasets: [{
      label: 'ESG경영 보고서 점수',
      data: [escores, sscores, gscores],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)'
      ]
    }]
  };
  const options = {
    scales: {
      y: {
        min: 0,
        max: 100
      }
    }
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;