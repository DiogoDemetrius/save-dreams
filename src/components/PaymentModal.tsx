import { useState } from 'react';
import { Modal } from './ui/Modal';
import { CreditCard, Loader2, AlertCircle, Shield } from 'lucide-react';
import { Button } from './ui/Button';
import { toast } from 'sonner';
import { subscriptionService } from '../services/subscription.service';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'daily' | 'standard' | 'premium';
  price: number;
  isMonthly?: boolean;
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  planType, 
  price,
  isMonthly = true 
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      await subscriptionService.purchase(planType);
      toast.success('Pagamento processado com sucesso!');
      onClose();
    } catch (err) {
      setError('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Finalizar Compra"
    >
      <div className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-black/30 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-dreams-lilac-light mb-4">
            <CreditCard size={20} />
            <span className="font-semibold">Detalhes do Plano</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-dreams-lilac-light">Plano</span>
              <span className="text-dreams-blue-light font-medium">
                {planType === 'daily' ? 'Acesso 24 Horas' : planType === 'standard' ? 'Standard' : 'Premium'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-dreams-lilac-light">Valor</span>
              <span className="text-dreams-blue-light font-medium">
                R$ {price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-dreams-lilac-light">Período</span>
              <span className="text-dreams-blue-light font-medium">
                {planType === 'daily' ? '24 Horas' : 'Mensal'}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-dreams-blue to-dreams-lilac text-black font-medium 
            hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-dreams-lilac/20"
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Processando...
            </>
          ) : (
            'Finalizar Compra'
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-dreams-lilac-light text-sm">
          <Shield size={16} className="text-green-400" />
          <p>
            Pagamento processado de forma segura
          </p>
        </div>
      </div>
    </Modal>
  );
}