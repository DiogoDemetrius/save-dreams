import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { User, UpdateUserIds } from '../../services/users';
import { BareMetal } from '../../services/bareMetals';
import { AlertCircle } from 'lucide-react';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (userId: string, ids: UpdateUserIds) => Promise<void>;
}

const VM_OPTIONS = ['VM01', 'VM02', 'VM03', 'VM04', 'VM05', 'VM06'];

export function EditUserModal({ isOpen, onClose, user, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<UpdateUserIds>({
    vmId: user.vmId || '',
    bmId: user.bmId || '',
    clientId: user.clientId || ''
  });
  const [bareMetals, setBareMetals] = useState<BareMetal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, fetch this from the API
    setBareMetals([
      { id: 'BM001', name: 'Servidor SP-01', status: 'ACTIVE' },
      { id: 'BM002', name: 'Servidor RJ-01', status: 'ACTIVE' }
    ] as BareMetal[]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSave(user.id, formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar usuário');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar IDs do Usuário">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              VM ID
            </label>
            <select
              value={formData.vmId}
              onChange={(e) => setFormData({ ...formData, vmId: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
            >
              <option value="">Selecione uma VM...</option>
              {VM_OPTIONS.map((vm) => (
                <option key={vm} value={vm}>{vm}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Bare Metal
            </label>
            <select
              value={formData.bmId}
              onChange={(e) => setFormData({ ...formData, bmId: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
            >
              <option value="">Selecione um servidor...</option>
              {bareMetals.map((bm) => (
                <option key={bm.id} value={bm.id}>
                  {bm.name} ({bm.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Cliente ID
            </label>
            <input
              type="text"
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
              placeholder="Ex: CLT001"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="bg-dreams-bg-dark hover:bg-dreams-bg-light text-dreams-lilac-light"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}