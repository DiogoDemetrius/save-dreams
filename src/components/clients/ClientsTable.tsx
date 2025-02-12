import { useState } from 'react';
import { Edit2, Eye, Clock } from 'lucide-react';
import { ClientModal } from './ClientModal';
import { EditUserModal } from '../users/EditUserModal';
import { EditPlanModal } from '../users/EditPlanModal';
import { User, UpdateUserIds, UpdateUserPlan } from '../../services/users';

interface ClientsTableProps {
  users: User[];
  onUpdateUser: (userId: string, ids: UpdateUserIds) => Promise<void>;
  onUpdatePlan: (userId: string, planData: UpdateUserPlan) => Promise<void>;
  searchTerm: string;
  selectedState: string;
}

export function ClientsTable({ 
  users, 
  onUpdateUser, 
  onUpdatePlan,
  searchTerm, 
  selectedState 
}: ClientsTableProps) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToEditPlan, setUserToEditPlan] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesSearch;
  });

  const getPlanStatusColor = (daysRemaining: number) => {
    if (daysRemaining <= 0) return 'bg-red-500/20 text-red-400';
    if (daysRemaining <= 5) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-green-500/20 text-green-400';
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dreams-lilac/10">
              <th className="text-left py-3 text-dreams-lilac-light">Nome</th>
              <th className="text-left py-3 text-dreams-lilac-light">Email</th>
              <th className="text-left py-3 text-dreams-lilac-light">Plano</th>
              <th className="text-left py-3 text-dreams-lilac-light">Dias Restantes</th>
              <th className="text-left py-3 text-dreams-lilac-light">VM ID</th>
              <th className="text-left py-3 text-dreams-lilac-light">BM ID</th>
              <th className="text-left py-3 text-dreams-lilac-light">Cliente ID</th>
              <th className="text-left py-3 text-dreams-lilac-light">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-dreams-lilac/10">
                <td className="py-3 text-white">{user.name}</td>
                <td className="py-3 text-dreams-lilac-light">{user.email}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.plan === 'PREMIUM' 
                      ? 'bg-dreams-blue/20 text-dreams-blue-light'
                      : 'bg-dreams-lilac/20 text-dreams-lilac-light'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    getPlanStatusColor(user.planDaysRemaining)
                  }`}>
                    {user.planDaysRemaining} dias
                  </span>
                </td>
                <td className="py-3 text-dreams-lilac-light">{user.vmId || '-'}</td>
                <td className="py-3 text-dreams-lilac-light">{user.bmId || '-'}</td>
                <td className="py-3 text-dreams-lilac-light">{user.clientId || '-'}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUserToEditPlan(user)}
                      className="p-2 text-dreams-blue-light hover:bg-dreams-blue/10 rounded-lg transition-colors"
                      title="Gerenciar Plano"
                    >
                      <Clock size={18} />
                    </button>
                    <button
                      onClick={() => setUserToEdit(user)}
                      className="p-2 text-dreams-blue-light hover:bg-dreams-blue/10 rounded-lg transition-colors"
                      title="Editar IDs"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => setSelectedClient(user.id)}
                      className="p-2 text-dreams-blue-light hover:bg-dreams-blue/10 rounded-lg transition-colors"
                      title="Ver detalhes"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-dreams-lilac-light">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      {selectedClient && (
        <ClientModal
          clientId={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      {userToEdit && (
        <EditUserModal
          isOpen={true}
          onClose={() => setUserToEdit(null)}
          user={userToEdit}
          onSave={onUpdateUser}
        />
      )}

      {userToEditPlan && (
        <EditPlanModal
          isOpen={true}
          onClose={() => setUserToEditPlan(null)}
          user={userToEditPlan}
          onSave={onUpdatePlan}
        />
      )}
    </>
  );
}