interface GenreTagProps {
  genre: string;
}

export function GenreTag({ genre }: GenreTagProps) {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-dreams-blue/20 text-dreams-lilac-light">
      {genre}
    </span>
  );
}