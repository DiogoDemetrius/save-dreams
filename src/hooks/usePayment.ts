import { useState } from 'react';
import { mercadopagoService } from '../services/mercadopago';
import { useToast } from './useToast';

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const processPayment = async (data: {
    userId: string;
    planType: string;
    amount: number;
    description: string;
  }) => {
    try {
      setIsProcessing(true);
      
      // Criar preferência de checkout
      const preference = await mercadopagoService.createPreference(data);
      
      // Iniciar checkout
      await mercadopagoService.initCheckout(preference.id);
      
      showToast({
        type: 'success',
        title: 'Pagamento realizado!',
        description: 'Seu plano foi ativado com sucesso.'
      });

      return true;
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Erro no pagamento',
        description: 'Não foi possível processar seu pagamento.'
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    processPayment
  };
}