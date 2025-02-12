interface Admin {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  isOwner: boolean;
}

interface CreateAdminData {
  name: string;
  email: string;
  permissions: string[];
}

export function useAdmins() {
  const mockAdmins: Admin[] = [
    {
      id: '1',
      name: 'Admin Principal',
      email: 'admin@dreamscloud.com',
      permissions: ['clients', 'finance', 'settings'],
      isOwner: true
    },
    {
      id: '2',
      name: 'Suporte Financeiro',
      email: 'finance@dreamscloud.com',
      permissions: ['finance'],
      isOwner: false
    }
  ];

  const createAdmin = async (data: CreateAdminData) => {
    // Implementar integração com backend
    console.log('Criar admin:', data);
  };

  const removeAdmin = async (id: string) => {
    // Implementar integração com backend
    console.log('Remover admin:', id);
  };

  return {
    admins: mockAdmins,
    createAdmin,
    removeAdmin
  };
}