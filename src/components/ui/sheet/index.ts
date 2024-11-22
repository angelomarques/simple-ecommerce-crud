import * as SheetPrimitive from "@radix-ui/react-dialog";
import { SheetContent } from "./content";
import { SheetHeader } from "./header";
import { SheetOverlay } from "./overlay";
import { SheetPortal } from "./portal";
import { SheetFooter } from "./footer";
import { SheetTitle } from "./title";
import { SheetDescription } from "./description";

export const Sheet = {
  Root: SheetPrimitive.Root,
  Trigger: SheetPrimitive.Trigger,
  Close: SheetPrimitive.Close,
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription,
};
