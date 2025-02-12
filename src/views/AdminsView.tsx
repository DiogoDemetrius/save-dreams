import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { AdminsTable } from '../components/admins/AdminsTable';
import { CreateAdminModal } from '../components/admins/CreateAdminModal';
import { UserPlus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function AdminsView() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Administradores</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <UserPlus size={20} className="mr-2" />
          Novo Administrador
        </Button>
      </div>

      <Card title="Lista de Administradores">
        <AdminsTable />
      </Card>

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}