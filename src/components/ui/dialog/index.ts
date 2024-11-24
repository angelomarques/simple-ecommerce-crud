import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogContent } from "./content";
import { DialogOverlay } from "./overlay";
import { DialogHeader } from "./header";
import { DialogFooter } from "./footer";
import { DialogTitle } from "./title";
import { DialogDescription } from "./description";

export const Dialog = {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Portal: DialogPrimitive.Portal,
  Close: DialogPrimitive.Close,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
};
