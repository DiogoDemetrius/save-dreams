import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api';

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

// Function to check if JWT token is expired
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// Function to handle API errors
function handleAPIError(error: any): string {
  if (error instanceof APIError) {
    switch (error.status) {
      case 400:
        return 'Dados inválidos. Verifique as informações e tente novamente.';
      case 401:
        return 'Sua sessão expirou. Por favor, faça login novamente.';
      case 403:
        return 'Você não tem permissão para realizar esta ação.';
      case 404:
        return 'O recurso solicitado não foi encontrado.';
      case 409:
        return 'Este recurso já existe ou está em conflito.';
      case 422:
        return 'Dados inválidos. Verifique as informações e tente novamente.';
      case 429:
        return 'Muitas requisições. Por favor, aguarde alguns minutos.';
      case 500:
        return 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
      default:
        return error.message || 'Ocorreu um erro inesperado.';
    }
  }
  return 'Não foi possível se conectar ao servidor. Verifique sua conexão.';
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao processar resposta do servidor');
  }
  return response.json();
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const token = localStorage.getItem('authToken');
    
    // Check if token exists and is valid
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
      toast.error('Sua sessão expirou. Por favor, faça login novamente.');
      throw new APIError(401, 'Token expired');
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = handleAPIError(error);
    toast.error(errorMessage);
    throw error;
  }
}