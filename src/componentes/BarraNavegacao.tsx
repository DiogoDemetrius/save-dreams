import { GamepadIcon, Monitor } from 'lucide-react';
import { Link } from './ui/Link';

export function BarraNavegacao() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Substituí o ícone 'Cloud' pelo logo SVG */}
            <img src="/dreams.svg" alt="Dreams Cloud Logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Dreams Cloud
            </span>
          </div>

          <div className="flex space-x-8">
            <Link href="/jogos">
              <GamepadIcon className="h-5 w-5" />
              <span className="ml-2">Jogos</span>
            </Link>
            <Link href="/maquinas-virtuais">
              <Monitor className="h-5 w-5" />
              <span className="ml-2">Máquinas Virtuais</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
