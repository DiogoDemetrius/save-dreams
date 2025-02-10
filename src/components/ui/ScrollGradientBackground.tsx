import { ReactNode, useEffect, useState } from 'react';

interface ScrollGradientBackgroundProps {
  children: ReactNode;
}

export function ScrollGradientBackground({ children }: ScrollGradientBackgroundProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      setScrollProgress((currentProgress / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dreams-bg-dark">
      <div className="fixed inset-0 bg-gradient-to-b from-dreams-blue/5 to-dreams-lilac/5 pointer-events-none" />
      <div 
        className="fixed inset-0 bg-gradient-to-tr from-dreams-bg-dark via-dreams-bg-light to-dreams-bg-dark opacity-50 pointer-events-none"
        style={{
          opacity: Math.min(0.5 + (scrollProgress / 200), 0.8)
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}