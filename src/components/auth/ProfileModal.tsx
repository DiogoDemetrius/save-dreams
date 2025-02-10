import { useState, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Camera, Phone, User } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  User: {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    gravatar_url: string;
    registrationDate: string;
    planType: string;
    hasSaving: boolean;
  };
}

export function ProfileModal({ isOpen, onClose, User }: ProfileModalProps) {
  const [displayName, setDisplayName] = useState(User.username);
  const [phoneNumber, setPhoneNumber] = useState(User.phoneNumber);
  const [accessDays, setAccessDays] = useState(User.profile.restantDays);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Seu Perfil">
      <div className="space-y-6 px-4">
        <div className="flex flex-col items-center">
          <div
            className={`relative p-1 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-blue-500 bg-gradient-large animate-gradientMove`}
          >
            <img
              src={User.gravatar_url}
              alt={displayName || 'Profile'}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-white">{displayName}</h3>
            <p className="text-dreams-lilac-light">{User.email}</p>
          </div>

          <div className="mt-2 px-4 py-2 bg-black/30 rounded-lg">
            <p className="text-dreams-lilac-light text-sm">
              {User.profile.subscription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-10 mt-6">
          <p className="text-dreams-lilac-light text-sm">
            <strong>ID:</strong>
            <br />
            <span className="bg-black/30 rounded-lg">{User.profile.id}</span>
          </p>
          <p className="text-dreams-lilac-light text-sm">
            <strong>Data de Registro:</strong>
            <br />
            <span className="bg-black/30 rounded-lg">
              {User.profile.createdAt}
            </span>
          </p>
          <p className="text-dreams-lilac-light text-sm">
            <strong>Dias restantes:</strong>
            <br />
            <span className="bg-black/30 rounded-lg">{accessDays}</span>
          </p>
          <p className="text-dreams-lilac-light text-sm">
            <strong>Salvamento Ativado:</strong>
            <br />
            <span className="bg-black/30 rounded-lg">
              {User.hasSaving ? 'Sim' : 'Não'}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
}
