import { Search } from 'lucide-react';
import { states } from '../../utils/states';

interface ClientsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedState: string;
  onStateChange: (value: string) => void;
}

export function ClientsFilter({
  searchTerm,
  onSearchChange,
  selectedState,
  onStateChange
}: ClientsFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dreams-lilac-light" size={20} />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-dreams-bg-light border border-dreams-lilac/10 rounded-lg text-white placeholder-dreams-lilac-light/50 focus:border-dreams-blue-light outline-none"
        />
      </div>

      <select
        value={selectedState}
        onChange={(e) => onStateChange(e.target.value)}
        className="px-4 py-3 bg-dreams-bg-light border border-dreams-lilac/10 rounded-lg text-white focus:border-dreams-blue-light outline-none"
      >
        <option value="">Todos os Estados</option>
        {states.map(state => (
          <option key={state.uf} value={state.uf}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}