import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon: LucideIcon;
  children: ReactNode;
}

export function SectionTitle({ icon: Icon, children }: SectionTitleProps) {
  return (
    <div className="flex items-center mb-8">
      <Icon className="w-8 h-8 text-dreams-blue-light mr-3" />
      <h2 className="text-3xl font-bold text-white">{children}</h2>
    </div>
  );
}