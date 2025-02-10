import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ variant = 'primary', children, onClick, disabled, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 rounded-2xl font-medium transition-all',
        variant === 'primary'
          ? 'bg-gradient-to-r from-dreams-blue to-dreams-lilac text-white hover:opacity-90 disabled:opacity-50'
          : 'bg-black/30 text-dreams-lilac-light border border-dreams-lilac/20 hover:border-dreams-lilac/40 disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
}