import { create } from "zustand";

interface ProductsState {
  queries: null | { search?: string };
  setQuerySearch: (search: string) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  queries: null,
  setQuerySearch: (newSearch) =>
    set((state) => ({ queries: { ...state.queries, search: newSearch } })),
}));
