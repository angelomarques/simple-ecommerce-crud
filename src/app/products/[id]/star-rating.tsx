import { StarHalf } from "@/components/icons/star-half";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  className?: string;
  showNumber?: boolean;
}

export function StarRating({ rating, className, showNumber = false }: Props) {
  const halfStarIndex =
    Math.floor(rating) === rating ? null : Math.floor(rating);

  return (
    <div className={cn("flex gap-1 items-center", className)}>
      {showNumber && <p className="text-sm text-slate-300">{rating}</p>}

      {Array(5)
        .fill(null)
        .map((_, index) =>
          index === halfStarIndex ? (
            <StarHalf key={index} className="w-4 h-4 text-yellow-500" />
          ) : (
            <Star
              key={index}
              className={cn("w-4 h-4 text-yellow-500", {
                "fill-yellow-500": index < rating,
              })}
            />
          )
        )}
    </div>
  );
}
