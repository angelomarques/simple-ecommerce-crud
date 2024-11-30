import { api } from "@/lib/api";
import { BaseResponse } from "../base/types";
import { ProductSortBy } from "./data";
import { CreateProductPayloadType, ProductType } from "./types";

type GetProductsParamsType = {
  page?: number;
  limit?: number;
  sortBy?: ProductSortBy;
  search?: string;
};

const getSortByParams = (sortBy: ProductSortBy) => {
  switch (sortBy) {
    case ProductSortBy.TITLE_ASC:
      return { sortBy: "title", order: "asc" };
    case ProductSortBy.TITLE_DESC:
      return { sortBy: "title", order: "desc" };
    case ProductSortBy.BRAND_ASC:
      return { sortBy: "brand", order: "asc" };
    case ProductSortBy.BRAND_DESC:
      return { sortBy: "brand", order: "desc" };
    case ProductSortBy.NONE:
      return {};
  }
};

export const getProducts = async ({
  page = 1,
  limit = 12,
  sortBy = ProductSortBy.NONE,
  search,
}: GetProductsParamsType) => {
  const sortByParams = getSortByParams(sortBy);

  const suffixRoute = search ? `/search` : "";

  const { data } = await api.get<BaseResponse>(`/products${suffixRoute}`, {
    params: { skip: page * limit, limit, q: search, ...sortByParams },
  });

  return data;
};

export const createProduct = async (data: CreateProductPayloadType) => {
  const { data: response } = await api.post<ProductType>("/products/add", data);

  return response;
};

export const getProductById = async (id: number) => {
  const { data } = await api.get<ProductType>(`/products/${id}`);

  return data;
};

export const updateProduct = async (
  id: number,
  data: CreateProductPayloadType
) => {
  const { data: response } = await api.put<ProductType>(
    `/products/${id}`,
    data
  );

  return response;
};
