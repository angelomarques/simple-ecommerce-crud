import { Header } from "@/components/header";
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
