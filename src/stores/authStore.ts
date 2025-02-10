import { create } from 'zustand';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import type { UserProfile } from '../services/user.service';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthModalOpen: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (username: string, email: string, password: string) => Promise<string>;
  recoveryPassword: (email: string) => Promise<string>;
  loadUserFromToken: () => Promise<UserProfile | false>;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const TokenManager = {
  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },
  getToken: () => localStorage.getItem('authToken'),
  removeToken: () => localStorage.removeItem('authToken'),
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: TokenManager.getToken(),
  isAuthModalOpen: false,

  signInWithEmail: async (email: string, password: string) => {
    try {
      const result = await authService.login({ login: email, password });
      TokenManager.setToken(result.auth_token);
      
      // Load user data immediately after login
      const userData = await userService.getUserData();
      set({ token: result.auth_token, user: userData });
      
      toast.success('Login realizado com sucesso!', {
        duration: 3000,
      });
    } catch (error: any) {
      toast.error(error.message, {
        duration: 4000,
      });
      throw error;
    }
  },

  registerWithEmail: async (username: string, email: string, password: string) => {
    try {
      const result = await authService.register({ username, email, password });
      toast.success('Conta criada com sucesso! Faça login para continuar.', {
        duration: 5000,
      });
      return result;
    } catch (error: any) {
      toast.error(error.message, {
        duration: 5000,
      });
      throw error;
    }
  },

  recoveryPassword: async (email: string) => {
    try {
      const result = await authService.recoveryPassword(email);
      toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.', {
        duration: 6000,
      });
      return result;
    } catch (error: any) {
      toast.error(error.message, {
        duration: 5000,
      });
      throw error;
    }
  },

  loadUserFromToken: async () => {
    const token = TokenManager.getToken();
    if (!token) return false;

    try {
      const userData = await userService.getUserData();
      set({ user: userData });
      return userData;
    } catch (error) {
      console.error('Error loading user profile:', error);
      TokenManager.removeToken();
      set({ token: null, user: null });
      return false;
    }
  },

  logout: () => {
    TokenManager.removeToken();
    set({ user: null, token: null });
    toast.success('Logout realizado com sucesso!', {
      duration: 3000,
    });
  },

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));