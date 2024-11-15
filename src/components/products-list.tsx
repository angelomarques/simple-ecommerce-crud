"use client";
import { useProducts } from "@/service/products/queries";

export function ProductsList() {
  const { data } = useProducts();

  return (
    <div>
      <h1>Products List</h1>
    </div>
  );
}
