"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Form.Field
          control={form.control}
          name="title"
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

        <Button type="submit">Update</Button>
      </form>
    </Form.Root>
  );
};
