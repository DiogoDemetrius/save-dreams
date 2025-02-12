import { api } from './api';

export interface BareMetal {
  id: string;
  name: string;
  ipAddress: string;
  status: 'ACTIVE' | 'INACTIVE';
  vmCount: number;
  activeVms?: number;
  lastUpdate?: string;
}

export interface CreateBareMetalData {
  name: string;
  ipAddress: string;
  status: 'ACTIVE' | 'INACTIVE';
  vmCount: number;
}

export interface VMStatus {
  id: string;
  activeVms: number;
}

export const bareMetalsService = {
  // List Bare Metals
  list: async (): Promise<BareMetal[]> => {
    const { data } = await api.get('/bare-metals');
    return data;
  },

  // Create new Bare Metal
  create: async (bareMetalData: CreateBareMetalData): Promise<BareMetal> => {
    const { data } = await api.post('/bare-metals', bareMetalData);
    return data;
  },

  // Get VMs status for a specific Bare Metal
  getVMsStatus: async (id: string): Promise<VMStatus> => {
    const { data } = await api.get(`/bare-metals/${id}/vms-status`);
    return data;
  }
};