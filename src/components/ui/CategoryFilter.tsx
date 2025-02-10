{/* Previous imports */}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-3 rounded-2xl whitespace-nowrap transition-all ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-dreams-blue-light to-dreams-lilac text-white font-medium'
              : 'bg-black/30 text-dreams-lilac-light hover:bg-dreams-lilac/20 border border-dreams-lilac/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}