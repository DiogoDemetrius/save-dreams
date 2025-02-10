import { useEffect } from 'react';
import { Monitor, UserCircle } from 'lucide-react';
import { AuthModal } from './auth/AuthModal';
import { Button } from './ui/Button';
import { ProfileUser } from './auth/ProfileUser';
import { useAuthStore } from '../stores/authStore';

export function Navbar() {
  const { token, openAuthModal } = useAuthStore();

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  // Listen for custom event to open auth modal
  useEffect(() => {
    const handleOpenAuthModal = () => openAuthModal();
    document.addEventListener('open-auth-modal', handleOpenAuthModal);
    return () => document.removeEventListener('open-auth-modal', handleOpenAuthModal);
  }, [openAuthModal]);

  return (
    <nav className="bg-black/30 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img
              src="/dreams.svg"
              alt="Dreams Cloud Logo"
              className="h-8 w-8"
            />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-dreams-blue-light to-dreams-lilac bg-clip-text text-transparent">
              Dreams Cloud
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('#vm-section')}
              className="flex items-center text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200"
            >
              <Monitor className="h-5 w-5" />
              <span className="ml-2">Ligar Máquina</span>
            </button>

            {token ? (
              <ProfileUser />
            ) : (
              <Button
                variant="secondary"
                onClick={openAuthModal}
                className="flex items-center gap-2 text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200"
              >
                <UserCircle size={20} />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </div>

      <AuthModal />
    </nav>
  );
}