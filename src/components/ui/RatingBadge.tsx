interface RatingBadgeProps {
  rating: number;
}

export function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <span className="flex items-center bg-black/60 text-white px-2 py-1 rounded-full text-sm">
      <span className="text-yellow-400 mr-1">★</span>
      {rating}
    </span>
  );
}