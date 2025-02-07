"use client";

import { LoadingSpinner } from "@/assets/loading-spinner";
import { ProductSortBy } from "@/service/products/data";
import { useProducts } from "@/service/products/queries";
import { useProductsStore } from "@/store/products";
import { useCallback, useRef, useState } from "react";
import { Select } from "../ui/select";
import { ProductCard } from "./card";

const sortByOptions = [
  { value: ProductSortBy.TITLE_ASC, label: "Title (A -> Z)" },
  { value: ProductSortBy.TITLE_DESC, label: "Title (Z -> A)" },
  { value: ProductSortBy.BRAND_ASC, label: "Brand (A -> Z)" },
  { value: ProductSortBy.BRAND_DESC, label: "Brand (Z -> A)" },
  { value: ProductSortBy.NONE, label: "None" },
];

export function ProductsList() {
  const [selectedSortBy, setSelectedSortBy] = useState<ProductSortBy>(
    ProductSortBy.NONE
  );

  const productsSearch = useProductsStore((state) => state.queries?.search);

  const {
    data: products,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isLoading: isQueryLoading,
  } = useProducts({ sortBy: selectedSortBy, search: productsSearch });
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

  const handleSortByChange = (sortBy: ProductSortBy) => {
    setSelectedSortBy(sortBy);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="text-sm">Sort by</p>
        <Select.Root
          defaultValue={ProductSortBy.NONE}
          onValueChange={handleSortByChange}
        >
          <Select.Trigger className="w-48">
            <Select.Value placeholder="Select a category" />
          </Select.Trigger>

          <Select.Content>
            {sortByOptions.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      {isQueryLoading ? (
        <div className="flex justify-center items-center flex-1">
          <LoadingSpinner fill="white" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 relative">
          {products?.pages.map((item) =>
            item.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                ref={lastElementRef}
              />
            ))
          )}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center py-2 mt-3"></div>
      )}
    </>
  );
}
