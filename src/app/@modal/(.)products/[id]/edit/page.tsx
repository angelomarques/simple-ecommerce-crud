import { getProductById } from "@/service/products";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { EditProductDialog } from "./dialog";
import { QueryKeys } from "@/service/products/queries";

interface Props {
  params: Promise<{ id: string }>;
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
