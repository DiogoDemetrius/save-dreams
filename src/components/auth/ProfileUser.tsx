import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { User, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useEffect, useState } from 'react';
import { ProfileModal } from './ProfileModal';

export function ProfileUser(): any {
  const useAuth = useAuthStore();
  const [profileData, setProfileData] = useState({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFetchData = await useAuth.loadUserFromToken();
        setProfileData(userFetchData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-4 cursor-pointer text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200">
            <div className="text-right">
              <p className="text-sm font-medium text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200">
                {profileData.username}
              </p>
              <p className="text-xs text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200">
                {profileData.email}
              </p>
            </div>
            <img
              src={profileData.gravatar_url}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-black border-none" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200 hover:bg-discord-hover"
              onClick={openProfileModal}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200 hover:bg-discord-hover">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-discord-channelbg" />
          <DropdownMenuItem
            className="text-dreams-lilac-light hover:text-dreams-blue-light transition-colors duration-200 hover:bg-discord-hover"
            onClick={useAuth.logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={closeProfileModal}
          User={profileData}
        />
      )}
    </>
  );
}
