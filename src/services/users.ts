import { api } from './api';

export type PlanType = 'DAILY' | 'STANDARD' | 'PREMIUM';

export interface User {
  id: string;
  name: string;
  email: string;
  vmId?: string;
  bmId?: string;
  clientId?: string;
  plan: PlanType;
  planDaysRemaining: number;
  planStartDate: string;
  planEndDate: string;
}

export interface UpdateUserIds {
  vmId?: string;
  bmId?: string;
  clientId?: string;
}

export interface UpdateUserPlan {
  plan: PlanType;
  daysToAdd: number;
}

export const usersService = {
  list: async (): Promise<User[]> => {
    const { data } = await api.get('/users');
    return data;
  },

  updateIds: async (userId: string, ids: UpdateUserIds): Promise<User> => {
    const { data } = await api.patch(`/users/${userId}/ids`, ids);
    return data;
  },

  updatePlan: async (userId: string, planData: UpdateUserPlan): Promise<User> => {
    const { data } = await api.patch(`/users/${userId}/plan`, planData);
    return data;
  }
};