import { useState } from 'react';
import { HardDrive, Wrench, Headphones } from 'lucide-react';
import { Button } from '../ui/Button';
import { PaymentModal } from '../PaymentModal';

interface AdditionalProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: typeof HardDrive | typeof Wrench | typeof Headphones;
  isMonthly: boolean;
  features: string[];
}

const products: AdditionalProduct[] = [
  {
    id: 'ssd',
    title: 'SSD Extra',
    description: 'Mais espaço de armazenamento',
    price: 29.90,
    icon: HardDrive,
    isMonthly: true,
    features: [
      '256GB de espaço adicional',
      'Alta velocidade',
      'Ativação em até 24hrs'
    ]
  },
  {
    id: 'format',
    title: 'Formatação',
    description: 'Mantenha sua máquina otimizada',
    price: 19.90,
    icon: Wrench,
    isMonthly: false,
    features: [
      'Limpeza completa',
      'Reinstalação do sistema',
      'Restauração em até 24hrs'
    ]
  },
  {
    id: 'support',
    title: 'Suporte Premium',
    description: 'Atendimento prioritário 24/7',
    price: 39.90,
    icon: Headphones,
    isMonthly: true,
    features: [
      'Suporte dedicado',
      'Tempo de resposta em até 8h',
      'Resolução prioritária'
    ]
  }
];

export function AdditionalProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<AdditionalProduct | null>(null);

  return (
    <section className="py-16 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Produtos Adicionais
        </h2>
        <p className="text-dreams-lilac-light text-center mb-12 max-w-2xl mx-auto">
          Aprimore sua experiência com nossos serviços complementares
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-black/30 backdrop-blur-sm rounded-lg border border-dreams-lilac/10 overflow-hidden"
            >
              <div className="aspect-[16/9] relative bg-gradient-to-br from-dreams-blue/20 to-dreams-lilac/20 p-6 flex items-center justify-center">
                <product.icon className="w-16 h-16 text-dreams-blue-light" />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
                    <p className="text-sm text-dreams-lilac-light">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                      R${product.price.toFixed(2)}
                    </span>
                    {product.isMonthly && (
                      <span className="text-sm text-dreams-lilac-light">/mês</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-dreams-lilac-light">
                      <svg className="w-4 h-4 text-dreams-blue-light mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setSelectedProduct(product)}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
          planType="additional"
          price={selectedProduct.price}
          productTitle={selectedProduct.title}
          isMonthly={selectedProduct.isMonthly}
        />
      )}
    </section>
  );
}