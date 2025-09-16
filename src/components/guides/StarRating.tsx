interface StarRatingProps {
  rating: number;
  maxStars: number;
  showRating?: boolean;
}

export default function StarRating({ rating, maxStars, showRating = true }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xl ${i < maxStars ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
      {showRating && (
        <span className="text-lg text-gray-500 ml-2">{rating}/5.0</span>
      )}
    </div>
  );
}