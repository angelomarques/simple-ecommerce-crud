import { CreateProduct } from "@/components/view/create-product";

export default function NewProductPage() {
  return (
    <main className="max-w-7xl mx-auto p-5 w-full flex-1 flex flex-col">
      <h1 className="text-2xl font-bold">New Product</h1>
      <p className="text-slate-300 mt-2 mb-6">
        Create a new product for your store.
      </p>

      <CreateProduct />
    </main>
  );
}
