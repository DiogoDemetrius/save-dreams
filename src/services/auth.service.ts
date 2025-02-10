import { apiRequest } from './api';

interface LoginResponse {
  auth_token: string;
}

interface LoginCredentials {
  login: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      return await apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error: any) {
      if (error.status === 401) {
        throw new Error('Email ou senha incorretos. Por favor, verifique suas credenciais.');
      } else if (error.status === 404) {
        throw new Error('Usuário não encontrado. Verifique o email informado.');
      } else if (error.status === 429) {
        throw new Error('Muitas tentativas de login. Por favor, aguarde alguns minutos e tente novamente.');
      } else if (error.status === 503) {
        throw new Error('Serviço temporariamente indisponível. Por favor, tente novamente em alguns minutos.');
      }
      throw new Error('Erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  },

  async register(data: RegisterData): Promise<string> {
    try {
      return await apiRequest<string>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      if (error.status === 409) {
        throw new Error('Este email já está em uso. Por favor, use outro email ou faça login.');
      } else if (error.status === 422) {
        const messages = {
          username: 'Nome de usuário inválido. Use apenas letras, números e underscores.',
          email: 'Email inválido. Por favor, use um email válido.',
          password: 'Senha muito fraca. Use letras maiúsculas, minúsculas e números.'
        };
        const field = error.message?.toLowerCase() || '';
        throw new Error(messages[field as keyof typeof messages] || 'Dados inválidos. Por favor, verifique as informações fornecidas.');
      } else if (error.status === 429) {
        throw new Error('Muitas tentativas de registro. Por favor, aguarde alguns minutos.');
      } else if (error.status === 503) {
        throw new Error('Serviço temporariamente indisponível. Por favor, tente novamente em alguns minutos.');
      }
      throw new Error('Erro ao criar conta. Por favor, tente novamente mais tarde.');
    }
  },

  async recoveryPassword(email: string): Promise<string> {
    try {
      return await apiRequest<string>('/auth/recovery', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error('Email não encontrado. Verifique o email informado.');
      } else if (error.status === 429) {
        throw new Error('Muitas tentativas de recuperação. Por favor, aguarde alguns minutos.');
      } else if (error.status === 503) {
        throw new Error('Serviço temporariamente indisponível. Por favor, tente novamente em alguns minutos.');
      }
      throw new Error('Erro ao enviar email de recuperação. Por favor, tente novamente mais tarde.');
    }
  },
};