import { useState, useEffect } from 'react';
import { ClientsTable } from '../components/clients/ClientsTable';
import { ClientsFilter } from '../components/clients/ClientsFilter';
import { LocationStats } from '../components/clients/LocationStats';
import { CreateClientModal } from '../components/clients/CreateClientModal';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UserPlus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { UpdateUserIds, UpdateUserPlan } from '../services/users';

export function ClientsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { users, isLoading, error, loadUsers, updateUserIds, updateUserPlan } = useUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleUpdateUser = async (userId: string, ids: UpdateUserIds) => {
    try {
      await updateUserIds(userId, ids);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleUpdatePlan = async (userId: string, planData: UpdateUserPlan) => {
    try {
      await updateUserPlan(userId, planData);
    } catch (error) {
      console.error('Error updating user plan:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-dreams-lilac-light">Carregando clientes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Clientes</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <UserPlus size={20} className="mr-2" />
          Novo Cliente
        </Button>
      </div>
      
      <ClientsFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedState={selectedState}
        onStateChange={setSelectedState}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Lista de Clientes">
            <ClientsTable 
              users={users}
              onUpdateUser={handleUpdateUser}
              onUpdatePlan={handleUpdatePlan}
              searchTerm={searchTerm}
              selectedState={selectedState}
            />
          </Card>
        </div>

        <div>
          <Card title="Distribuição por Estado">
            <LocationStats />
          </Card>
        </div>
      </div>

      <CreateClientModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}