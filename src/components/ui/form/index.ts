import { FormProvider } from "react-hook-form";
import { FormField } from "./field";
import { FormLabel } from "./label";
import { FormItem } from "./item";
import { FormControl } from "./control";
import { FormDescription } from "./description";
import { FormMessage } from "./message";

export const Form = {
  Root: FormProvider,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
};
