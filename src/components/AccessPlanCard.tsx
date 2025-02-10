import { Button } from './ui/Button';
import { useAuthStore } from '../stores/authStore';
import { LoginPromptModal } from './ui/LoginPromptModal';
import { useState } from 'react';

interface AccessPlanProps {
  type: 'daily' | 'standard' | 'premium';
  price: number;
  features: string[];
  onSelect: () => void;
  highlight?: string;
  period: string;
}

export function AccessPlanCard({ 
  type, 
  price, 
  features, 
  onSelect,
  highlight,
  period
}: AccessPlanProps) {
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
  const { token } = useAuthStore();

  const handleSelect = () => {
    if (!token) {
      setLoginPromptOpen(true);
      return;
    }
    onSelect();
  };

  const getTitle = () => {
    switch (type) {
      case 'daily':
        return 'Acesso 24 Horas';
      case 'standard':
        return 'Standard';
      case 'premium':
        return 'Premium';
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'daily':
        return 'Para experimentar';
      case 'standard':
        return 'Para jogadores casuais';
      case 'premium':
        return 'Para jogadores exigentes';
      default:
        return '';
    }
  };

  return (
    <>
      <div 
        className={`relative bg-black/30 backdrop-blur-sm rounded-3xl p-8 border 
          transition-all duration-500 group
          ${highlight ? 'border-dreams-lilac ring-2 ring-dreams-lilac/50' : 'border-dreams-lilac/10'}`}
      >
        {highlight && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r 
            from-dreams-blue to-dreams-lilac text-black text-sm font-medium rounded-full shadow-lg">
            {highlight}
          </span>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className={`text-2xl font-bold ${
            highlight ? 'text-dreams-lilac' : 'text-white'
          }`}>
            {getTitle()}
          </h3>
          <p className="text-dreams-lilac-light mt-2">
            {getDescription()}
          </p>
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">
              R${price.toFixed(2)}
            </span>
            <span className="text-dreams-lilac-light ml-2">
              /{period}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-dreams-lilac-light">
              <svg className="w-5 h-5 text-dreams-blue-light mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <Button
          onClick={handleSelect}
          className={`w-full py-4 text-lg font-medium rounded-2xl transform transition-all duration-300 
            ${highlight 
              ? 'bg-gradient-to-r from-dreams-blue to-dreams-lilac text-black' 
              : 'bg-dreams-lilac text-black'}`}
        >
          <span className="relative z-10">Selecionar Plano</span>
        </Button>
      </div>

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        message="Faça login para assinar um plano e começar a jogar!"
        onLogin={() => {
          setLoginPromptOpen(false);
          document.dispatchEvent(new CustomEvent('open-auth-modal'));
        }}
      />
    </>
  );
}