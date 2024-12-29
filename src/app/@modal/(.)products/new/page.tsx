"use client";

import { Dialog } from "@/components/ui/dialog";
import { CreateProduct } from "@/components/view/create-product";
import { usePathname, useRouter } from "next/navigation";

export default function NewProductModal() {
  const router = useRouter();
  const pathname = usePathname();

  const isDialogOpen = pathname.includes("products/new");

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) router.push("/");
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>New Product</Dialog.Title>

          <Dialog.Description>
            Create a new product for your store.
          </Dialog.Description>
        </Dialog.Header>

        <CreateProduct />
      </Dialog.Content>
    </Dialog.Root>
  );
}
