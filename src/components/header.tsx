"use client";

import { useProductsStore } from "@/store/products";
import { useUserStore } from "@/store/user";
import { Plus, ShoppingCart, SlidersHorizontal, User } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { SearchInput } from "./ui/search-input";
import { DropdownMenu } from "./ui/dropdown-menu";

export function Header() {
  const setProductSearch = useProductsStore((state) => state.setQuerySearch);
  const { toggleView: toggleUserView, view: userView } = useUserStore(
    (state) => state
  );

  const handleSearch = (query: string) => {
    setProductSearch(query);
  };

  const getViewButtonText = () => {
    switch (userView) {
      case "admin":
        return "Customer view";
      case "customer":
        return "Admin view";
    }
  };

  return (
    <header className="w-full border-b border-b-slate-500">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex-1">Simple Store</h1>

        <SearchInput onSearch={handleSearch} />

        <div className="flex-1 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={toggleUserView}>
            {getViewButtonText()}
          </Button>

          <HeaderMenu />

          <Avatar.Root>
            <Avatar.Image src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
            <Avatar.Fallback>
              <User />
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>
    </header>
  );
}

const userMenuItems = [
  { label: "My Cart", icon: <ShoppingCart /> },
  { label: "Profile", icon: <User /> },
];

const adminMenuItems = [{ label: "New Product", icon: <Plus /> }];

const HeaderMenu = () => {
  const userView = useUserStore((state) => state.view);

  const menuItems = userView === "admin" ? adminMenuItems : userMenuItems;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {menuItems.map(({ label, icon: Icon }) => (
          <DropdownMenu.Item key={label}>
            {Icon}

            <span>{label}</span>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
