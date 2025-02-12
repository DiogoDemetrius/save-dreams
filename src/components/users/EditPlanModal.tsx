import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { User, UpdateUserPlan, PlanType } from '../../services/users';

interface EditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (userId: string, planData: UpdateUserPlan) => Promise<void>;
}

export function EditPlanModal({ isOpen, onClose, user, onSave }: EditPlanModalProps) {
  const [formData, setFormData] = useState<UpdateUserPlan>({
    plan: user.plan,
    daysToAdd: 30
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(user.id, formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerenciar Plano do Usuário">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Plano
            </label>
            <select
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value as PlanType })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
            >
              <option value="DAILY">Daily</option>
              <option value="STANDARD">Standard</option>
              <option value="PREMIUM">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Dias a Adicionar
            </label>
            <input
              type="number"
              min="1"
              value={formData.daysToAdd}
              onChange={(e) => setFormData({ ...formData, daysToAdd: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
            />
          </div>

          <div className="p-4 bg-dreams-bg-dark rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dreams-lilac-light">Plano Atual:</span>
              <span className="text-white">{user.plan}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dreams-lilac-light">Dias Restantes:</span>
              <span className="text-white">{user.planDaysRemaining} dias</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dreams-lilac-light">Data de Início:</span>
              <span className="text-white">{user.planStartDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dreams-lilac-light">Data de Término:</span>
              <span className="text-white">{user.planEndDate}</span>
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
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Modal>
  );
}