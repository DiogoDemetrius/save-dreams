import { Button } from '../ui/Button';

interface PeriodSelectorProps {
  period: '24h' | '48h' | '72h';
  onChange: (period: '24h' | '48h' | '72h') => void;
}

export function PeriodSelector({ period, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange('24h')}
        className={`px-4 py-2 bg-gradient-to-r from-dreams-blue to-dreams-lilac rounded-lg 
          hover:opacity-90 transition-opacity ${period !== '24h' && 'opacity-50'}`}
      >
        24h
      </button>
      <button
        onClick={() => onChange('48h')}
        className={`px-4 py-2 bg-gradient-to-r from-dreams-blue to-dreams-lilac rounded-lg 
          hover:opacity-90 transition-opacity ${period !== '48h' && 'opacity-50'}`}
      >
        48h
      </button>
      <button
        onClick={() => onChange('72h')}
        className={`px-4 py-2 bg-gradient-to-r from-dreams-blue to-dreams-lilac rounded-lg 
          hover:opacity-90 transition-opacity ${period !== '72h' && 'opacity-50'}`}
      >
        72h
      </button>
    </div>
  );
}