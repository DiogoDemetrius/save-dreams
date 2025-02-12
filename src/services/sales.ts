import { api } from './api';

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  plan: 'COMPARTILHADA' | 'DEDICADA';
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface SalesSummary {
  total: number;
  average: number;
  subscriptions: number;
  newCustomers: number;
}

export const salesService = {
  // Listar vendas
  list: async (dateRange?: { start: Date; end: Date }): Promise<Sale[]> => {
    const { data } = await api.get('/sales', { params: dateRange });
    return data;
  },

  // Obter resumo de vendas
  getSummary: async (dateRange?: { start: Date; end: Date }): Promise<SalesSummary> => {
    const { data } = await api.get('/sales/summary', { params: dateRange });
    return data;
  },

  // Criar nova venda
  create: async (saleData: Omit<Sale, 'id' | 'date' | 'status'>): Promise<Sale> => {
    const { data } = await api.post('/sales', saleData);
    return data;
  }
};