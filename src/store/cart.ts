import { ProductType } from "@/service/products/types";
import { create } from "zustand";

export type CartProductType = { data: ProductType; quantity: number };

interface CartState {
  products: CartProductType[];
  addProduct: (product: ProductType) => void;
  changeProductQuantity: (productId: number, quantityChange: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({
      ...state,
      products: [...state.products, { data: product, quantity: 1 }],
    })),
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

      return {
        ...state,
        products: newProducts,
      };
    }),
}));
