import { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import { Game } from '../types';
import { GenreTag } from './ui/GenreTag';
import { RatingBadge } from './ui/RatingBadge';
import { useVideoPreview } from '../hooks/useVideoPreview';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { videoRef, handleVideoError } = useVideoPreview(isHovered);

  return (
    <div
      className="group relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-dreams-blue/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={game.coverImage}
        alt={game.title}
        className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-lg font-semibold text-white mb-2">
            {game.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4 transform transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            {game.genre.map((g) => (
              <GenreTag key={g} genre={g} />
            ))}
          </div>
          <button className="w-full px-4 py-2 bg-gradient-to-r from-dreams-blue to-dreams-lilac rounded-lg flex items-center justify-center gap-2 text-black font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 hover:brightness-110">
            <Clock size={16} />
            Em breve
          </button>
        </div>
      </div>

      <div className="absolute top-2 right-2 transform transition-all duration-500 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
        <RatingBadge rating={game.rating} />
      </div>
    </div>
  );
}