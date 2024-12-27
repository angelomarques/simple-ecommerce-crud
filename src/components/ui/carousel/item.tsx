"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useCarousel } from "./hooks";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation, slidesPerView } = useCarousel();

  const flexBasisValue = (1 / slidesPerView) * 100;
  const flexBasisClassName = `basis-[${flexBasisValue}%]`;

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        flexBasisClassName,
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";
