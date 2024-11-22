import { create } from "zustand";

type UserViewType = "customer" | "admin";

interface UserState {
  view: UserViewType;
  toggleView: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  view: "admin",
  toggleView: () =>
    set((state) => ({
      ...state,
      view: state.view === "admin" ? "customer" : "admin",
    })),
}));
