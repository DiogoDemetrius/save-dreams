import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Enhanced backdrop with gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>

      {/* Modal Container */}
      <div 
        className={`
          relative w-full max-w-md bg-gradient-to-b from-dreams-bg-light/95 to-dreams-bg-dark/95
          backdrop-blur-xl border border-dreams-lilac/20 rounded-2xl shadow-xl
          transform transition-all duration-200 animate-in fade-in slide-in-from-bottom-4
        `}
        style={{
          maxHeight: 'calc(100vh - 2rem)',
          marginTop: 'auto',
          marginBottom: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-dreams-lilac/10">
          <h3 className="text-xl font-bold bg-gradient-to-r from-dreams-blue-light to-dreams-lilac bg-clip-text text-transparent">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-dreams-lilac-light hover:text-white transition-colors rounded-lg p-1 
              hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-dreams-lilac/50"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content with custom scrollbar */}
        <div 
          className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-dreams-lilac/20 
            scrollbar-track-black/20 hover:scrollbar-thumb-dreams-lilac/30"
          style={{ maxHeight: 'calc(100vh - 10rem)' }}
        >
          {children}
        </div>

        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-dreams-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-dreams-lilac/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}