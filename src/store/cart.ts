import {
  getPersistentStorageItem,
  setPersistentStorageItem,
} from "@/service/persistent-storage";
import { PersistentStorageKeys } from "@/service/persistent-storage/types";
import { ProductType } from "@/service/products/types";
import { create } from "zustand";

export type CartProductType = { data: ProductType; quantity: number };

interface CartState {
  products: CartProductType[];
  addProduct: (product: ProductType) => void;
  changeProductQuantity: (productId: number, quantityChange: number) => void;
  emptyCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  products: getPersistentStorageItem(PersistentStorageKeys.CART_PRODUCTS) || [],
  addProduct: (product) =>
    set((state) => {
      const newProducts = [...state.products, { data: product, quantity: 1 }];

      setPersistentStorageItem(
        PersistentStorageKeys.CART_PRODUCTS,
        newProducts
      );

      return {
        ...state,
        products: newProducts,
      };
    }),
  changeProductQuantity: (productId, quantityChange) =>
    set((state) => {
      const newProducts: CartProductType[] = [];

      state.products.forEach((product) => {
        if (product.data.id !== productId) {
          newProducts.push(product);
          return;
        }

        const newQuantity = product.quantity + quantityChange;

        if (newQuantity < 1) {
          return;
        }

        newProducts.push({
          data: product.data,
          quantity: newQuantity,
        });
      });

      setPersistentStorageItem(
        PersistentStorageKeys.CART_PRODUCTS,
        newProducts
      );

      return {
        ...state,
        products: newProducts,
      };
    }),
  emptyCart: () =>
    set((state) => {
      setPersistentStorageItem(PersistentStorageKeys.CART_PRODUCTS, []);

      return {
        ...state,
        products: [],
      };
    }),
}));
