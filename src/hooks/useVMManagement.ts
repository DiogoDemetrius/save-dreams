import { useState } from 'react';
import { virtualMachinesService, VMStats } from '../services/virtualMachines';

export function useVMManagement() {
  const [stats, setStats] = useState<Record<'hyperv' | 'proxmox', VMStats>>({
    hyperv: { total: 0, active: 0, offline: 0 },
    proxmox: { total: 0, active: 0, offline: 0 }
  });

  const [isLoading, setIsLoading] = useState(false);

  const getStats = async () => {
    setIsLoading(true);
    try {
      const [hypervStats, proxmoxStats] = await Promise.all([
        virtualMachinesService.getStats('hyperv'),
        virtualMachinesService.getStats('proxmox')
      ]);
      
      setStats({
        hyperv: hypervStats,
        proxmox: proxmoxStats
      });
    } finally {
      setIsLoading(false);
    }
  };

  const shutdownAll = async (platform: 'hyperv' | 'proxmox') => {
    await virtualMachinesService.shutdownAll(platform);
    await getStats(); // Atualiza estatísticas após desligar
  };

  const restartService = async (platform: 'hyperv' | 'proxmox') => {
    await virtualMachinesService.restartService(platform);
    await getStats(); // Atualiza estatísticas após reiniciar
  };

  return {
    stats,
    isLoading,
    getStats,
    shutdownAll,
    restartService
  };
}