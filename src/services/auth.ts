import { api } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'support' | 'finance';
    permissions: string[];
  };
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('dreams_token', data.token);
    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('dreams_token');
  },

  // Verificar token
  checkAuth: async (): Promise<AuthResponse['user']> => {
    const { data } = await api.get('/auth/me');
    return data;
  }
};