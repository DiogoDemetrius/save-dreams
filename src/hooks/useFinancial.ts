import { useState, useEffect } from 'react';
import { financialService, SalesSummary, Transaction, ChartData } from '../services/financial';
import { useToast } from './useToast';

export function useFinancial() {
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const loadSummary = async (period: string) => {
    try {
      setIsLoading(true);
      const data = await financialService.getSummary(period);
      setSummary(data);
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível carregar o resumo financeiro.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadChartData = async (period: string) => {
    try {
      const data = await financialService.getChartData(period);
      setChartData(data);
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível carregar os dados do gráfico.'
      });
    }
  };

  const loadTransactions = async (filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }) => {
    try {
      setIsLoading(true);
      const data = await financialService.getTransactions(filters);
      setTransactions(data);
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível carregar as transações.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    summary,
    chartData,
    transactions,
    isLoading,
    loadSummary,
    loadChartData,
    loadTransactions
  };
}