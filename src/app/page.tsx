import { ProductsList } from "@/components/products-list";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto py-5 w-full flex-1 flex flex-col">
        <ProductsList />
      </main>
    </div>
  );
}

export function Header() {
  return (
    <header className="w-full border-b border-b-slate-500">
      <div className="max-w-6xl mx-auto py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold flex-1">Simple Store</h1>

        <Input
          className="w-96"
          placeholder="Search a product..."
          suffix={<Search />}
        />

        <div className="flex-1 flex items-center justify-end">
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
