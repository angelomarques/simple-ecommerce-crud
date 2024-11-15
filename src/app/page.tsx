import { ProductsList } from "@/components/products-list";

export default function Home() {
  return (
    <div>
      <Header />

      <ProductsList />
    </div>
  );
}

export function Header() {
  return (
    <header className="w-full border-b border-b-slate-500">
      <div className="max-w-4xl mx-auto py-4">
        <h1 className="text-3xl font-bold">Simple Store</h1>
      </div>
    </header>
  );
}
