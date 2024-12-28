import { StarHalf } from "@/components/icons/star-half";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { cn, formatPrice } from "@/lib/utils";
import { getProductById } from "@/service/products";
import { ProductType } from "@/service/products/types";
import clsx from "clsx";
import { Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  try {
    const product = await getProductById(Number(id));

    if (!product) return notFound();

    return <ProductDetailsContent product={product} />;
  } catch (_error) {
    return notFound();
  }
}

interface ProductDetailsContentProps {
  product: ProductType;
}

function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  const previousPrice = (1 + product.discountPercentage / 100) * product.price;

  return (
    <main className="max-w-7xl mx-auto py-5 w-full flex-1">
      <div className="flex gap-16 mt-12">
        <Carousel.Root className="w-3/5 mx-auto flex-[1.3]">
          <Carousel.Content>
            {product.images.map((image) => (
              <Carousel.Item key={image}>
                <div className="bg-slate-900 rounded-2xl h-[600px] w-[600px] flex items-center justify-center">
                  <Image src={image} alt="Product" width={600} height={600} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel.Content>

          <Carousel.Previous />
          <Carousel.Next />
        </Carousel.Root>

        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="mt-3 text-slate-300">{product.description}</p>

          <StarRating showNumber className="mt-3" rating={product.rating} />

          <div className="flex gap-0.5 items-end mt-5">
            <p className="text-3xl font-semibold">
              {formatPrice(product.price)}
            </p>

            <p className="text-slate-400 ml-2">
              <s>{formatPrice(previousPrice)}</s>
            </p>
          </div>

          <Button className="mt-5">Add to cart</Button>

          <div className="mt-auto flex gap-3 flex-wrap">
            <Badge variant="destructive">
              Minimum order of {product.minimumOrderQuantity}
            </Badge>
            <Badge variant="destructive">{`Only ${product.stock} in stock`}</Badge>
            <Badge>Category: {product.category}</Badge>
            <Badge>Brand: {product.brand}</Badge>
            <Badge>{product.warrantyInformation}</Badge>
            <Badge>{product.returnPolicy}</Badge>
          </div>
        </div>
      </div>

      <h2 className="text-2xl mt-8 font-semibold">Customer Reviews</h2>

      <Carousel.Root className="mt-4" slidesPerView={2}>
        <Carousel.Content>
          {product.reviews.map((item) => (
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
    </main>
  );
}

interface StarRatingProps {
  rating: number;
  className?: string;
  showNumber?: boolean;
}

function StarRating({
  rating,
  className,
  showNumber = false,
}: StarRatingProps) {
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
              className={clsx("w-4 h-4 text-yellow-500", {
                "fill-yellow-500": index < rating,
              })}
            />
          )
        )}
    </div>
  );
}
