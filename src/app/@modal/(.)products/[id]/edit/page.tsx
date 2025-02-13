import { getProductById } from "@/service/products";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { EditProductDialog } from "./dialog";
import { QueryKeys } from "@/service/products/queries";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await getProductById(Number(id));

  if (!product)
    return {
      title: "Product not found",
    };

  return {
    title: `${product.title} | Edit | Simple Store`,
    description: product.description,
    openGraph: {
      images: [product.thumbnail],
      description: product.description,
      title: `${product.title} | Edit | Simple Store`,
    },
  };
}

export default async function EditProductModalPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PRODUCTS, Number(id)],
    queryFn: async () => {
      const response = await getProductById(Number(id));

      return response;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditProductDialog />
    </HydrationBoundary>
  );
}
