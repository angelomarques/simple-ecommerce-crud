import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createProduct } from ".";
import { CreateProductPayloadType, ProductType } from "./types";

export const useCreateProductMutation = (
  mutationOptions: Omit<
    MutationOptions<ProductType, AxiosError<string>, CreateProductPayloadType>,
    "mutationFn"
  >
) => {
  return useMutation<ProductType, AxiosError<string>, CreateProductPayloadType>(
    {
      mutationFn: (newProduct) => {
        return createProduct(newProduct);
      },
      ...mutationOptions,
    }
  );
};
