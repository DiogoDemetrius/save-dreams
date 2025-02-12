import { api } from './api';

export interface PaymentPreference {
  id: string;
  init_point: string;
}

export interface PaymentData {
  planType: string;
  price: number;
  description: string;
}

export const paymentsService = {
  // Criar preferência de pagamento
  createPreference: async (data: PaymentData): Promise<PaymentPreference> => {
    const { data: response } = await api.post('/payments/create', data);
    return response;
  },

  // Atualizar status do pagamento
  updateStatus: async (preferenceId: string, status: string): Promise<void> => {
    await api.post('/payments/update', { preferenceId, status });
  }
};