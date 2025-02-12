import { useState } from 'react';
import { PlanType } from '../services/users';

interface Client {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: PlanType;
  state: string;
  city: string;
  ip: string;
  daysRemaining: number;
}

interface CreateClientData {
  name: string;
  email: string;
  password: string;
  plan: PlanType;
  state: string;
  city: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123',
      plan: 'PREMIUM',
      state: 'SP',
      city: 'São Paulo',
      ip: '192.168.1.1',
      daysRemaining: 25
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const createClient = async (data: CreateClientData) => {
    const newClient: Client = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      password: data.password,
      plan: data.plan,
      state: data.state,
      city: data.city,
      ip: '0.0.0.0',
      daysRemaining: data.plan === 'DAILY' ? 1 : 30
    };

    setClients(prev => [...prev, newClient]);
  };

  const changePassword = async (clientId: string, newPassword: string) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, password: newPassword }
        : client
    ));
  };

  return { 
    clients, 
    isLoading,
    createClient,
    changePassword
  };
}