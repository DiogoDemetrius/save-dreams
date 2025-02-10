import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mt-4 md:mt-0">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dreams-lilac-light" size={20} />
      <input
        type="text"
        placeholder="Buscar jogos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-6 py-3 rounded-2xl bg-black/30 border border-dreams-lilac/20 
          focus:border-dreams-blue outline-none text-gray-300 placeholder-dreams-lilac-light/50
          transition-colors duration-200"
      />
    </div>
  );
}