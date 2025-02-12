import { api } from './api';

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkUsage: {
    upload: number;
    download: number;
  };
  activeConnections: number;
}

export const monitoringService = {
  // Obter métricas do sistema
  getMetrics: async (platform: 'hyperv' | 'proxmox'): Promise<SystemMetrics> => {
    const { data } = await api.get(`/monitoring/${platform}/metrics`);
    return data;
  },

  // Obter logs do sistema
  getLogs: async (platform: 'hyperv' | 'proxmox', limit: number = 100): Promise<string[]> => {
    const { data } = await api.get(`/monitoring/${platform}/logs`, {
      params: { limit }
    });
    return data;
  },

  // Websocket para métricas em tempo real
  subscribeToMetrics: (platform: 'hyperv' | 'proxmox', callback: (metrics: SystemMetrics) => void) => {
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/monitoring/${platform}`);
    
    ws.onmessage = (event) => {
      const metrics = JSON.parse(event.data);
      callback(metrics);
    };

    return () => ws.close(); // Função de cleanup
  }
};