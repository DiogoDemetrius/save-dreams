import { apiRequest } from './api';

export interface UserProfile {
  username: string;
  email: string;
  gravatar_url: string;
  profile: {
    id: string;
    createdAt: string;
    subscription: string;
    restantDays: number;
  };
}

export const userService = {
  async getUserData(): Promise<UserProfile> {
    return apiRequest<UserProfile>('/client/userData', {
      method: 'GET',
    });
  },
};