import { api } from "@/lib/api";
import { BaseResponse } from "../base/types";
import { ProductSortBy } from "./data";

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
  limit = 10,
  sortBy = ProductSortBy.NONE,
  search,
}: GetProductsParamsType) => {
  const sortByParams = getSortByParams(sortBy);

  const suffixRoute = search ? `/search` : "";

  const { data } = await api.get(`/products${suffixRoute}`, {
    params: { skip: page * limit, limit, q: search, ...sortByParams },
  });

  return data as BaseResponse;
};
