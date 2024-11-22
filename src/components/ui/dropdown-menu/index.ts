import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuCheckboxItem } from "./checkbox-item";
import { DropdownMenuContent } from "./content";
import { DropdownMenuItem } from "./item";
import { DropdownMenuLabel } from "./label";
import { DropdownMenuRadioItem } from "./radio-item";
import { DropdownMenuSeparator } from "./separator";
import { DropdownMenuShortcut } from "./shortcut";
import { DropdownMenuSubContent } from "./sub-content";
import { DropdownMenuSubTrigger } from "./sub-trigger";

export const DropdownMenu = {
  Root: DropdownMenuPrimitive.Root,
  Trigger: DropdownMenuPrimitive.Trigger,
  Group: DropdownMenuPrimitive.Group,
  Portal: DropdownMenuPrimitive.Portal,
  Sub: DropdownMenuPrimitive.Sub,
  RadioGroup: DropdownMenuPrimitive.RadioGroup,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  Label: DropdownMenuLabel,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
};
