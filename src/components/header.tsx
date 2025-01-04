"use client";

import { useProductsStore } from "@/store/products";
import { useUserStore } from "@/store/user";
import {
  Columns2,
  Plus,
  ShoppingCart,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { DropdownMenu } from "./ui/dropdown-menu";
import { SearchInput } from "./ui/search-input";
import { useCartStore } from "@/store/cart";

export function Header() {
  const setProductSearch = useProductsStore((state) => state.setQuerySearch);
  const cart = useCartStore((state) => state.products);

  const totalProductsQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const handleSearch = (query: string) => {
    setProductSearch(query);
  };

  return (
    <div className="h-32 lg:h-24 w-full">
      <header className="w-full border-b border-b-slate-500 fixed top-0 left-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto py-4 flex justify-between items-center px-5">
          <Link href="/" className="flex-1">
            <p className="text-2xl sm:text-3xl font-bold">Simple Store</p>
          </Link>

          <SearchInput
            onSearch={handleSearch}
            className="w-96"
            classes={{ root: "hidden lg:block" }}
          />

          <div className="flex-1 flex items-center justify-end gap-3">
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "relative",
              })}
              href="/cart"
              title="Cart"
              id="cart-link"
            >
              <ShoppingCart />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-danger-500 text-sm font-semibold text-white bg-red-500">
                {totalProductsQuantity}
              </span>
            </Link>

            <HeaderMenu />

            <Avatar.Root>
              <Avatar.Image src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
              <Avatar.Fallback>
                <User />
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
        </div>

        <div className="px-4 pb-4">
          <SearchInput
            onSearch={handleSearch}
            className="w-full"
            classes={{ root: "lg:hidden w-full" }}
          />
        </div>
      </header>
    </div>
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
  { label: "New Product", icon: <Plus />, href: "/products/new" },
];

const HeaderMenu = () => {
  const userView = useUserStore((state) => state.view);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = userView === "admin" ? adminMenuItems : userMenuItems;

  const handleToggleView = (newIsOpen: boolean) => {
    setIsOpen(newIsOpen);
  };

  const onChangeViewDialogOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
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

          <DropdownMenu.Item onClick={onChangeViewDialogOpen}>
            <Columns2 />

            <span>Change view</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <ChooseViewDialog onOpenChange={handleToggleView} open={isOpen} />
    </>
  );
};

interface ChooseViewDialogProps {
  onOpenChange: (isOpen: boolean) => void;
  open: boolean;
}

const ChooseViewDialog = ({ onOpenChange, open }: ChooseViewDialogProps) => {
  const { setView } = useUserStore((state) => state);

  const onAdminViewClick = () => {
    setView("admin");
    onOpenChange(false);
  };

  const onCustomerViewClick = () => {
    setView("customer");
    onOpenChange(false);
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Choose the view</Dialog.Title>
          <Dialog.Description>
            You can choose between admin view and user view
          </Dialog.Description>
        </Dialog.Header>

        <div className="flex w-full flex-col items-stretch gap-4 mt-6">
          <Button variant="secondary" onClick={onAdminViewClick}>
            Admin view
          </Button>
          <Button variant="secondary" onClick={onCustomerViewClick}>
            Customer view
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
