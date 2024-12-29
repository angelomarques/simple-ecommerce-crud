"use client";

import { Carousel } from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ProductReviewType } from "@/service/products/types";
import { StarRating } from "./star-rating";

interface Props {
  reviews: ProductReviewType[];
}

export function CustomerReviews({ reviews }: Props) {
  const isDesktop = useMediaQuery("lg");

  return (
    <>
      <h2 className="text-2xl mt-8 font-semibold">Customer Reviews</h2>

      <Carousel.Root className="mt-4 mx-10" slidesPerView={isDesktop ? 2 : 1}>
        <Carousel.Content>
          {reviews.map((item) => (
            <Carousel.Item key={item.reviewerEmail}>
              <div className="border border-slate-300 rounded-md p-3 text-center">
                <h3 className="text-lg">{item.reviewerName}</h3>

                <p className="text-slate-400 mt-2">{item.reviewerEmail}</p>

                <StarRating
                  className="justify-center mt-4"
                  rating={item.rating}
                />

                <p className="mt-4">{item.comment}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    </>
  );
}
