import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PowerOff, RefreshCw } from 'lucide-react';
import { ShutdownConfirmModal } from './ShutdownConfirmModal';
import { BareMetal } from '../../services/bareMetals';

interface VMManagementProps {
  bareMetals: BareMetal[];
  onRefresh: () => void;
}

export function VMManagement({ bareMetals, onRefresh }: VMManagementProps) {
  const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'hyperv' | 'proxmox' | null>(null);

  const hypervStats = {
    total: bareMetals.length,
    active: bareMetals.filter(bm => bm.status === 'ACTIVE').length,
    offline: bareMetals.filter(bm => bm.status === 'INACTIVE').length
  };

  const proxmoxStats = {
    total: 0,
    active: 0,
    offline: 0
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hyper-V */}
        <Card title="Hyper-V (VMs Compartilhadas)">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-white">{hypervStats.total}</p>
                <p className="text-sm text-dreams-lilac-light">Total</p>
              </div>
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{hypervStats.active}</p>
                <p className="text-sm text-dreams-lilac-light">Ativas</p>
              </div>
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-red-400">{hypervStats.offline}</p>
                <p className="text-sm text-dreams-lilac-light">Offline</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  setSelectedPlatform('hyperv');
                  setIsShutdownModalOpen(true);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                <PowerOff size={20} className="mr-2" />
                Desligar Todas
              </Button>
              <Button onClick={onRefresh} className="flex-1">
                <RefreshCw size={20} className="mr-2" />
                Reiniciar Serviço
              </Button>
            </div>
          </div>
        </Card>

        {/* Proxmox */}
        <Card title="Proxmox (VMs Dedicadas)">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-white">{proxmoxStats.total}</p>
                <p className="text-sm text-dreams-lilac-light">Total</p>
              </div>
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{proxmoxStats.active}</p>
                <p className="text-sm text-dreams-lilac-light">Ativas</p>
              </div>
              <div className="p-4 bg-dreams-bg-dark rounded-lg text-center">
                <p className="text-2xl font-bold text-red-400">{proxmoxStats.offline}</p>
                <p className="text-sm text-dreams-lilac-light">Offline</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  setSelectedPlatform('proxmox');
                  setIsShutdownModalOpen(true);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                <PowerOff size={20} className="mr-2" />
                Desligar Todas
              </Button>
              <Button onClick={onRefresh} className="flex-1">
                <RefreshCw size={20} className="mr-2" />
                Reiniciar Serviço
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <ShutdownConfirmModal
        isOpen={isShutdownModalOpen}
        onClose={() => {
          setIsShutdownModalOpen(false);
          setSelectedPlatform(null);
        }}
        platform={selectedPlatform}
      />
    </div>
  );
}