import { ProductType } from "../products/types";

export type BaseResponse = {
  products: ProductType[];
  limit: number;
  skip: number;
  total: number;
};
