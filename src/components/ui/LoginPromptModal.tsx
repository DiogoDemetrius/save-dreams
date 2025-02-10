import { X } from 'lucide-react';
import { Button } from './Button';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  onLogin?: () => void;
}

export function LoginPromptModal({ isOpen, onClose, message, onLogin }: LoginPromptModalProps) {
  if (!isOpen) return null;

  const handleLogin = () => {
    onLogin?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* Backdrop com desfoque aprimorado */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>
      
      {/* Modal Container */}
      <div className="relative h-full flex items-center justify-center p-4">
        <div 
          className="relative bg-gradient-to-b from-dreams-bg-light/95 to-dreams-bg-dark/95 
            backdrop-blur-xl border border-dreams-lilac/20 rounded-3xl p-8 max-w-md w-full 
            shadow-[0_0_100px_rgba(147,197,253,0.2)] animate-in fade-in slide-in-from-bottom-4 
            zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -right-3 -top-3 p-2 bg-dreams-bg-light border border-dreams-lilac/20 
              rounded-full transition-colors hover:border-dreams-lilac/40"
          >
            <X className="w-5 h-5 text-dreams-lilac-light hover:text-dreams-lilac transition-colors" />
          </button>
          
          {/* Title */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-dreams-blue-light to-dreams-lilac 
              bg-clip-text text-transparent">
              Acesso Restrito
            </h3>
          </div>

          {/* Message */}
          <p className="text-dreams-lilac-light text-center mb-8 leading-relaxed">
            {message || 'Faça login para acessar esta funcionalidade.'}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleLogin}
              className="w-full py-4 text-lg font-medium bg-gradient-to-r from-dreams-blue to-dreams-lilac 
                text-black"
            >
              Fazer Login
            </Button>
            <button
              onClick={onClose}
              className="text-dreams-lilac-light hover:text-dreams-blue-light transition-colors text-sm"
            >
              Continuar navegando
            </button>
          </div>

          {/* Decoração de fundo */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-dreams-blue/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-dreams-lilac/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}