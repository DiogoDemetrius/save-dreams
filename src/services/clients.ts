import { api } from './api';

export interface Client {
  id: string;
  name: string;
  email: string;
  plan: 'COMPARTILHADA' | 'DEDICADA';
  state: string;
  city: string;
  daysRemaining: number;
  status: 'active' | 'inactive';
}

export const clientsService = {
  // Listar clientes
  list: async (filters?: { search?: string; state?: string }): Promise<Client[]> => {
    const { data } = await api.get('/clients', { params: filters });
    return data;
  },

  // Obter cliente específico
  get: async (id: string): Promise<Client> => {
    const { data } = await api.get(`/clients/${id}`);
    return data;
  },

  // Criar cliente
  create: async (clientData: Omit<Client, 'id'>): Promise<Client> => {
    const { data } = await api.post('/clients', clientData);
    return data;
  },

  // Atualizar cliente
  update: async (id: string, clientData: Partial<Client>): Promise<Client> => {
    const { data } = await api.put(`/clients/${id}`, clientData);
    return data;
  },

  // Alterar senha do cliente
  changePassword: async (id: string, newPassword: string): Promise<void> => {
    await api.post(`/clients/${id}/change-password`, { password: newPassword });
  }
};