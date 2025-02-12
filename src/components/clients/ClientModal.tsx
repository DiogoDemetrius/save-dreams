import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useClients } from '../../hooks/useClients';
import { Clock, MapPin, Wifi, Key } from 'lucide-react';
import { Button } from '../ui/Button';
import { PasswordChangeModal } from './PasswordChangeModal';

interface ClientModalProps {
  clientId: string;
  onClose: () => void;
}

export function ClientModal({ clientId, onClose }: ClientModalProps) {
  const { clients } = useClients();
  const client = clients.find(c => c.id === clientId);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (!client) return null;

  const getPlanBadgeStyle = (plan: string) => {
    switch (plan) {
      case 'PREMIUM':
        return 'bg-dreams-blue/20 text-dreams-blue-light';
      case 'STANDARD':
        return 'bg-dreams-lilac/20 text-dreams-lilac-light';
      case 'DAILY':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-dreams-lilac/20 text-dreams-lilac-light';
    }
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} title="Detalhes do Cliente">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{client.name}</h3>
              <p className="text-dreams-lilac-light">{client.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeStyle(client.plan)}`}>
                {client.plan}
              </span>
              <span className="text-dreams-lilac-light text-sm">•</span>
              <span className="text-dreams-lilac-light text-sm">
                {client.daysRemaining} {client.plan === 'DAILY' ? 'horas' : 'dias'} restantes
              </span>
            </div>

            {/* Rest of the component remains the same */}
          </div>
        </div>
      </Modal>

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        clientId={clientId}
      />
    </>
  );
}