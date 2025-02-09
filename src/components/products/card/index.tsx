import { useAddToCartAnimation } from "@/hooks/use-add-to-cart-animation";
import { ProductType } from "@/service/products/types";
import { useUserStore } from "@/store/user";
import { Card } from "../../ui/card";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../../ui/button";
import { Info, Pencil, Trash } from "lucide-react";
import { ProductQuantity } from "../../product-quantity";
import { MouseEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProductMutation } from "@/service/products/mutations";
import { toast } from "sonner";
import { productsInfiniteQueryDefaultKey } from "@/service/products/queries";
import { AlertDialog } from "../../ui/alert-dialog";

interface Props {
  product: ProductType;
  ref: (node: HTMLDivElement) => void;
}

export function ProductCard({ ref, product }: Props) {
  const { id, title, description, thumbnail, price } = product;
  const userView = useUserStore((state) => state.view);

  const { elementToAnimate, elementClasses, animate } = useAddToCartAnimation();

  return (
    <Card.Root ref={ref} data-testid={`product-${id}`}>
      <Card.Content>
        <div className="relative w-48 aspect-square sm:mt-4 mx-auto">
          <Image src={thumbnail} alt="Product" fill sizes="10vw" />
          <div
            className={cn(
              "absolute z-50 w-12 h-12 absolute-centered-x absolute-centered-y pointer-events-none",
              elementClasses
            )}
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
          <span className="sr-only">Delete</span>
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
              Confirm
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
