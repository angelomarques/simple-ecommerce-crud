"use client";
import { ShoppingCart } from "lucide-react";
import { useProducts } from "@/service/products/queries";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/utils";
import { useCallback, useRef } from "react";
import { LoadingSpinner } from "@/assets/loading-spinner";

export function ProductsList() {
  const {
    data: products,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useProducts();
  const observer = useRef<IntersectionObserver>();
  const isLoading = isFetchingNextPage || isFetching;

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {products?.pages.map((item) =>
          item.products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              image={product.thumbnail}
              price={product.price}
              ref={lastElementRef}
            />
          ))
        )}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center py-2 mt-3">
          <LoadingSpinner fill="white" />
        </div>
      )}
    </>
  );
}

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  ref: (node: HTMLDivElement) => void;
}

function ProductCard({
  title,
  description,
  image,
  price,
  ref,
}: ProductCardProps) {
  return (
    <Card.Root ref={ref}>
      <Card.Content>
        <Image src={image} alt="Product" width={200} height={200} />
      </Card.Content>

      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description className="line-clamp-3">
          {description}
        </Card.Description>
      </Card.Header>

      <Card.Footer className="flex justify-between items-center">
        <p>{formatPrice(price)}</p>

        <Button variant="ghost" title="Add to card">
          <ShoppingCart />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
