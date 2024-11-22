import { SidebarContent } from "./content";
import { SidebarFooter } from "./footer";
import {
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupRoot,
} from "./group";
import { SidebarHeader } from "./header";
import { SidebarInput } from "./input";
import { SidebarInset } from "./inset";
import {
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuRoot,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./menu";
import { SidebarProvider } from "./provider";
import { SidebarRail } from "./rail";
import { SidebarRoot } from "./root";
import { SidebarSeparator } from "./separator";
import { SidebarTrigger } from "./trigger";

export const Sidebar = {
  Root: SidebarRoot,
  Content: SidebarContent,
  Footer: SidebarFooter,
  GroupRoot: SidebarGroupRoot,
  GroupLabel: SidebarGroupLabel,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  Header: SidebarHeader,
  Input: SidebarInput,
  Inset: SidebarInset,
  MenuRoot: SidebarMenuRoot,
  MenuItem: SidebarMenuItem,
  MenuButton: SidebarMenuButton,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuSkeleton: SidebarMenuSkeleton,
  MenuSub: SidebarMenuSub,
  MenuSubItem: SidebarMenuSubItem,
  MenuSubButton: SidebarMenuSubButton,
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger,
};
