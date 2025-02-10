import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { UserCircle, LogOut, Settings } from 'lucide-react';
import { ProfileModal } from './ProfileModal';

export function UserMenu() {
  const { user, signOut } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 text-dreams-lilac-light hover:text-dreams-blue-light transition-colors"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <UserCircle size={32} />
        )}
        <span>{user.displayName}</span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg py-1 border border-dreams-lilac/10">
          <button
            onClick={() => {
              setIsProfileOpen(true);
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-dreams-lilac-light hover:bg-dreams-blue/10 transition-colors"
          >
            <Settings size={16} />
            Perfil
          </button>
          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full px-4 py-2 text-dreams-lilac-light hover:bg-dreams-blue/10 transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}