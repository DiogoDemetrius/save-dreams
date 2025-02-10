import { useEffect, useState } from 'react';
import { Monitor, Lock } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { VMCard } from '../VMCard';
import { vmService } from '../../services/vm.service';
import { useAuthStore } from '../../stores/authStore';
import { useSubscriptionStore } from '../../stores/subscriptionStore';
import type { VirtualMachine } from '../../types';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

interface VMSectionProps {
  onVMSelect: (vmName: string) => void;
}

export function VMSection({ onVMSelect }: VMSectionProps) {
  const [vms, setVMs] = useState<VirtualMachine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const { currentSubscription } = useSubscriptionStore();

  useEffect(() => {
    const loadVMs = async () => {
      if (!token || !currentSubscription?.status === 'active') {
        setIsLoading(false);
        return;
      }

      try {
        const bareMetalId = '1'; // Default bare metal ID
        const loadedVMs = await vmService.getVMs(bareMetalId);
        setVMs(loadedVMs);
      } catch (error) {
        console.error('Error loading VMs:', error);
        toast.error('Não foi possível carregar as máquinas virtuais');
      } finally {
        setIsLoading(false);
      }
    };

    loadVMs();
  }, [token, currentSubscription]);

  // Se o usuário não estiver logado ou não tiver assinatura ativa
  if (!token || !currentSubscription?.status === 'active') {
    return (
      <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-black/40 rounded-3xl p-8 border border-dreams-lilac/10 max-w-2xl mx-auto">
            <Lock className="w-12 h-12 text-dreams-lilac-light mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {!token 
                ? 'Faça login para acessar suas máquinas virtuais'
                : 'Você precisa de um plano ativo para acessar suas máquinas virtuais'}
            </h3>
            <p className="text-dreams-lilac-light mb-6">
              {!token 
                ? 'Entre em sua conta para ter acesso a todas as funcionalidades.'
                : 'Escolha um plano que melhor atenda suas necessidades.'}
            </p>
            <Button
              onClick={() => {
                if (!token) {
                  document.dispatchEvent(new CustomEvent('open-auth-modal'));
                } else {
                  document.getElementById('access-plans')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-dreams-blue to-dreams-lilac text-black 
                hover:opacity-90 transition-opacity"
            >
              {!token ? 'Fazer Login' : 'Ver Planos'}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-dreams-lilac/10 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-dreams-lilac/10 rounded w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[1, 2].map((i) => (
                <div key={i} className="h-96 bg-dreams-lilac/10 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="vm-section" className="py-16 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionTitle icon={Monitor}>Ligue sua Máquina</SectionTitle>
          <p className="text-dreams-lilac-light max-w-2xl mx-auto">
            Inicie suas máquinas virtuais de alto desempenho com apenas um clique.
            Perfeito para jogos e aplicações que exigem poder computacional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vms.map((vm) => (
            <VMCard 
              key={vm.id} 
              vm={vm} 
              onStart={() => onVMSelect(vm.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}