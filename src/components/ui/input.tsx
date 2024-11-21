import * as React from "react";

import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"input"> {
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, suffix, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />

        {suffix && (
          <span className="absolute right-2 top-1/2 h-full -translate-y-1/2 text-muted-foreground pointer-events-none flex items-center">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
