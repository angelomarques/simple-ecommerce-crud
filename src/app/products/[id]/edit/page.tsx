import { UpdateProduct } from "@/components/view/update-product";
import { getProductById } from "@/service/products";
import { QueryKeys } from "@/service/products/queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UpdateProductPage({ params }: Props) {
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
      <main className="max-w-7xl mx-auto p-5 w-full flex-1 flex flex-col">
        <UpdateProduct />
      </main>
    </HydrationBoundary>
  );
}
