import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

interface ToastProps {
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Toast({ title, description, type = 'info', open, onOpenChange }: ToastProps) {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        className={cn(
          'fixed bottom-4 right-4 z-50',
          'bg-dreams-bg-light border rounded-lg shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full',
          'duration-300',
          {
            'border-green-500/20': type === 'success',
            'border-red-500/20': type === 'error',
            'border-dreams-lilac/20': type === 'info',
          }
        )}
      >
        <div className="flex p-4 items-start gap-4">
          <div className="flex-1">
            {title && (
              <ToastPrimitive.Title className={cn(
                'text-sm font-medium mb-1',
                {
                  'text-green-400': type === 'success',
                  'text-red-400': type === 'error',
                  'text-dreams-lilac-light': type === 'info',
                }
              )}>
                {title}
              </ToastPrimitive.Title>
            )}
            {description && (
              <ToastPrimitive.Description className="text-sm text-dreams-lilac-light">
                {description}
              </ToastPrimitive.Description>
            )}
          </div>
          <ToastPrimitive.Close className="text-dreams-lilac-light hover:text-white">
            <X size={18} />
          </ToastPrimitive.Close>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}