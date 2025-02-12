import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Shield, 
  Settings,
  Server,
  LucideIcon
} from 'lucide-react';
import { useSidebarStore } from '../../stores/sidebarStore';
import { useViewStore } from '../../stores/viewStore';

interface NavItem {
  id: 'dashboard' | 'clients' | 'finance' | 'admins' | 'settings' | 'servers';
  icon: LucideIcon;
  label: string;
}

const menuItems: NavItem[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'clients', icon: Users, label: 'Clientes' },
  { id: 'servers', icon: Server, label: 'Servidores' },
  { id: 'finance', icon: DollarSign, label: 'Financeiro' },
  { id: 'admins', icon: Shield, label: 'Administradores' },
  { id: 'settings', icon: Settings, label: 'Configurações' },
];

export function SidebarNav() {
  const { currentView, setView } = useViewStore();
  const { isExpanded } = useSidebarStore();

  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      <div className="space-y-2">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${currentView === id
                ? 'bg-gradient-to-r from-dreams-blue/20 to-dreams-lilac/20 text-white'
                : 'text-dreams-lilac-light hover:bg-dreams-lilac/5'
              } ${!isExpanded ? 'justify-center' : ''}`}
          >
            <Icon size={20} className="flex-shrink-0" />
            {isExpanded && <span>{label}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
}