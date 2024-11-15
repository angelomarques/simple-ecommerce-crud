import { api } from "@/lib/api";
import { BaseResponse } from "../base/types";

export const getProducts = async () => {
  const { data } = await api.get("/products");

  return data as BaseResponse;
};
