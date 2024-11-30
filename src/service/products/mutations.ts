import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createProduct, updateProduct } from ".";
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

export const useUpdateProductMutation = (
  id: number,
  mutationOptions: Omit<
    MutationOptions<ProductType, AxiosError<string>, CreateProductPayloadType>,
    "mutationFn"
  >
) => {
  return useMutation<ProductType, AxiosError<string>, CreateProductPayloadType>(
    {
      mutationFn: (updatedProduct) => {
        return updateProduct(id, updatedProduct);
      },
      ...mutationOptions,
    }
  );
};
