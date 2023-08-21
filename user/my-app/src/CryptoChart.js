// src/components/CryptoChart.js
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

const CryptoChart = ({ crypto, selectedCurrency }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${selectedCurrency}&start=2023-01-01&end=2023-08-20`);
        const data = await response.json();

        const dates = Object.keys(data.bpi);
        const prices = Object.values(data.bpi);

        if (chart) {
          chart.data.labels = dates;
          chart.data.datasets[0].data = prices;
          chart.update();
        } else {
          const ctx = document.getElementById(`${crypto}-chart`).getContext('2d');
          const newChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: dates,
              datasets: [
                {
                  label: `${crypto} Price`,
                  data: prices,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                },
                y: {
                  beginAtZero: false,
                },
              },
            },
          });

          setChart(newChart);
        }
      } catch (error) {
        console.error(`Error fetching ${crypto} chart data:`, error);
      }
    }

    fetchChartData();
  }, [crypto, selectedCurrency, chart]);

  return <canvas id={`${crypto}-chart`} width="400" height="200" />;
};

export default CryptoChart;
