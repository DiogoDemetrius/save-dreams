import { useState, useEffect } from 'react';
import { AccessPlanCard } from '../AccessPlanCard';
import { PaymentModal } from '../PaymentModal';
import { SpecsOverview } from '../ui/SpecsOverview';
import { LoginPromptModal } from '../ui/LoginPromptModal';
import { subscriptionService } from '../../services/subscription.service';
import { useAuthStore } from '../../stores/authStore';
import type { Plan } from '../../services/subscription.service';

export function AccessPlansSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const loadedPlans = await subscriptionService.getPlans();
        setPlans(loadedPlans);
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlans();
  }, []);

  const handlePlanSelect = (plan: Plan) => {
    if (!token) {
      setLoginPromptOpen(true);
      return;
    }
    setSelectedPlan(plan);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="space-y-4 text-center">
              <div className="h-10 bg-dreams-lilac/10 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-dreams-lilac/10 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[600px] bg-dreams-lilac/10 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="access-plans" className="py-16 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-dreams-blue-light to-dreams-lilac bg-clip-text text-transparent mb-4">
          Escolha seu Plano de Acesso
        </h2>
        <p className="text-dreams-lilac-light text-center mb-12 max-w-2xl mx-auto">
          Selecione o plano que melhor atende às suas necessidades de computação em nuvem
        </p>

        <div className="mb-12">
          <SpecsOverview />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <AccessPlanCard
              key={plan.id}
              type={plan.type}
              price={plan.price}
              features={plan.features}
              onSelect={() => handlePlanSelect(plan)}
              highlight={plan.type === 'premium' ? 'Mais Popular' : undefined}
              period={plan.type === 'daily' ? '24 horas' : 'mensal'}
              buttonClassName={plan.type === 'standard' ? 'text-black' : undefined}
            />
          ))}
        </div>
      </div>

      <LoginPromptModal
        isOpen={isLoginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        message="Faça login para assinar um plano."
      />

      {selectedPlan && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedPlan(null)}
          planType={selectedPlan.type}
          price={selectedPlan.price}
          isMonthly={selectedPlan.type !== 'daily'}
        />
      )}
    </section>
  );
}