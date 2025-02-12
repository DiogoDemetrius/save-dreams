import { useState } from 'react';

interface ToastState {
  open: boolean;
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    open: false,
  });

  const showToast = (props: Omit<ToastState, 'open'>) => {
    setToast({ ...props, open: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}