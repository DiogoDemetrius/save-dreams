import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Server, RefreshCw } from 'lucide-react';
import { BareMetalsTable } from '../components/bareMetals/BareMetalsTable';
import { OnlineMachinesTable } from '../components/bareMetals/OnlineMachinesTable';
import { CreateBareMetalModal } from '../components/bareMetals/CreateBareMetalModal';
import { useBareMetals } from '../hooks/useBareMetals';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui/Toast';
import { CreateBareMetalData } from '../services/bareMetals';

export function BareMetalsView() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { bareMetals, isLoading, error, createBareMetal, refreshBareMetals } = useBareMetals();
  const { toast, showToast, hideToast } = useToast();

  const handleCreateBareMetal = async (data: CreateBareMetalData) => {
    try {
      await createBareMetal(data);
      setIsCreateModalOpen(false);
      showToast({
        type: 'success',
        title: 'Servidor criado com sucesso',
        description: `O servidor ${data.name} foi adicionado à lista.`
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Erro ao criar servidor',
        description: err instanceof Error ? err.message : 'Tente novamente mais tarde.'
      });
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshBareMetals();
      showToast({
        type: 'success',
        title: 'Dados atualizados',
        description: 'As informações dos servidores foram atualizadas.'
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar os dados dos servidores.'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-dreams-lilac-light">Carregando servidores...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gerenciar Servidores</h1>
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            onClick={handleRefresh}
            className="bg-dreams-bg-dark hover:bg-dreams-bg-light"
          >
            <RefreshCw size={20} className="mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Server size={20} className="mr-2" />
            Adicionar Servidor
          </Button>
        </div>
      </div>

      <Card title="Máquinas Online">
        <OnlineMachinesTable />
      </Card>

      <Card title="Lista de Servidores">
        <BareMetalsTable 
          bareMetals={bareMetals} 
          onRefresh={handleRefresh}
        />
      </Card>

      <CreateBareMetalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateBareMetal}
      />

      <Toast
        open={toast.open}
        onOpenChange={hideToast}
        title={toast.title}
        description={toast.description}
        type={toast.type}
      />
    </div>
  );
}