import { ProductsList } from "@/components/products-list";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto py-5 w-full flex-1 flex flex-col">
      <ProductsList />
    </main>
  );
}
