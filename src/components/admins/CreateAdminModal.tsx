import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useAdmins } from '../../hooks/useAdmins';

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAdminModal({ isOpen, onClose }: CreateAdminModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    permissions: {
      clients: false,
      finance: false,
      settings: false
    }
  });

  const { createAdmin } = useAdmins();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAdmin({
      ...formData,
      permissions: Object.entries(formData.permissions)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Administrador">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dreams-lilac-light">
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dreams-lilac-light">
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dreams-lilac-light">
            Permissões
          </label>
          <div className="space-y-2">
            {Object.entries(formData.permissions).map(([key, value]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setFormData({
                    ...formData,
                    permissions: {
                      ...formData.permissions,
                      [key]: e.target.checked
                    }
                  })}
                  className="rounded border-dreams-lilac/10 text-dreams-blue-light focus:ring-dreams-blue-light"
                />
                <span className="text-dreams-lilac-light capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-dreams-lilac-light hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-dreams-blue to-dreams-lilac text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Criar Administrador
          </button>
        </div>
      </form>
    </Modal>
  );
}