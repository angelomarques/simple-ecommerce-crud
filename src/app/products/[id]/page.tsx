import { getProductById } from "@/service/products";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  try {
    const product = await getProductById(Number(id));

    if (!product) return notFound();

    return <div>Product Page {product.title}</div>;
  } catch (_error) {
    return notFound();
  }
}
