"use client";

import { LoadingSpinner } from "@/assets/loading-spinner";
import { formatPrice } from "@/lib/utils";
import { ProductSortBy } from "@/service/products/data";
import { useDeleteProductMutation } from "@/service/products/mutations";
import {
  productsInfiniteQueryDefaultKey,
  useProducts,
} from "@/service/products/queries";
import { ProductType } from "@/service/products/types";
import { useProductsStore } from "@/store/products";
import { useUserStore } from "@/store/user";
import { useQueryClient } from "@tanstack/react-query";
import { Info, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { ProductQuantity } from "./product-quantity";
import { AlertDialog } from "./ui/alert-dialog";
import { Button, buttonVariants } from "./ui/button";
import { Card } from "./ui/card";
import { Select } from "./ui/select";
import { useAddToCartAnimation } from "@/hooks/use-add-to-cart-animation";

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

interface ProductCardProps {
  product: ProductType;
  ref: (node: HTMLDivElement) => void;
}

function ProductCard({ ref, product }: ProductCardProps) {
  const { id, title, description, thumbnail, price } = product;
  const userView = useUserStore((state) => state.view);

  const { elementToAnimate, animate } = useAddToCartAnimation();

  return (
    <Card.Root ref={ref}>
      <Card.Content>
        <div className="relative w-48 aspect-square sm:mt-4 mx-auto">
          <Image src={thumbnail} alt="Product" fill sizes="10vw" />
          <div
            className="absolute z-50 w-12 h-12 absolute-centered-x absolute-centered-y"
            ref={elementToAnimate}
          >
            <Image src={thumbnail} alt="Product" fill sizes="5vw" />
          </div>
        </div>

        <Card.Header>
          <Card.Title className="product-card-title">{title}</Card.Title>
          <Card.Description className="line-clamp-3 product-card-description">
            {description}
          </Card.Description>
        </Card.Header>

        <Card.Footer className="block space-y-3">
          <p>{formatPrice(price)}</p>

          <div className="flex items-center gap-2">
            <Link
              className={buttonVariants({ variant: "secondary" })}
              title="View Product Details"
              href={`/products/${id}`}
            >
              <Info />
            </Link>

            {userView === "admin" && (
              <>
                <DeleteProductDialog id={id} productTitle={title} />

                <Link
                  className={buttonVariants({ variant: "secondary" })}
                  title="Edit Product"
                  href={`/products/${id}/edit`}
                >
                  <Pencil />
                </Link>
              </>
            )}

            {userView === "customer" && (
              <ProductQuantity product={product} onAddToCart={animate} />
            )}
          </div>
        </Card.Footer>
      </Card.Content>
    </Card.Root>
  );
}

interface DeleteProductDialogProps {
  id: number;
  productTitle: string;
}

const DeleteProductDialog = ({
  id,
  productTitle,
}: DeleteProductDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending } = useDeleteProductMutation(id, {
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: productsInfiniteQueryDefaultKey,
      });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("An error occurred while deleting the product.");
    },
  });

  const handleConfirmClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deleteProduct();
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={handleDialogOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button variant="secondary">
          <Trash />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete Product</AlertDialog.Title>
          <AlertDialog.Description>
            {`Are you sure you want to delete the product "${productTitle}"?`}
          </AlertDialog.Description>
        </AlertDialog.Header>

        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button
              variant="destructive"
              onClick={handleConfirmClick}
              isLoading={isPending}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
