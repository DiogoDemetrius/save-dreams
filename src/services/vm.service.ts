import { apiRequest } from './api';
import { toast } from 'sonner';
import { VirtualMachine } from '../types';

export interface VMStatus {
  status: 'running' | 'stopped' | 'starting' | 'queue';
  ip?: string;
  credentials?: {
    username: string;
    password: string;
  };
  queuePosition?: number;
  estimatedTime?: number;
}

export interface VMStartRequest {
  vm_id: string;
  plan: 'standard' | 'premium';
}

let statusCheckInterval: NodeJS.Timeout;

export const vmService = {
  async getVMs(bareMetalId: string): Promise<VirtualMachine[]> {
    try {
      return await apiRequest<VirtualMachine[]>(`/bare-metals/${bareMetalId}/vms`);
    } catch (error) {
      toast.error('Erro ao carregar máquinas virtuais. Por favor, tente novamente mais tarde.');
      throw error;
    }
  },

  async getStatus(vmId: string): Promise<VMStatus> {
    try {
      const status = await apiRequest<VMStatus>(`/vm/status/${vmId}`);
      
      // Calcular tempo estimado baseado no status
      if (status.status === 'queue' && status.queuePosition) {
        status.estimatedTime = status.queuePosition * 30; // 30 segundos por posição na fila
      } else if (status.status === 'starting') {
        status.estimatedTime = 60; // Tempo base de inicialização
      }
      
      return status;
    } catch (error) {
      toast.error('Erro ao verificar status da máquina. Verifique sua conexão.');
      throw error;
    }
  },

  async startVM(data: VMStartRequest): Promise<void> {
    try {
      await apiRequest('/vm/start', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast.success('Máquina iniciada com sucesso! Aguarde enquanto preparamos tudo.', {
        duration: 5000
      });
      this.startStatusCheck(data.vm_id);
    } catch (error) {
      toast.error('Erro ao iniciar máquina. Verifique sua assinatura e tente novamente.', {
        duration: 5000
      });
      throw error;
    }
  },

  async stopVM(vmId: string): Promise<void> {
    try {
      await apiRequest('/vm/stop', {
        method: 'POST',
        body: JSON.stringify({ vm_id: vmId }),
      });
      toast.success('Máquina parada com sucesso! Seus dados foram salvos.', {
        duration: 5000
      });
      this.stopStatusCheck();
    } catch (error) {
      toast.error('Erro ao parar máquina. Por favor, tente novamente mais tarde.', {
        duration: 5000
      });
      throw error;
    }
  },

  async sendMoonlightPin(vmId: string, pin: string): Promise<void> {
    try {
      await apiRequest('/vm/moonlight/pin', {
        method: 'POST',
        body: JSON.stringify({ vm_id: vmId, pin }),
      });
      toast.success('PIN enviado com sucesso! Você já pode se conectar.', {
        duration: 5000
      });
    } catch (error) {
      toast.error('Erro ao enviar PIN. Verifique o código e tente novamente.', {
        duration: 5000
      });
      throw error;
    }
  },

  startStatusCheck(vmId: string) {
    this.stopStatusCheck();
    
    const checkStatus = async () => {
      try {
        const status = await this.getStatus(vmId);
        window.dispatchEvent(new CustomEvent('vm-status-update', { 
          detail: { vmId, status } 
        }));

        // Se a máquina estiver rodando, verificar com menos frequência
        if (status.status === 'running') {
          clearInterval(statusCheckInterval);
          statusCheckInterval = setInterval(checkStatus, 30000); // A cada 30 segundos
        }
      } catch (error) {
        console.error('Erro ao verificar status da máquina:', error);
      }
    };

    // Verificação inicial
    checkStatus();
    
    // Configurar intervalo de verificação - a cada 5 segundos inicialmente
    statusCheckInterval = setInterval(checkStatus, 5000);
  },

  stopStatusCheck() {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
  }
};