import { useState, useEffect } from 'react';
import { Users, UserCheck, Monitor } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useVMStore } from '../stores/vmStore';
import { useToast } from '../hooks/useToast';

export function DashboardView() {
  const { onlineVMs, error, fetchOnlineVMs } = useVMStore();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        await fetchOnlineVMs();
      } catch (err) {
        if (mounted) {
          showToast({
            type: 'error',
            title: 'Erro',
            description: 'Não foi possível carregar os dados do dashboard.'
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetchOnlineVMs, showToast]);

  const stats = {
    totalVMs: onlineVMs.length,
    dedicatedVMs: onlineVMs.filter(vm => vm.plan === 'DEDICADA').length,
    sharedVMs: onlineVMs.filter(vm => vm.plan === 'COMPARTILHADA').length
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-dreams-lilac-light">Carregando informações...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total de VMs Ativas">
          <div className="flex items-center gap-4">
            <Monitor className="w-8 h-8 text-dreams-blue-light" />
            <div>
              <span className="text-2xl font-bold text-white">{stats.totalVMs}</span>
              <p className="text-sm text-dreams-lilac-light">Máquinas em uso</p>
            </div>
          </div>
        </Card>

        <Card title="VMs Dedicadas">
          <div className="flex items-center gap-4">
            <UserCheck className="w-8 h-8 text-dreams-blue-light" />
            <div>
              <span className="text-2xl font-bold text-white">{stats.dedicatedVMs}</span>
              <p className="text-sm text-dreams-lilac-light">Máquinas dedicadas</p>
            </div>
          </div>
        </Card>

        <Card title="VMs Compartilhadas">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-dreams-blue-light" />
            <div>
              <span className="text-2xl font-bold text-white">{stats.sharedVMs}</span>
              <p className="text-sm text-dreams-lilac-light">Máquinas compartilhadas</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Máquinas Ativas">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dreams-lilac/10">
                <th className="text-left py-3 text-dreams-lilac-light">ID da Máquina</th>
                <th className="text-left py-3 text-dreams-lilac-light">Cliente</th>
                <th className="text-left py-3 text-dreams-lilac-light">Plano</th>
                <th className="text-left py-3 text-dreams-lilac-light">Início</th>
                <th className="text-left py-3 text-dreams-lilac-light">Duração</th>
                <th className="text-left py-3 text-dreams-lilac-light">Status</th>
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
                </tr>
              ))}
            </tbody>
          </table>

          {onlineVMs.length === 0 && (
            <div className="text-center py-8 text-dreams-lilac-light">
              Nenhuma máquina ativa no momento
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}