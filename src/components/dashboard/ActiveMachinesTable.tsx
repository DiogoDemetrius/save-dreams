import { useEffect, useCallback } from 'react';
import { useVMStore } from '../../stores/vmStore';
import { useToast } from '../../hooks/useToast';
import { Loader2 } from 'lucide-react';

export function ActiveMachinesTable() {
  const { activeVMs, isLoading, error, fetchActiveVMs } = useVMStore();
  const { showToast } = useToast();

  const loadVMs = useCallback(async () => {
    try {
      await fetchActiveVMs();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Erro',
        description: err instanceof Error ? err.message : 'Não foi possível carregar as máquinas ativas.'
      });
    }
  }, [fetchActiveVMs, showToast]);

  useEffect(() => {
    loadVMs();
    const interval = setInterval(loadVMs, 30000);
    return () => clearInterval(interval);
  }, [loadVMs]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 text-dreams-blue-light animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="text-red-400">{error}</div>
        <button
          onClick={loadVMs}
          className="px-4 py-2 text-sm bg-dreams-bg-dark hover:bg-dreams-bg-light text-dreams-lilac-light rounded-lg transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

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
          </tr>
        </thead>
        <tbody>
          {activeVMs.map((vm) => (
            <tr key={vm.id} className="border-b border-dreams-lilac/10">
              <td className="py-3 text-white">{vm.userName}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  vm.plan === 'DEDICADA' 
                    ? 'bg-dreams-blue/20 text-dreams-blue-light'
                    : 'bg-dreams-lilac/20 text-dreams-lilac-light'
                }`}>
                  {vm.plan}
                </span>
              </td>
              <td className="py-3 text-dreams-lilac-light">{vm.machine}</td>
              <td className="py-3 text-dreams-lilac-light">{vm.startTime}</td>
              <td className="py-3 text-dreams-lilac-light">{vm.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeVMs.length === 0 && (
        <div className="text-center py-8 text-dreams-lilac-light">
          Nenhuma máquina ativa no momento
        </div>
      )}
    </div>
  );
}