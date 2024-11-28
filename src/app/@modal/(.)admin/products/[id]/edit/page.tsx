"use client";

import { Dialog } from "@/components/ui/dialog";
import { UpdateProduct } from "@/components/view/update-product";
import { usePathname, useRouter } from "next/navigation";

export default function NewProductModal() {
  const router = useRouter();
  const pathname = usePathname();

  const pathRegex = /admin\/products\/\d+\/edit/;
  const isDialogOpen = pathRegex.test(pathname);

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) router.push("/");
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit Product</Dialog.Title>

          <Dialog.Description>
            Update the necessary fields for your product.
          </Dialog.Description>
        </Dialog.Header>

        <UpdateProduct />
      </Dialog.Content>
    </Dialog.Root>
  );
}
