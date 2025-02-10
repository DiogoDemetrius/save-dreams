import { create } from 'zustand';
import { profileService, type ProfileSettings, type ProfileUpdateData } from '../services/profile.service';
import { toast } from 'sonner';

interface ProfileState {
  settings: ProfileSettings | null;
  isUpdating: boolean;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateSettings: (settings: ProfileSettings) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  settings: null,
  isUpdating: false,

  updateProfile: async (data) => {
    set({ isUpdating: true });
    try {
      await profileService.updateProfile(data);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  updatePassword: async (currentPassword, newPassword) => {
    set({ isUpdating: true });
    try {
      await profileService.updatePassword(currentPassword, newPassword);
      toast.success('Senha atualizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar senha');
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  updateSettings: async (settings) => {
    set({ isUpdating: true });
    try {
      await profileService.updateSettings(settings);
      set({ settings });
      toast.success('Configurações atualizadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar configurações');
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  uploadAvatar: async (file) => {
    set({ isUpdating: true });
    try {
      const { url } = await profileService.uploadAvatar(file);
      toast.success('Avatar atualizado com sucesso!');
      return url;
    } catch (error) {
      toast.error('Erro ao atualizar avatar');
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },
}));