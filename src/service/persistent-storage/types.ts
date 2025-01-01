import { CartProductType } from "@/store/cart";

export enum PersistentStorageKeys {
  CART_PRODUCTS = "cart_products",
}

export interface PersistentStorageType {
  [PersistentStorageKeys.CART_PRODUCTS]: CartProductType[];
}
