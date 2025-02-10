import { apiRequest } from './api';

export interface ProfileUpdateData {
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
}

export interface ProfileSettings {
  notifications: boolean;
  language: string;
  theme: 'light' | 'dark';
}

export const profileService = {
  async updateProfile(data: ProfileUpdateData): Promise<void> {
    return apiRequest('/profile/update', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    return apiRequest('/profile/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  async updateSettings(settings: ProfileSettings): Promise<void> {
    return apiRequest('/profile/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  async uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    return apiRequest('/profile/avatar', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  },
};