import { useQuery } from "@tanstack/react-query";
import { getProducts } from ".";

enum QueryKeys {
  PRODUCTS = "products",
}

export const useProducts = () =>
  useQuery({ queryKey: [QueryKeys.PRODUCTS], queryFn: getProducts });
