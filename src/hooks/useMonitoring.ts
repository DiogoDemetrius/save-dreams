import { useState, useEffect } from 'react';
import { monitoringService, SystemMetrics } from '../services/monitoring';

export function useMonitoring(platform: 'hyperv' | 'proxmox') {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carrega métricas iniciais
    const loadInitialData = async () => {
      try {
        const [metricsData, logsData] = await Promise.all([
          monitoringService.getMetrics(platform),
          monitoringService.getLogs(platform)
        ]);
        
        setMetrics(metricsData);
        setLogs(logsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();

    // Inscreve para atualizações em tempo real
    const unsubscribe = monitoringService.subscribeToMetrics(platform, (newMetrics) => {
      setMetrics(newMetrics);
    });

    return () => {
      unsubscribe();
    };
  }, [platform]);

  return {
    metrics,
    logs,
    isLoading
  };
}