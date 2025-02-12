import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Card } from '../ui/Card';

Chart.register(...registerables);

interface ActiveMachinesChartProps {
  period: '24h' | '48h' | '72h';
}

export function ActiveMachinesChart({ period }: ActiveMachinesChartProps) {
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

    // Generate mock data based on period
    const hoursCount = period === '24h' ? 24 : period === '48h' ? 48 : 72;
    const labels = Array.from({ length: hoursCount }, (_, i) => `${i % 24}h`);
    const data = Array.from({ length: hoursCount }, () => 
      Math.floor(Math.random() * (150 - 50) + 50)
    );

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Máquinas Ativas',
          data,
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
              color: '#F5E6FF',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 12
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [period]);

  return <canvas ref={chartRef} />;
}