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
import { formatPrice } from "@/lib/utils";

export function ProductsList() {
  const { data } = useProducts();

  return (
    <div className="grid grid-cols-4 gap-5">
      {data?.products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          image={product.thumbnail}
          price={product.price}
        />
      ))}
    </div>
  );
}

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
}

function ProductCard({ title, description, image, price }: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <Image src={image} alt="Product" width={200} height={200} />
      </CardContent>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-center">
        <p>{formatPrice(price)}</p>

        <Button variant="ghost" title="Add to card">
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}
