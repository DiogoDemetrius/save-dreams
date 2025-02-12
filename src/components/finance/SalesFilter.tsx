import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SalesFilterProps {
  dateRange: [Date | null, Date | null];
  onDateRangeChange: (range: [Date | null, Date | null]) => void;
}

export function SalesFilter({ dateRange, onDateRangeChange }: SalesFilterProps) {
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dreams-lilac-light" size={20} />
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => onDateRangeChange(update as [Date | null, Date | null])}
          placeholderText="Selecione o período..."
          className="w-full pl-12 pr-4 py-3 bg-dreams-bg-light border border-dreams-lilac/10 rounded-lg text-white placeholder-dreams-lilac-light/50 focus:border-dreams-blue-light outline-none"
          wrapperClassName="w-full"
        />
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onDateRangeChange([new Date(), new Date()])}
          className="px-4 py-2 bg-dreams-bg-light border border-dreams-lilac/10 rounded-lg text-dreams-lilac-light hover:border-dreams-blue-light transition-colors"
        >
          Hoje
        </button>
        <button 
          onClick={() => {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 7);
            onDateRangeChange([start, end]);
          }}
          className="px-4 py-2 bg-dreams-bg-light border border-dreams-lilac/10 rounded-lg text-dreams-lilac-light hover:border-dreams-blue-light transition-colors"
        >
          Últimos 7 dias
        </button>
        <button 
          onClick={() => {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 1);
            onDateRangeChange([start, end]);
          }}
          className="px-4 py-2 bg-dreams-bg-light border border-dreams-lilac/10 rounded-lg text-dreams-lilac-light hover:border-dreams-blue-light transition-colors"
        >
          Último mês
        </button>
      </div>
    </div>
  );
}