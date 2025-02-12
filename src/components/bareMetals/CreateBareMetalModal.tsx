import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CreateBareMetalData } from '../../services/bareMetals';
import { AlertCircle } from 'lucide-react';

interface CreateBareMetalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateBareMetalData) => Promise<void>;
}

export function CreateBareMetalModal({ isOpen, onClose, onCreate }: CreateBareMetalModalProps) {
  const [formData, setFormData] = useState<CreateBareMetalData & { description?: string }>({
    name: '',
    ipAddress: '',
    status: 'ACTIVE',
    vmCount: 1,
    description: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onCreate(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidIp = (ip: string) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    return ip.split('.').every(num => parseInt(num) >= 0 && parseInt(num) <= 255);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      isValidIp(formData.ipAddress) &&
      formData.vmCount > 0
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Bare Metal">
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
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Endereço IP
            </label>
            <input
              type="text"
              value={formData.ipAddress}
              onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
              placeholder="192.168.1.10"
              required
            />
            {formData.ipAddress && !isValidIp(formData.ipAddress) && (
              <p className="mt-1 text-sm text-red-400">
                Digite um endereço IP válido (ex: 192.168.1.10)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Descrição (opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none resize-none"
              rows={3}
              placeholder="Adicione uma descrição para o servidor..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ACTIVE' | 'INACTIVE' })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
            >
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Quantidade Máxima de VMs
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.vmCount}
              onChange={(e) => setFormData({ ...formData, vmCount: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
              required
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
          <Button type="submit" disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Bare Metal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}