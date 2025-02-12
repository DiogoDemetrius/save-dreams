import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export function UsageChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
        datasets: [{
          label: 'Usuários Ativos',
          data: [30, 25, 20, 15, 10, 15, 20, 35, 55, 75, 85, 90, 85, 80, 85, 90, 95, 100, 120, 150, 140, 120, 90, 60],
          borderColor: '#93C5FD',
          backgroundColor: 'rgba(147, 197, 253, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(233, 213, 255, 0.1)'
            },
            ticks: {
              color: '#F5E6FF'
            }
          },
          x: {
            grid: {
              color: 'rgba(233, 213, 255, 0.1)'
            },
            ticks: {
              color: '#F5E6FF'
            }
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <canvas ref={chartRef} />
  );
}