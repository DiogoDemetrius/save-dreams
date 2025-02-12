import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { User, UpdateUserIds } from '../../services/users';
import { EditUserModal } from './EditUserModal';

interface UsersTableProps {
  users: User[];
  onUpdateUser: (userId: string, ids: UpdateUserIds) => Promise<void>;
}

export function UsersTable({ users, onUpdateUser }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dreams-lilac/10">
              <th className="text-left py-3 text-dreams-lilac-light">Nome</th>
              <th className="text-left py-3 text-dreams-lilac-light">Email</th>
              <th className="text-left py-3 text-dreams-lilac-light">VM ID</th>
              <th className="text-left py-3 text-dreams-lilac-light">BM ID</th>
              <th className="text-left py-3 text-dreams-lilac-light">Cliente ID</th>
              <th className="text-left py-3 text-dreams-lilac-light">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-dreams-lilac/10">
                <td className="py-3 text-white">{user.name}</td>
                <td className="py-3 text-dreams-lilac-light">{user.email}</td>
                <td className="py-3 text-dreams-lilac-light">{user.vmId || '-'}</td>
                <td className="py-3 text-dreams-lilac-light">{user.bmId || '-'}</td>
                <td className="py-3 text-dreams-lilac-light">{user.clientId || '-'}</td>
                <td className="py-3">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="p-2 text-dreams-blue-light hover:bg-dreams-blue/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <EditUserModal
          isOpen={true}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          onSave={onUpdateUser}
        />
      )}
    </>
  );
}