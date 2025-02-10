import { create } from 'zustand';
import { vmService } from '../services/vm.service';
import type { VMStatus } from '../services/vm.service';
import { toast } from 'sonner';

interface VMState {
  status: Record<string, VMStatus>;
  isLoading: boolean;
  error: string | null;
  startVM: (vmId: string, plan: 'standard' | 'premium') => Promise<void>;
  stopVM: (vmId: string) => Promise<void>;
  getVMStatus: (vmId: string) => Promise<VMStatus>;
  clearError: () => void;
  updateStatus: (vmId: string, status: VMStatus) => void;
}

export const useVMStore = create<VMState>((set, get) => ({
  status: {},
  isLoading: false,
  error: null,

  startVM: async (vmId: string, plan: 'standard' | 'premium') => {
    set({ isLoading: true, error: null });
    try {
      await vmService.startVM({ vm_id: vmId, plan });
      const status = await vmService.getStatus(vmId);
      set((state) => ({
        status: { ...state.status, [vmId]: status },
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: 'Erro ao iniciar máquina virtual. Verifique sua assinatura.', 
        isLoading: false 
      });
      throw error;
    }
  },

  stopVM: async (vmId: string) => {
    set({ isLoading: true, error: null });
    try {
      await vmService.stopVM(vmId);
      const status = await vmService.getStatus(vmId);
      set((state) => ({
        status: { ...state.status, [vmId]: status },
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: 'Erro ao parar máquina virtual. Tente novamente.', 
        isLoading: false 
      });
      throw error;
    }
  },

  getVMStatus: async (vmId: string) => {
    try {
      const status = await vmService.getStatus(vmId);
      set((state) => ({
        status: { ...state.status, [vmId]: status }
      }));
      return status;
    } catch (error) {
      set({ error: 'Erro ao obter status da máquina virtual' });
      throw error;
    }
  },

  updateStatus: (vmId: string, status: VMStatus) => {
    set((state) => ({
      status: { ...state.status, [vmId]: status }
    }));
  },

  clearError: () => set({ error: null })
}));