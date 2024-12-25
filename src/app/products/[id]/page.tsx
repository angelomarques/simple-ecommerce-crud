import { Carousel } from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/service/products";
import { ProductType } from "@/service/products/types";
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

// TODO: Let layout similar to amazon: image at the left, the info at the right
function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  const previousPrice = (1 + product.discountPercentage / 100) * product.price;

  return (
    <main className="max-w-6xl mx-auto py-5 w-full flex-1">
      <h1 className="text-4xl font-bold">{product.title}</h1>

      <p className="text-lg mt-4 text-slate-300">{product.description}</p>

      <Carousel.Root className="w-3/5 mx-auto mt-12">
        <Carousel.Content>
          {product.images.map((image) => (
            <Carousel.Item key={image}>
              <div className="bg-slate-900 rounded-2xl">
                <Image src={image} alt="Product" width={600} height={600} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>

      <div className="flex gap-0.5 items-end mt-5">
        <p className="text-2xl ">{formatPrice(product.price)}</p>

        <p className="text-slate-400 ml-2">
          <s>{formatPrice(previousPrice)}</s>
        </p>
      </div>
    </main>
  );
}
