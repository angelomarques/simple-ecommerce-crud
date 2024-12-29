import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getProductById, getProducts } from ".";
import { BaseResponse } from "../base/types";
import { ProductSortBy } from "./data";
import { ProductType } from "./types";

export enum QueryKeys {
  PRODUCTS = "products",
}

type UseProductParamsType = {
  sortBy?: ProductSortBy;
  search?: string;
};

export const productsInfiniteQueryDefaultKey = [
  QueryKeys.PRODUCTS,
  { sortBy: "none", search: undefined },
];

export function useProducts(
  params?: UseProductParamsType,
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
      const data = await getProducts({
        page: Number(pageParam),
        sortBy: params?.sortBy,
        search: params?.search,
      });

      return data;
    },
    queryKey: [QueryKeys.PRODUCTS, params],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.products.length ? allPages.length + 1 : undefined,
    ...queryOptions,
  });
}

export function useProductsById(id: number) {
  return useQuery<ProductType>({
    queryKey: [QueryKeys.PRODUCTS, id],
    queryFn: async () => {
      const data = await getProductById(id);

      return data;
    },
  });
}
