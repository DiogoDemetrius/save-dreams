import { useState } from 'react';
import { Trash2, Shield } from 'lucide-react';
import { useAdmins } from '../../hooks/useAdmins';

export function AdminsTable() {
  const { admins, removeAdmin } = useAdmins();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dreams-lilac/10">
            <th className="text-left py-3 text-dreams-lilac-light">Nome</th>
            <th className="text-left py-3 text-dreams-lilac-light">Email</th>
            <th className="text-left py-3 text-dreams-lilac-light">Permissões</th>
            <th className="text-left py-3 text-dreams-lilac-light">Ações</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b border-dreams-lilac/10">
              <td className="py-3 text-white">{admin.name}</td>
              <td className="py-3 text-dreams-lilac-light">{admin.email}</td>
              <td className="py-3">
                <div className="flex gap-2">
                  {admin.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 rounded-full text-xs bg-dreams-blue/20 text-dreams-blue-light"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3">
                <button
                  onClick={() => removeAdmin(admin.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  disabled={admin.isOwner}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}