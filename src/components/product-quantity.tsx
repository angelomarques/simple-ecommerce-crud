"use client";

import { useCartStore } from "@/store/cart";
import { ProductType } from "@/service/products/types";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props {
  product: ProductType;
  className?: string;
}

export function ProductQuantity({ product, className = "" }: Props) {
  const { addProduct, products, changeProductQuantity } = useCartStore(
    (state) => state
  );

  const productQuantity =
    products.find((p) => p.data.id === product.id)?.quantity || 0;

  if (productQuantity > 0) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 border border-input rounded-md h-9 px-2 w-max",
          className
        )}
      >
        <Button
          title="Decrease quantity"
          variant="ghost"
          className="w-6 h-6"
          onClick={() => changeProductQuantity(product.id, -1)}
        >
          {productQuantity > 1 ? <Minus /> : <Trash />}
        </Button>

        <span>{productQuantity}</span>

        <Button
          title="Increase quantity"
          variant="ghost"
          className={"w-6 h-6"}
          onClick={() => changeProductQuantity(product.id, 1)}
        >
          <Plus />
        </Button>
      </div>
    );
  }

  return (
    <Button
      title="Add to cart"
      className={className}
      onClick={() => addProduct(product)}
    >
      Add to card
    </Button>
  );
}
