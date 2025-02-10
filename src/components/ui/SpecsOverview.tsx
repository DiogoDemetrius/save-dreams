import { Cpu, HardDrive, MonitorPlay, CircuitBoard } from 'lucide-react';

export function SpecsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
      {[
        { 
          icon: Cpu, 
          title: 'AMD Ryzen 5 - 4500',
          label: 'Processador'
        },
        { 
          icon: MonitorPlay, 
          title: 'RTX 4090 24GB',
          label: 'Placa de Vídeo'
        },
        { 
          icon: CircuitBoard, 
          title: '16GB DDR5',
          label: 'Memória RAM'
        },
        { 
          icon: HardDrive, 
          title: '256GB NVMe',
          label: 'Armazenamento'
        }
      ].map(({ icon: Icon, title, label }) => (
        <div 
          key={label}
          className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm p-4
            before:absolute before:inset-0 before:rounded-xl before:p-[1px]
            before:bg-gradient-to-r before:from-dreams-blue/20 before:to-dreams-lilac/20
            hover:before:from-dreams-blue/40 hover:before:to-dreams-lilac/40
            transition-all duration-300"
        >
          <div className="relative flex items-center gap-4">
            <div className="flex-shrink-0">
              <Icon className="w-8 h-8 text-dreams-blue-light" />
            </div>
            <div>
              <h3 className="text-white font-medium">{title}</h3>
              <p className="text-sm text-dreams-lilac-light">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}