import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-dreams-lilac/10">
      <Icon className="w-12 h-12 text-dreams-blue-light mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-dreams-lilac-light">{description}</p>
    </div>
  );
}