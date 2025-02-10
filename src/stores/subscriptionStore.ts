import { create } from 'zustand';
import { subscriptionService, type Subscription, type SubscriptionHistory } from '../services/subscription.service';
import { toast } from 'sonner';

interface SubscriptionState {
  currentSubscription: Subscription | null;
  history: SubscriptionHistory[];
  isLoading: boolean;
  loadSubscription: () => Promise<void>;
  loadHistory: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
  reactivateSubscription: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  currentSubscription: null,
  history: [],
  isLoading: false,

  loadSubscription: async () => {
    set({ isLoading: true });
    try {
      const subscription = await subscriptionService.getCurrentSubscription();
      set({ currentSubscription: subscription, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  loadHistory: async () => {
    set({ isLoading: true });
    try {
      const history = await subscriptionService.getSubscriptionHistory();
      set({ history, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  cancelSubscription: async () => {
    try {
      await subscriptionService.cancelSubscription();
      set((state) => ({
        currentSubscription: state.currentSubscription
          ? { ...state.currentSubscription, status: 'cancelled' }
          : null
      }));
      toast.success('Assinatura cancelada com sucesso');
    } catch (error) {
      toast.error('Erro ao cancelar assinatura');
      throw error;
    }
  },

  reactivateSubscription: async () => {
    try {
      await subscriptionService.reactivateSubscription();
      set((state) => ({
        currentSubscription: state.currentSubscription
          ? { ...state.currentSubscription, status: 'active' }
          : null
      }));
      toast.success('Assinatura reativada com sucesso');
    } catch (error) {
      toast.error('Erro ao reativar assinatura');
      throw error;
    }
  },
}));