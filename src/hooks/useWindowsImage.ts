import { useState } from 'react';
import { windowsImageService, WindowsImage } from '../services/windowsImage';

export function useWindowsImage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState<WindowsImage | null>(null);

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true);
      const image = await windowsImageService.uploadImage(file, (progress) => {
        setUploadProgress(progress);
      });
      setCurrentImage(image);
      return image;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getCurrentImage = async () => {
    const image = await windowsImageService.getCurrentImage();
    setCurrentImage(image);
    return image;
  };

  return {
    isUploading,
    uploadProgress,
    currentImage,
    uploadImage,
    getCurrentImage
  };
}