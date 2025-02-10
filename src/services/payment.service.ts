import { apiRequest } from './api';

export interface PaymentPreference {
  planType: 'daily' | 'standard' | 'premium';
  price: number;
  description: string;
}

export interface PaymentPreferenceResponse {
  preferenceId: string;
}

export const paymentService = {
  async createPaymentPreference(data: PaymentPreference): Promise<PaymentPreferenceResponse> {
    try {
      return await apiRequest<PaymentPreferenceResponse>('/payment/create', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw error;
    }
  },

  async processCallback(token: string): Promise<void> {
    try {
      await apiRequest('/payment/callback', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      throw error;
    }
  }
};