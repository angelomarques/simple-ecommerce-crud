"use client";

import { User } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { SearchInput } from "./ui/search-input";
import { useProductsStore } from "@/store/products";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user";

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
