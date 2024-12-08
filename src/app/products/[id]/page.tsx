import { Carousel } from "@/components/ui/carousel";
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

function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  return (
    <main className="max-w-6xl mx-auto py-5 w-full flex-1">
      <h1 className="text-4xl font-bold">{product.title}</h1>

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
    </main>
  );
}
