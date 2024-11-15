import { api } from "@/lib/api";
import { BaseResponse } from "../base/types";

export const getProducts = async (page: number, limit = 10) => {
  const { data } = await api.get("/products", {
    params: { skip: page * limit, limit },
  });

  return data as BaseResponse;
};
