"use client";

import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
export const CreateProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <Form.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form.Root>
  );
};
