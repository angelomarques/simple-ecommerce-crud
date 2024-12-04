import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AlertDialogOverlay } from "./overlay";
import { AlertDialogContent } from "./content";
import { AlertDialogHeader } from "./header";
import { AlertDialogFooter } from "./footer";
import { AlertDialogTitle } from "./title";
import { AlertDialogDescription } from "./description";
import { AlertDialogAction } from "./action";
import { AlertDialogCancel } from "./cancel";

export const AlertDialog = {
  Root: AlertDialogPrimitive.Root,
  Trigger: AlertDialogPrimitive.Trigger,
  Portal: AlertDialogPrimitive.Portal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
};
