import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useClients } from '../../hooks/useClients';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
}

export function PasswordChangeModal({ isOpen, onClose, clientId }: PasswordChangeModalProps) {
  const { changePassword } = useClients();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await changePassword(clientId, newPassword);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Alterar Senha">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
            Nova Senha
          </label>
          <input
            type="text" // Using type="text" to show the password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="bg-dreams-bg-dark hover:bg-dreams-bg-light text-dreams-lilac-light"
          >
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Nova Senha
          </Button>
        </div>
      </form>
    </Modal>
  );
}