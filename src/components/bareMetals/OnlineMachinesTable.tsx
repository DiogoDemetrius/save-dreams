import { useEffect } from 'react';
import { useVMStore } from '../../stores/vmStore';
import { PowerOff, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

export function OnlineMachinesTable() {
  const { onlineVMs, error, isStoppingVM, fetchOnlineVMs, stopVM } = useVMStore();
  const { showToast } = useToast();

  useEffect(() => {
    fetchOnlineVMs();
    const interval = setInterval(fetchOnlineVMs, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchOnlineVMs]);

  const handleStopVM = async (vmId: string, clientName: string) => {
    if (!confirm(`Tem certeza que deseja desligar a máquina do cliente ${clientName}?`)) {
      return;
    }

    try {
      await stopVM(vmId);
      showToast({
        type: 'success',
        title: 'Máquina desligada',
        description: `A máquina do cliente ${clientName} está sendo desligada.`
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erro ao desligar máquina',
        description: error instanceof Error ? error.message : 'Tente novamente mais tarde'
      });
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchOnlineVMs();
      showToast({
        type: 'success',
        title: 'Lista atualizada',
        description: 'A lista de máquinas foi atualizada.'
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar a lista de máquinas.'
      });
    }
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
        <Button onClick={handleRefresh} variant="secondary">
          <RefreshCw size={18} className="mr-2" />
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleRefresh} variant="secondary">
          <RefreshCw size={18} className="mr-2" />
          Atualizar Lista
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dreams-lilac/10">
              <th className="text-left py-3 text-dreams-lilac-light">Máquina</th>
              <th className="text-left py-3 text-dreams-lilac-light">Cliente</th>
              <th className="text-left py-3 text-dreams-lilac-light">Plano</th>
              <th className="text-left py-3 text-dreams-lilac-light">Início</th>
              <th className="text-left py-3 text-dreams-lilac-light">Duração</th>
              <th className="text-left py-3 text-dreams-lilac-light">Status</th>
              <th className="text-left py-3 text-dreams-lilac-light">Ações</th>
            </tr>
          </thead>
          <tbody>
            {onlineVMs.map((vm) => (
              <tr key={vm.vmId} className="border-b border-dreams-lilac/10">
                <td className="py-3 text-white">{vm.vmId}</td>
                <td className="py-3">
                  <div>
                    <p className="text-white">{vm.clientName}</p>
                    <p className="text-sm text-dreams-lilac-light">{vm.clientEmail}</p>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    vm.plan === 'DEDICADA' 
                      ? 'bg-dreams-blue/20 text-dreams-blue-light'
                      : 'bg-dreams-lilac/20 text-dreams-lilac-light'
                  }`}>
                    {vm.plan}
                  </span>
                </td>
                <td className="py-3 text-dreams-lilac-light">{vm.startTime}</td>
                <td className="py-3 text-dreams-lilac-light">{vm.duration}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    vm.status === 'ACTIVE'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {vm.status === 'ACTIVE' ? 'Ativa' : 'Desligando'}
                  </span>
                </td>
                <td className="py-3">
                  <Button
                    onClick={() => handleStopVM(vm.vmId, vm.clientName)}
                    disabled={vm.status !== 'ACTIVE' || isStoppingVM}
                    className="bg-red-500 hover:bg-red-600 disabled:bg-red-500/50"
                    title={
                      vm.status !== 'ACTIVE' 
                        ? 'Máquina já está sendo desligada'
                        : 'Desligar máquina'
                    }
                  >
                    {isStoppingVM ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <PowerOff className="w-4 h-4" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {onlineVMs.length === 0 && (
          <div className="text-center py-8 text-dreams-lilac-light">
            Nenhuma máquina online no momento
          </div>
        )}
      </div>
    </div>
  );
}