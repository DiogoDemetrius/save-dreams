import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { UsersTable } from '../components/users/UsersTable';
import { Loader2 } from 'lucide-react';
import { usersService, User, UpdateUserIds } from '../services/users';
import { useToast } from '../hooks/useToast';

export function UsersView() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await usersService.list();
      setUsers(data);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erro ao carregar usuários',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (userId: string, ids: UpdateUserIds) => {
    try {
      setIsUpdating(true);
      const updatedUser = await usersService.updateIds(userId, ids);
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
      showToast({
        type: 'success',
        title: 'Usuário atualizado',
        description: 'As informações foram atualizadas com sucesso'
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erro ao atualizar usuário',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-dreams-blue-light animate-spin" />
          <p className="text-dreams-lilac-light">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Gerenciar Usuários</h1>

      <Card title="Lista de Usuários">
        <UsersTable 
          users={users}
          onUpdateUser={handleUpdateUser}
          isUpdating={isUpdating}
        />
      </Card>
    </div>
  );
}