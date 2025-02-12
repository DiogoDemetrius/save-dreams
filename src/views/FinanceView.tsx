import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { SalesChart } from '../components/finance/SalesChart';
import { SalesFilter } from '../components/finance/SalesFilter';
import { SalesTable } from '../components/finance/SalesTable';
import { SalesSummary } from '../components/finance/SalesSummary';

export function FinanceView() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Financeiro</h1>

      <SalesFilter 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <SalesSummary dateRange={dateRange} />

      <div className="grid grid-cols-1 gap-6">
        <Card title="Vendas no Período">
          <SalesChart dateRange={dateRange} />
        </Card>

        <Card title="Histórico de Vendas">
          <SalesTable dateRange={dateRange} />
        </Card>
      </div>
    </div>
  );
}