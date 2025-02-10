import { useState } from 'react';
import { Gamepad } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { GameCard } from '../GameCard';
import { CategoryFilter } from '../ui/CategoryFilter';
import { SearchBar } from '../ui/SearchBar';
import { games } from '../../data/games';

export function GamesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['Todos', 'Ação', 'Aventura', 'RPG', 'Corrida', 'Esportes', 'Simulação', 'Sobrevivência'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || game.genre.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="games-section" className="py-16 px-4 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <SectionTitle icon={Gamepad}>Catálogo de Jogos</SectionTitle>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}