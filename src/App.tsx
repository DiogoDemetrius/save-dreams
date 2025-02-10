import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { AboutSection } from './components/sections/AboutSection';
import { Features } from './components/sections/Features';
import { VMSection } from './components/sections/VMSection';
import { AccessPlansSection } from './components/sections/AccessPlansSection';
import { VMConnectionModal } from './components/VMConnectionModal';
import { ScrollGradientBackground } from './components/ui/ScrollGradientBackground';
import { Footer } from './components/Footer';
import { DiscordButton } from './components/DiscordButton';

export default function App() {
  const [isVMModalOpen, setIsVMModalOpen] = useState(false);
  const [selectedVM, setSelectedVM] = useState('');

  return (
    <ScrollGradientBackground>
      <div className="relative">
        <Navbar />
        <Hero />
        <AboutSection />
        {/* Games section hidden for future use */}
        {/* <GamesSection /> */}
        <AccessPlansSection />
        <VMSection onVMSelect={(vmName) => {
          setSelectedVM(vmName);
          setIsVMModalOpen(true);
        }} />
        <Features />
        <Footer />
        <DiscordButton />

        <VMConnectionModal
          isOpen={isVMModalOpen}
          onClose={() => setIsVMModalOpen(false)}
          vmName={selectedVM}
        />
      </div>
    </ScrollGradientBackground>
  );
}