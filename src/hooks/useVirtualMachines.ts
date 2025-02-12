import { useState, useEffect } from 'react';
import { virtualMachinesService, VMStatus } from '../services/virtualMachines';
import { useToast } from './useToast';

export function useVirtualMachines() {
  const [status, setStatus] = useState<VMStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // Poll VM status every 30 seconds
  useEffect(() => {
    const pollStatus = async () => {
      try {
        const stats = await virtualMachinesService.getStats('hyperv');
        setStatus(stats);
      } catch (err) {
        console.error('Error polling VM status:', err);
      }
    };

    const interval = setInterval(pollStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const createVM = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await virtualMachinesService.startMachine(data.id);
      showToast({
        type: 'success',
        title: 'Máquina Virtual criada',
        description: 'A VM foi iniciada com sucesso.'
      });
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar máquina virtual';
      console.error('Error creating VM:', err);
      setError(message);
      showToast({
        type: 'error',
        title: 'Erro',
        description: message
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    status,
    error,
    isLoading,
    createVM
  };
}