"use client";

import { ProductQuantity } from "@/components/product-quantity";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import Image from "next/image";

export default function CartPage() {
  const { products } = useCartStore((state) => state);

  const totalProductsQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const totalProductsPrice = products.reduce(
    (acc, product) => acc + product.quantity * product.data.price,
    0
  );

  return (
    <main className="max-w-7xl mx-auto p-5 w-full flex-1">
      <h1 className="text-2xl font-bold">My Shopping Cart</h1>

      {products.length ? (
        <div className="grid grid-cols-1 divide-y mt-2">
          {products.map((product) => (
            <div key={product.data.id} className="flex items-center gap-2 py-5">
              <div className="w-28 aspect-square relative">
                <Image
                  src={product.data.thumbnail}
                  alt="Product"
                  className="w-full h-full object-cover"
                  fill
                  sizes="10vw"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <p className="text-base font-semibold">{product.data.title}</p>
                <p className="text-sm text-slate-400">
                  {product.data.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-base">
                  {product.quantity} x {formatPrice(product.data.price)}
                </p>

                <ProductQuantity product={product.data} className="h-6" />
              </div>
            </div>
          ))}

          <div className="flex gap-5 py-5">
            <p>
              Total ({totalProductsQuantity}): {formatPrice(totalProductsPrice)}
            </p>
            <Button>Checkout</Button>
          </div>
        </div>
      ) : (
        <p className="mt-7 text-slate-400">Your cart is empty</p>
      )}
    </main>
  );
}
