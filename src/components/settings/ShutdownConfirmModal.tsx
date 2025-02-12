import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ShutdownConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'hyperv' | 'proxmox' | null;
}

export function ShutdownConfirmModal({ isOpen, onClose, platform }: ShutdownConfirmModalProps) {
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const platformName = platform === 'hyperv' ? 'Hyper-V (Compartilhadas)' : 'Proxmox (Dedicadas)';

  const handleShutdown = async () => {
    if (confirmText !== 'DESLIGAR') return;
    
    setIsShuttingDown(true);
    try {
      // Implementar integração com backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      onClose();
    } finally {
      setIsShuttingDown(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Confirmar Desligamento - ${platformName}`}>
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <p className="text-red-500 font-medium">
              Você está prestes a desligar todas as máquinas virtuais {platformName}
            </p>
            <p className="text-red-400/80 text-sm">
              Esta ação irá encerrar todas as sessões ativas e pode resultar em perda de dados
              não salvos pelos usuários.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dreams-lilac-light">
            Digite "DESLIGAR" para confirmar
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-red-500 outline-none"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-dreams-lilac-light hover:text-white transition-colors"
            disabled={isShuttingDown}
          >
            Cancelar
          </button>
          <button
            onClick={handleShutdown}
            disabled={confirmText !== 'DESLIGAR' || isShuttingDown}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isShuttingDown ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Desligando...
              </>
            ) : (
              'Confirmar Desligamento'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}