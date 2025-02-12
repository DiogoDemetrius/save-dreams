import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { states } from '../../utils/states';
import { useClients } from '../../hooks/useClients';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClientModal({ isOpen, onClose }: CreateClientModalProps) {
  const { createClient } = useClients();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'DAILY',
    state: '',
    city: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createClient(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Novo Cliente">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Nome Completo
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
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Senha
            </label>
            <input
              type="text"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Plano
            </label>
            <select
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
              required
            >
              <option value="DAILY">Daily</option>
              <option value="STANDARD">Standard</option>
              <option value="PREMIUM">Premium</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
                Estado
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
                required
              >
                <option value="">Selecione...</option>
                {states.map(state => (
                  <option key={state.uf} value={state.uf}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
                Cidade
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="bg-dreams-bg-dark hover:bg-dreams-bg-light text-dreams-lilac-light"
          >
            Cancelar
          </Button>
          <Button type="submit">
            Criar Cliente
          </Button>
        </div>
      </form>
    </Modal>
  );
}