import { ProductsList } from "@/components/products-list";

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
      <div className="max-w-6xl mx-auto py-4">
        <h1 className="text-3xl font-bold">Simple Store</h1>
      </div>
    </header>
  );
}
