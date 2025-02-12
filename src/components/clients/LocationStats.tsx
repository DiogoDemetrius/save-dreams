import { useClients } from '../../hooks/useClients';
import { states } from '../../utils/states';

export function LocationStats() {
  const { clients } = useClients();

  const stateCounts = clients.reduce((acc, client) => {
    acc[client.state] = (acc[client.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topStates = Object.entries(stateCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {topStates.map(([uf, count]) => {
        const stateName = states.find(s => s.uf === uf)?.name || uf;
        const percentage = (count / clients.length) * 100;
        
        return (
          <div key={uf} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dreams-lilac-light">{stateName}</span>
              <span className="text-white">{count} clientes</span>
            </div>
            <div className="h-2 bg-dreams-bg-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-dreams-blue to-dreams-lilac"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}