import { useState, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Camera, Phone, User } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  // Mocked user data
  const mockUser = {
    displayName: 'João da Silva',
    phoneNumber: '(11) 91234-5678',
    email: 'joao.silva@example.com',
    photoURL: '',
  };

  const [displayName, setDisplayName] = useState(mockUser.displayName);
  const [phoneNumber, setPhoneNumber] = useState(mockUser.phoneNumber);
  const [accessDays, setAccessDays] = useState(30); // Mocked access days
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Foto carregada:', file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados atualizados:', { displayName, phoneNumber });
    onClose();
  };

  const checkDays = () => {
    const newAccessDays = Math.floor(Math.random() * 100); // Mocked random access days
    setAccessDays(newAccessDays);
    console.log('Dias de acesso atualizados:', newAccessDays);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Seu Perfil">
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            {mockUser.photoURL ? (
              <img
                src={mockUser.photoURL}
                alt={mockUser.displayName || 'Profile'}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-dreams-blue/20 flex items-center justify-center">
                <User size={48} className="text-dreams-blue-light" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-white">
              {mockUser.displayName}
            </h3>
            <p className="text-dreams-lilac-light">{mockUser.email}</p>
          </div>

          <div className="mt-2 px-4 py-2 bg-black/30 rounded-lg">
            <p className="text-dreams-lilac-light text-sm">
              Dias de Acesso: {accessDays}
              <button
                onClick={checkDays}
                className="ml-2 text-dreams-blue-light hover:text-dreams-blue transition-colors"
              >
                Atualizar
              </button>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Nome
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-dreams-lilac-light"
                size={20}
              />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-dreams-lilac/20 rounded-lg text-white focus:border-dreams-blue outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dreams-lilac-light mb-1">
              Telefone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-dreams-lilac-light"
                size={20}
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-dreams-lilac/20 rounded-lg text-white focus:border-dreams-blue outline-none"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Salvar Alterações
          </Button>
        </form>
      </div>
    </Modal>
  );
}
