import { DollarSign, TrendingUp, CreditCard, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { useSales } from '../../hooks/useSales';

interface SalesSummaryProps {
  dateRange: [Date | null, Date | null];
}

export function SalesSummary({ dateRange }: SalesSummaryProps) {
  const { getSummary } = useSales();
  const summary = getSummary(dateRange);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card title="Total de Vendas">
        <div className="flex items-center gap-4">
          <DollarSign className="w-8 h-8 text-dreams-blue-light" />
          <div>
            <span className="text-2xl font-bold text-white">
              R$ {summary.total.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-dreams-lilac-light">No período</p>
          </div>
        </div>
      </Card>

      <Card title="Ticket Médio">
        <div className="flex items-center gap-4">
          <TrendingUp className="w-8 h-8 text-dreams-blue-light" />
          <div>
            <span className="text-2xl font-bold text-white">
              R$ {summary.average.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-dreams-lilac-light">Por venda</p>
          </div>
        </div>
      </Card>

      <Card title="Assinaturas">
        <div className="flex items-center gap-4">
          <CreditCard className="w-8 h-8 text-dreams-blue-light" />
          <div>
            <span className="text-2xl font-bold text-white">
              {summary.subscriptions}
            </span>
            <p className="text-sm text-dreams-lilac-light">Ativas</p>
          </div>
        </div>
      </Card>

      <Card title="Novos Clientes">
        <div className="flex items-center gap-4">
          <Users className="w-8 h-8 text-dreams-blue-light" />
          <div>
            <span className="text-2xl font-bold text-white">
              {summary.newCustomers}
            </span>
            <p className="text-sm text-dreams-lilac-light">No período</p>
          </div>
        </div>
      </Card>
    </div>
  );
}