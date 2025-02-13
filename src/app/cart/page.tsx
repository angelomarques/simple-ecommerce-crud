import { Metadata } from "next";
import { CartPageContent } from "./content";

export const metadata: Metadata = {
  title: "Cart | Simple Store",
  description: "Your Shopping Cart!",
};

export default function CartPage() {
  return <CartPageContent />;
}
