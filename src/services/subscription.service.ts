import { apiRequest } from './api';
import { toast } from 'sonner';
import { defaultPlans } from '../data/default-plans';

export interface Plan {
  id: string;
  name: string;
  price: number;
  type: 'daily' | 'standard' | 'premium';
  features: string[];
}

export interface Subscription {
  id: string;
  type: 'daily' | 'standard' | 'premium';
  status: 'active' | 'expired' | 'cancelled';
  expiresAt: string;
  features: string[];
}

export const subscriptionService = {
  async getPlans(): Promise<Plan[]> {
    try {
      const plans = await apiRequest<Plan[]>('/plans');
      return plans;
    } catch (error) {
      console.warn('Using fallback plans due to API error:', error);
      // Return default plans if API fails
      return defaultPlans;
    }
  },

  async getCurrentSubscription(): Promise<Subscription> {
    try {
      return await apiRequest('/subscription/current');
    } catch (error) {
      toast.error('Erro ao carregar assinatura atual');
      throw error;
    }
  },

  async purchase(planId: string): Promise<void> {
    try {
      await apiRequest('/subscription/purchase', {
        method: 'POST',
        body: JSON.stringify({ plan_id: planId }),
      });
      toast.success('Assinatura realizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao processar pagamento. Tente novamente.');
      throw error;
    }
  },

  async getSubscriptionHistory(): Promise<Subscription[]> {
    try {
      return await apiRequest('/subscription/history');
    } catch (error) {
      toast.error('Erro ao carregar histórico de assinaturas');
      throw error;
    }
  },

  async cancelSubscription(): Promise<void> {
    try {
      await apiRequest('/subscription/cancel', {
        method: 'POST'
      });
      toast.success('Assinatura cancelada com sucesso');
    } catch (error) {
      toast.error('Erro ao cancelar assinatura');
      throw error;
    }
  },

  async reactivateSubscription(): Promise<void> {
    try {
      await apiRequest('/subscription/reactivate', {
        method: 'POST'
      });
      toast.success('Assinatura reativada com sucesso');
    } catch (error) {
      toast.error('Erro ao reativar assinatura');
      throw error;
    }
  }
};