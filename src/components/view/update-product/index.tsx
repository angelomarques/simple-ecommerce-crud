"use client";

import {
  productsInfiniteQueryDefaultKey,
  useProductsById,
} from "@/service/products/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useUpdateProductMutation } from "@/service/products/mutations";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string(),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1 dollar.",
  }),
});

export const UpdateProduct = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useProductsById(Number(id));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
    },
  });

  const { mutate: updateProduct, isPending } = useUpdateProductMutation(
    Number(id),
    {
      onSuccess: () => {
        toast.success("Product updated successfully!");
        queryClient.invalidateQueries({
          queryKey: productsInfiniteQueryDefaultKey,
        });
        router.push("/");
        form.reset((values) => values, { keepValues: true });
      },
      onError: () => {
        toast.error("An error occurred while updating the product.");
      },
    }
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateProduct(values);
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Form.Field
          control={form.control}
          name="title"
          disabled={isLoading || isPending}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Title</Form.Label>

              <Form.Control>
                <Input
                  placeholder="Type the title of the product..."
                  {...field}
                />
              </Form.Control>
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="description"
          disabled={isLoading || isPending}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Description</Form.Label>

              <Form.Control>
                <Textarea
                  placeholder="Brief description of the product..."
                  className="resize-none"
                  {...field}
                />
              </Form.Control>
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="price"
          disabled={isLoading || isPending}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Price ($)</Form.Label>

              <Form.Control>
                <Input
                  type="number"
                  placeholder="Type the price of the product..."
                  {...field}
                />
              </Form.Control>

              <Form.Message />

              <Form.Description>The minimum price is $1.</Form.Description>
            </Form.Item>
          )}
        />

        <Button type="submit" disabled={isLoading} isLoading={isPending}>
          Update
        </Button>
      </form>
    </Form.Root>
  );
};
