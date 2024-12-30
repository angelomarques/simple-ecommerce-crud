import { ProductType } from "@/service/products/types";
import { create } from "zustand";

export type CartProductType = { data: ProductType; quantity: number };

interface CartState {
  products: CartProductType[];
  addProduct: (product: CartProductType) => void;
  removeProduct: (productId: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({
      ...state,
      products: [...state.products, product],
    })),
  removeProduct: (productId) =>
    set((state) => {
      const newProducts: CartProductType[] = [];

      state.products.forEach((product) => {
        if (product.data.id !== productId) {
          newProducts.push(product);
          return;
        }

        if (product.quantity === 1) {
          return;
        }

        newProducts.push({
          data: product.data,
          quantity: product.quantity - 1,
        });
      });

      return {
        ...state,
        products: newProducts,
      };
    }),
}));
