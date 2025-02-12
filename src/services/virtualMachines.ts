import { api } from './api';
import { logError } from '../utils/logger';

export interface VMStatus {
  success: boolean;
  message?: string;
  ip?: string;
  username?: string;
  password?: string;
}

export interface OnlineVM {
  vmId: string;
  clientName: string;
  clientEmail: string;
  startTime: string;
  duration: string;
  plan: 'DEDICADA' | 'COMPARTILHADA';
  status: 'ACTIVE' | 'SHUTTING_DOWN';
}

// Mock data for development
const mockOnlineVMs: OnlineVM[] = [
  {
    vmId: 'VM-PRO-01',
    clientName: 'João Silva',
    clientEmail: 'joao@email.com',
    startTime: '19:30',
    duration: '1h 23min',
    plan: 'DEDICADA',
    status: 'ACTIVE'
  },
  {
    vmId: 'VM-STD-03',
    clientName: 'Maria Santos',
    clientEmail: 'maria@email.com',
    startTime: '20:15',
    duration: '45min',
    plan: 'COMPARTILHADA',
    status: 'ACTIVE'
  }
];

export const virtualMachinesService = {
  getOnlineMachines: async (): Promise<OnlineVM[]> => {
    try {
      const { data } = await api.get('/vm/online');
      return data;
    } catch (error) {
      logError(error as Error, 'getOnlineMachines');
      console.warn('API indisponível, usando dados mock');
      // Return mock data in development
      return mockOnlineVMs;
    }
  },

  stopMachine: async (vmId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { data } = await api.post(`/vm/stop/${vmId}`);
      return data;
    } catch (error) {
      logError(error as Error, 'stopMachine');
      throw new Error('Não foi possível desligar a máquina. Verifique sua conexão e tente novamente.');
    }
  }
};