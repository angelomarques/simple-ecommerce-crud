import { ProductsList } from "@/components/products/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Simple Store",
  description: "Simple E-commerce CRUD Project ",
};

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-5 w-full flex-1 flex flex-col">
      <ProductsList />
    </main>
  );
}
