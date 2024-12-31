import { create } from "zustand";

export type UserViewType = "customer" | "admin";

interface UserState {
  view: UserViewType;
  setView: (view: UserViewType) => void;
}

export const useUserStore = create<UserState>((set) => ({
  view: "customer",
  setView: (view) =>
    set((state) => ({
      ...state,
      view,
    })),
}));
