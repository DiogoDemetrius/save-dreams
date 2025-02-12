import { api } from './api';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export interface CheckoutPreference {
  id: string;
  init_point: string;
}

export interface PaymentCallback {
  payment_id: string;
  status: string;
  external_reference: string;
}

export const mercadopagoService = {
  // Criar preferência de checkout
  createPreference: async (data: {
    userId: string;
    planType: string;
    amount: number;
    description: string;
  }): Promise<CheckoutPreference> => {
    const { data: preference } = await api.post('/payments/create', data);
    return preference;
  },

  // Inicializar checkout
  initCheckout: (preferenceId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
        locale: 'pt-BR'
      });

      mp.checkout({
        preference: { id: preferenceId },
        autoOpen: true,
        onSuccess: resolve,
        onError: reject
      });
    });
  },

  // Processar callback de pagamento
  processCallback: async (callback: PaymentCallback): Promise<void> => {
    await api.post('/payments/callback', callback);
  }
};