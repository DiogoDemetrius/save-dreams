import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SalesChartProps {
  dateRange: [Date | null, Date | null];
}

export function SalesChart({ dateRange }: SalesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Vendas',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
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
              color: '#F5E6FF',
              callback: (value) => `R$ ${value}`
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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [dateRange]);

  return (
    <canvas ref={chartRef} />
  );
}