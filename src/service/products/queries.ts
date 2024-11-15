import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getProducts } from ".";
import { BaseResponse } from "../base/types";

enum QueryKeys {
  PRODUCTS = "products",
}

export function useProducts(
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      BaseResponse,
      AxiosError<string>,
      InfiniteData<BaseResponse>
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >
) {
  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getProducts(Number(pageParam));

      return data;
    },
    queryKey: [QueryKeys.PRODUCTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.products.length ? allPages.length + 1 : undefined,
    ...queryOptions,
  });
}
