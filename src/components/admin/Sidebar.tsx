import { useSidebarStore } from '../../stores/sidebarStore';
import { SidebarLogo } from './SidebarLogo';
import { SidebarNav } from './SidebarNav';
import { SidebarToggle } from './SidebarToggle';

export function Sidebar() {
  const { isExpanded } = useSidebarStore();

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-dreams-bg-light/95 backdrop-blur-sm 
        border-r border-dreams-lilac/10 transition-all duration-200 
        shadow-xl shadow-black/20 ${isExpanded ? 'w-64' : 'w-20'}`}
    >
      <SidebarToggle />
      <div className="h-full flex flex-col">
        <SidebarLogo />
        <SidebarNav />
      </div>
    </aside>
  );
}