interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  plan: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export function useSales() {
  const mockSales: Sale[] = [
    {
      id: '1',
      customerId: '1',
      customerName: 'João Silva',
      amount: 149.90,
      plan: 'PRIORITY',
      date: new Date(),
      status: 'completed'
    },
    // Adicione mais vendas mock aqui
  ];

  const getSummary = (dateRange: [Date | null, Date | null]) => {
    return {
      total: 15789.90,
      average: 149.90,
      subscriptions: 105,
      newCustomers: 27
    };
  };

  const getSales = (dateRange: [Date | null, Date | null]) => {
    return mockSales;
  };

  return {
    getSales,
    getSummary
  };
}