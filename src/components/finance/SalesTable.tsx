import { useSales } from '../../hooks/useSales';

interface SalesTableProps {
  dateRange: [Date | null, Date | null];
}

export function SalesTable({ dateRange }: SalesTableProps) {
  const { getSales } = useSales();
  const sales = getSales(dateRange);

  const getPlanBadgeStyle = (plan: string) => {
    switch (plan) {
      case 'PREMIUM':
        return 'bg-dreams-blue/20 text-dreams-blue-light';
      case 'STANDARD':
        return 'bg-dreams-lilac/20 text-dreams-lilac-light';
      case 'DAILY':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-dreams-lilac/20 text-dreams-lilac-light';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dreams-lilac/10">
            <th className="text-left py-3 text-dreams-lilac-light">Cliente</th>
            <th className="text-left py-3 text-dreams-lilac-light">Plano</th>
            <th className="text-left py-3 text-dreams-lilac-light">Valor</th>
            <th className="text-left py-3 text-dreams-lilac-light">Data</th>
            <th className="text-left py-3 text-dreams-lilac-light">Status</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-b border-dreams-lilac/10">
              <td className="py-3 text-white">{sale.customerName}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${getPlanBadgeStyle(sale.plan)}`}>
                  {sale.plan}
                </span>
              </td>
              <td className="py-3 text-dreams-lilac-light">
                R$ {sale.amount.toFixed(2)}
              </td>
              <td className="py-3 text-dreams-lilac-light">
                {sale.date.toLocaleDateString('pt-BR')}
              </td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  sale.status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : sale.status === 'pending'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {sale.status === 'completed' ? 'Concluído' :
                   sale.status === 'pending' ? 'Pendente' : 'Falhou'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}