import { X } from 'lucide-react';

export function ActiveUsersTable() {
  const activeUsers = [
    {
      id: '1',
      name: 'João Silva',
      plan: 'PRIORITY',
      machine: 'VM-PRO-01',
      startTime: '19:30',
      duration: '1h 23min'
    },
    // ... mais usuários
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dreams-lilac/10">
            <th className="text-left py-3 text-dreams-lilac-light">Usuário</th>
            <th className="text-left py-3 text-dreams-lilac-light">Plano</th>
            <th className="text-left py-3 text-dreams-lilac-light">Máquina</th>
            <th className="text-left py-3 text-dreams-lilac-light">Início</th>
            <th className="text-left py-3 text-dreams-lilac-light">Duração</th>
            <th className="text-left py-3 text-dreams-lilac-light">Ação</th>
          </tr>
        </thead>
        <tbody>
          {activeUsers.map((user) => (
            <tr key={user.id} className="border-b border-dreams-lilac/10">
              <td className="py-3 text-white">{user.name}</td>
              <td className="py-3">
                <span className="px-2 py-1 rounded-full text-xs bg-dreams-blue/20 text-dreams-blue-light">
                  {user.plan}
                </span>
              </td>
              <td className="py-3 text-dreams-lilac-light">{user.machine}</td>
              <td className="py-3 text-dreams-lilac-light">{user.startTime}</td>
              <td className="py-3 text-dreams-lilac-light">{user.duration}</td>
              <td className="py-3">
                <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}