import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/service/products";
import { ProductType } from "@/service/products/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomerReviews } from "./customer-reviews";
import { StarRating } from "./star-rating";

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
    <main className="max-w-7xl mx-auto p-5 w-full flex-1">
      <div className="lg:flex gap-16 mt-6 lg:mt-12">
        <div className="mx-auto flex-[1.3] w-full lg:w-3/5 px-5 lg:px-10">
          <Carousel.Root className="mx-10">
            <Carousel.Content>
              {product.images.map((image) => (
                <Carousel.Item key={image}>
                  <div className="bg-slate-900 rounded-2xl w-full aspect-square lg:h-[500px] lg:w-[500px] flex items-center justify-center">
                    <Image src={image} alt="Product" width={500} height={500} />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>

            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        </div>

        <div className="flex-1 flex flex-col mt-5 lg:mt-0">
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

          <div className="flex gap-3 flex-wrap mt-5 lg:mt-auto">
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

      <CustomerReviews reviews={product.reviews} />
    </main>
  );
}
