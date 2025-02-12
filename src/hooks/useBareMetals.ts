import { useState, useEffect, useCallback } from 'react';
import { BareMetal, CreateBareMetalData } from '../services/bareMetals';

// Mock data for demonstration
const mockBareMetals: BareMetal[] = [
  {
    id: 'BM001',
    name: 'Servidor SP-01',
    ipAddress: '192.168.1.100',
    status: 'ACTIVE',
    vmCount: 6,
    activeVms: 4,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'BM002',
    name: 'Servidor RJ-01',
    ipAddress: '192.168.1.101',
    status: 'ACTIVE',
    vmCount: 8,
    activeVms: 7,
    lastUpdate: new Date().toISOString()
  }
];

export function useBareMetals() {
  const [bareMetals, setBareMetals] = useState<BareMetal[]>(mockBareMetals);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBareMetals = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBareMetals(mockBareMetals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load servers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateVMsStatus = useCallback(() => {
    setBareMetals(currentBareMetals => 
      currentBareMetals.map(bm => ({
        ...bm,
        activeVms: bm.status === 'ACTIVE' ? 
          Math.floor(Math.random() * (bm.vmCount + 1)) : 0,
        lastUpdate: new Date().toISOString()
      }))
    );
  }, []);

  useEffect(() => {
    loadBareMetals();
  }, [loadBareMetals]);

  useEffect(() => {
    const interval = setInterval(updateVMsStatus, 60000);
    return () => clearInterval(interval);
  }, [updateVMsStatus]);

  const createBareMetal = async (data: CreateBareMetalData) => {
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newBareMetal: BareMetal = {
        id: `BM${Math.floor(Math.random() * 1000)}`,
        ...data,
        activeVms: 0,
        lastUpdate: new Date().toISOString()
      };
      setBareMetals(prev => [...prev, newBareMetal]);
      return newBareMetal;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create server';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const refreshBareMetals = () => {
    updateVMsStatus();
  };

  return {
    bareMetals,
    isLoading,
    error,
    createBareMetal,
    refreshBareMetals
  };
}