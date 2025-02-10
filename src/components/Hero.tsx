import { Button } from '../ui/Button';
import { useEffect, useState } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPlans = () => {
    const plansSection = document.querySelector('#access-plans');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 pb-12 px-4 bg-black/20 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative">
        <h1 
          className={`text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-dreams-blue-light via-dreams-lilac to-dreams-blue-light bg-clip-text text-transparent mb-6 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Bem-vindo a Dreams Cloud
        </h1>
        
        <p className={`mt-6 text-lg text-dreams-lilac-light max-w-2xl mx-auto transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Experimente a próxima geração de cloud gaming e máquinas virtuais. Jogue seus jogos favoritos
          ou acesse recursos computacionais poderosos, tudo pelo seu navegador.
        </p>
        
        <div className={`mt-10 flex justify-center gap-6 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Button 
            onClick={scrollToPlans} 
            className="text-black hover:scale-105 transition-transform"
          >
            Começar a Jogar
          </Button>
          <Button 
            variant="secondary"
            onClick={() => window.open('https://discord.gg/dreamscloud', '_blank')}
            className="hover:scale-105 transition-transform"
          >
            Entre na comunidade do DISCORD
          </Button>
        </div>
      </div>
    </section>
  );
}