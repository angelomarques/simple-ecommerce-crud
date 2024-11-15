import { Product } from "../products/types";

export type BaseResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};
