import { Cloud } from 'lucide-react';
import { useSidebarStore } from '../../stores/sidebarStore';

export function SidebarLogo() {
  const { isExpanded } = useSidebarStore();

  return (
    <div className="p-6 border-b border-dreams-lilac/10">
      <div className="flex items-center gap-3">
        <Cloud className="h-8 w-8 text-dreams-blue-light flex-shrink-0" />
        {isExpanded && (
          <span className="text-xl font-bold bg-gradient-to-r from-dreams-blue-light to-dreams-lilac bg-clip-text text-transparent whitespace-nowrap">
            Dreams Admin
          </span>
        )}
      </div>
    </div>
  );
}