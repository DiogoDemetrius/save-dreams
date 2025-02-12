import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HardDrive, Server, RefreshCw } from 'lucide-react';
import { WindowsImageModal } from '../components/settings/WindowsImageModal';
import { VMManagement } from '../components/settings/VMManagement';
import { useBareMetals } from '../hooks/useBareMetals';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui/Toast';

export function SettingsView() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { bareMetals, refreshBareMetals } = useBareMetals();
  const { toast, showToast, hideToast } = useToast();

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

  const stats = {
    totalMachines: bareMetals.length,
    activeMachines: bareMetals.filter(bm => bm.status === 'ACTIVE').length,
    totalVMs: bareMetals.reduce((acc, bm) => acc + bm.vmCount, 0),
    activeVMs: bareMetals.reduce((acc, bm) => acc + (bm.activeVms || 0), 0)
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Configurações</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Status do Sistema">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-white">{stats.totalMachines}</p>
                <p className="text-sm text-dreams-lilac-light">Total de Servidores</p>
              </div>
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{stats.activeMachines}</p>
                <p className="text-sm text-dreams-lilac-light">Servidores Ativos</p>
              </div>
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-white">{stats.totalVMs}</p>
                <p className="text-sm text-dreams-lilac-light">Total de VMs</p>
              </div>
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{stats.activeVMs}</p>
                <p className="text-sm text-dreams-lilac-light">VMs Ativas</p>
              </div>
            </div>

            <Button onClick={handleRefresh} className="w-full">
              <RefreshCw size={20} className="mr-2" />
              Atualizar Status
            </Button>
          </div>
        </Card>

        <Card title="Imagem do Windows">
          <div className="space-y-6">
            <div className="p-4 bg-dreams-bg-dark rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-dreams-lilac-light">Versão Atual:</span>
                <span className="text-white font-medium">Windows 10 Pro 21H2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dreams-lilac-light">Última Atualização:</span>
                <span className="text-white font-medium">15/03/2024</span>
              </div>
            </div>

            <Button 
              onClick={() => setIsImageModalOpen(true)}
              className="w-full"
            >
              <HardDrive size={20} className="mr-2" />
              Gerenciar Imagem do Windows
            </Button>
          </div>
        </Card>
      </div>

      <VMManagement bareMetals={bareMetals} onRefresh={handleRefresh} />

      <WindowsImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
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