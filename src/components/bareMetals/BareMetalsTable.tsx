import { useEffect } from 'react';
import { useVMStore } from '../../stores/vmStore';
import { useToast } from '../../hooks/useToast';
import { BareMetal } from '../../services/bareMetals';
import { Loader2 } from 'lucide-react';

interface BareMetalsTableProps {
  bareMetals: BareMetal[];
  onRefresh: () => void;
}

export function BareMetalsTable({ bareMetals, onRefresh }: BareMetalsTableProps) {
  const { queuePositions = {}, error } = useVMStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        title: 'Erro',
        description: error
      });
    }
  }, [error, showToast]);

  const getVMStatusColor = (active: number = 0, total: number) => {
    const percentage = (active / total) * 100;
    if (percentage <= 50) return 'bg-green-500/20 text-green-400';
    if (percentage <= 90) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  if (!bareMetals || bareMetals.length === 0) {
    return (
      <div className="text-center py-8 text-dreams-lilac-light">
        Nenhum servidor cadastrado
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dreams-lilac/10">
            <th className="text-left py-3 text-dreams-lilac-light">Nome</th>
            <th className="text-left py-3 text-dreams-lilac-light">IP</th>
            <th className="text-left py-3 text-dreams-lilac-light">Status</th>
            <th className="text-left py-3 text-dreams-lilac-light">VMs Ativas</th>
            <th className="text-left py-3 text-dreams-lilac-light">Fila</th>
          </tr>
        </thead>
        <tbody>
          {bareMetals.map((bm) => (
            <tr key={bm.id} className="border-b border-dreams-lilac/10">
              <td className="py-3 text-white">{bm.name}</td>
              <td className="py-3 text-dreams-lilac-light">{bm.ipAddress}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  bm.status === 'ACTIVE'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {bm.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  getVMStatusColor(bm.activeVms, bm.vmCount)
                }`}>
                  {bm.activeVms ?? 0} / {bm.vmCount}
                </span>
              </td>
              <td className="py-3 text-dreams-lilac-light">
                {queuePositions[bm.id] ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-dreams-blue/20 text-dreams-blue-light">
                    {queuePositions[bm.id]} na fila
                  </span>
                ) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}