import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Purchase {
  id: string;
  customerName: string;
  plan: string;
  price: number;
  purchaseDate: Date;
}

interface RecentPurchasesProps {
  period: '24h' | '48h' | '72h';
}

export function RecentPurchases({ period }: RecentPurchasesProps) {
  const purchases: Purchase[] = [
    {
      id: '1',
      customerName: 'João Silva',
      plan: 'DEDICADA',
      price: 299.99,
      purchaseDate: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '2',
      customerName: 'Maria Santos',
      plan: 'COMPARTILHADA',
      price: 179.99,
      purchaseDate: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '3',
      customerName: 'Pedro Costa',
      plan: 'DEDICADA',
      price: 299.99,
      purchaseDate: new Date(Date.now() - 1000 * 60 * 60 * 5)
    }
  ];

  const periodInHours = parseInt(period);
  const filteredPurchases = purchases.filter(purchase => {
    const hoursDiff = (Date.now() - purchase.purchaseDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff <= periodInHours;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-dreams-lilac/10">
            <th className="pb-3 text-dreams-lilac-light font-medium">Cliente</th>
            <th className="pb-3 text-dreams-lilac-light font-medium">Plano</th>
            <th className="pb-3 text-dreams-lilac-light font-medium">Valor</th>
            <th className="pb-3 text-dreams-lilac-light font-medium">Horário</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dreams-lilac/5">
          {filteredPurchases.map((purchase) => (
            <tr key={purchase.id}>
              <td className="py-2 text-white">{purchase.customerName}</td>
              <td className="py-2">
                <span className="px-2 py-1 rounded-full text-xs bg-dreams-blue/10 text-dreams-blue-light">
                  {purchase.plan}
                </span>
              </td>
              <td className="py-2 text-dreams-lilac-light">
                R$ {purchase.price.toFixed(2)}
              </td>
              <td className="py-2 text-dreams-lilac-light">
                {formatDistanceToNow(purchase.purchaseDate, {
                  addSuffix: true,
                  locale: ptBR
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredPurchases.length === 0 && (
        <p className="text-center text-dreams-lilac-light py-4">
          Nenhuma compra no período selecionado
        </p>
      )}
    </div>
  );
}