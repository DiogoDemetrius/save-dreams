import { api } from './api';

export interface WindowsImage {
  id: string;
  version: string;
  lastUpdate: string;
  size: number;
  status: 'active' | 'uploading' | 'failed';
}

export const windowsImageService = {
  // Obter informações da imagem atual
  getCurrentImage: async (): Promise<WindowsImage> => {
    const { data } = await api.get('/windows-image/current');
    return data;
  },

  // Upload de nova imagem
  uploadImage: async (file: File, onProgress?: (progress: number) => void): Promise<WindowsImage> => {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await api.post('/windows-image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = (progressEvent.loaded * 100) / progressEvent.total;
          onProgress(progress);
        }
      },
    });

    return data;
  }
};