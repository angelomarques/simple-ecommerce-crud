"use client";

import { useProductsStore } from "@/store/products";
import { useUserStore } from "@/store/user";
import { Plus, ShoppingCart, SlidersHorizontal, User } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { SearchInput } from "./ui/search-input";
import { DropdownMenu } from "./ui/dropdown-menu";
import Link from "next/link";

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
        <Link href="/" className="flex-1">
          <h1 className="text-3xl font-bold">Simple Store</h1>
        </Link>

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

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href?: string;
};

const userMenuItems: MenuItem[] = [
  { label: "My Cart", icon: <ShoppingCart /> },
  { label: "Profile", icon: <User /> },
];

const adminMenuItems: MenuItem[] = [
  { label: "New Product", icon: <Plus />, href: "/admin/products/new" },
];

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
        {menuItems.map(({ label, icon: Icon, href }) =>
          href ? (
            <DropdownMenu.Item key={label} asChild>
              <Link href={href}>
                {Icon}

                <span>{label}</span>
              </Link>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item key={label}>
              {Icon}

              <span>{label}</span>
            </DropdownMenu.Item>
          )
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
