"use client";
import { ShoppingCart } from "lucide-react";
import { useProducts } from "@/service/products/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

export function ProductsList() {
  const { data } = useProducts();

  return (
    <div className="grid grid-cols-4">
      <ProductCard />
    </div>
  );
}

function ProductCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Title</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet</CardDescription>
      </CardHeader>

      <CardContent>
        <Image
          src="https://picsum.photos/200"
          alt="Product"
          width={200}
          height={200}
        />
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <p>$ 23,75</p>

        <Button variant="ghost">
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}
