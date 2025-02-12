import { ChevronLeft } from 'lucide-react';
import { useSidebarStore } from '../../stores/sidebarStore';

export function SidebarToggle() {
  const { isExpanded, toggle } = useSidebarStore();
  
  return (
    <button
      onClick={toggle}
      className="absolute -right-3 top-6 bg-dreams-bg-light/95 
        border border-dreams-lilac/10 rounded-full p-1.5 
        text-dreams-lilac-light hover:text-dreams-blue-light 
        transition-colors shadow-lg shadow-black/20 z-50"
    >
      <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${
        !isExpanded ? 'rotate-180' : ''
      }`} />
    </button>
  );
}