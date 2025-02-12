import { api } from './api';

export interface SalesSummary {
  totalSales: number;
  totalRevenue: number;
  activePlans: {
    daily: number;
    standard: number;
    premium: number;
  };
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  planType: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface ChartData {
  labels: string[];
  data: number[];
}

export const financialService = {
  // Obter resumo financeiro
  getSummary: async (period: string): Promise<SalesSummary> => {
    const { data } = await api.get(`/sales/summary?period=${period}`);
    return data;
  },

  // Obter dados para gráficos
  getChartData: async (period: string): Promise<ChartData> => {
    const { data } = await api.get(`/sales/chart?period=${period}`);
    return data;
  },

  // Listar transações
  getTransactions: async (filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }): Promise<Transaction[]> => {
    const { data } = await api.get('/sales', { params: filters });
    return data;
  }
};