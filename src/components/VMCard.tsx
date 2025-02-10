import { useState } from 'react';
import { Cpu, HardDrive, MonitorPlay, Save, CircuitBoard, Lock } from 'lucide-react';
import { VirtualMachine } from '../types';
import { Button } from './ui/Button';
import { LoginPromptModal } from './ui/LoginPromptModal';
import { useAuthStore } from '../stores/authStore';
import { useSubscriptionStore } from '../stores/subscriptionStore';
import { useVMStore } from '../stores/vmStore';
import { toast } from 'sonner';

interface VMCardProps {
  vm: VirtualMachine;
  onStart: () => void;
}

export function VMCard({ vm, onStart }: VMCardProps) {
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
  const { token } = useAuthStore();
  const { currentSubscription } = useSubscriptionStore();
  const { startVM, stopVM, status } = useVMStore();
  const vmStatus = status[vm.id];

  const handleStartClick = async () => {
    if (!token) {
      setLoginPromptOpen(true);
      return;
    }
    
    if (!currentSubscription?.status === 'active') {
      toast.error('Você precisa de um plano ativo para ligar a máquina', {
        action: {
          label: 'Ver Planos',
          onClick: () => document.getElementById('access-plans')?.scrollIntoView({ behavior: 'smooth' })
        }
      });
      return;
    }
    
    if (currentSubscription.type !== vm.type && vm.type === 'premium') {
      toast.error('Esta máquina requer um plano Premium', {
        action: {
          label: 'Ver Planos',
          onClick: () => document.getElementById('access-plans')?.scrollIntoView({ behavior: 'smooth' })
        }
      });
      return;
    }

    try {
      await startVM(vm.id, vm.type === 'dedicated' ? 'premium' : 'standard');
      onStart();
    } catch (error) {
      // Error is already handled by the store and service
    }
  };

  const handleStopClick = async () => {
    try {
      await stopVM(vm.id);
    } catch (error) {
      // Error is already handled by the store and service
    }
  };

  return (
    <>
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-dreams-lilac/10 p-8 
        transition-all duration-500 relative group">
        {(!token || !currentSubscription?.status === 'active') && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl 
            flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-center p-6">
              <Lock className="w-12 h-12 text-dreams-lilac-light mx-auto mb-4" />
              <p className="text-white font-medium mb-2">
                {!token ? 'Faça login para acessar' : 'Plano necessário'}
              </p>
              <p className="text-dreams-lilac-light text-sm">
                {!token 
                  ? 'Entre em sua conta para usar esta máquina' 
                  : 'Você precisa de um plano ativo para usar esta máquina'}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-white">{vm.name}</h3>
            <span className="px-3 py-1 rounded-full text-sm bg-dreams-blue/20 text-dreams-blue-light">
              {vm.type === 'shared' ? 'Standard' : 'Premium'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-dreams-lilac-light">
                <Cpu className="w-5 h-5" />
                <span>{vm.specs.cpu}</span>
              </div>
              <div className="flex items-center gap-2 text-dreams-lilac-light">
                <CircuitBoard className="w-5 h-5" />
                <span>{vm.specs.ram}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-dreams-lilac-light">
                <MonitorPlay className="w-5 h-5" />
                <span>{vm.specs.gpu}</span>
              </div>
              <div className="flex items-center gap-2 text-dreams-lilac-light">
                <HardDrive className="w-5 h-5" />
                <span>{vm.specs.storage}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-dreams-lilac-light">
            <Save className="w-5 h-5" />
            <span>{vm.specs.storage_info}</span>
          </div>

          {vmStatus?.status === 'running' ? (
            <Button 
              onClick={handleStopClick}
              className="w-full py-4 text-lg font-medium text-black bg-gradient-to-r from-red-400 to-red-500"
            >
              Parar Máquina
            </Button>
          ) : (
            <Button 
              onClick={handleStartClick}
              className="w-full py-4 text-lg font-medium text-black bg-gradient-to-r from-dreams-blue to-dreams-lilac"
            >
              {!token 
                ? 'Fazer Login para Iniciar' 
                : !currentSubscription?.status === 'active' 
                  ? 'Adquirir Plano' 
                  : 'Iniciar Máquina'}
            </Button>
          )}
        </div>
      </div>

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        message="Faça login para iniciar sua máquina virtual."
        onLogin={() => {
          setLoginPromptOpen(false);
          document.dispatchEvent(new CustomEvent('open-auth-modal'));
        }}
      />
    </>
  );
}