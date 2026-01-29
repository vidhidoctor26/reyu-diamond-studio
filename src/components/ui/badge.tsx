import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: 
          "border-transparent bg-primary text-primary-foreground shadow-soft",
        secondary: 
          "border-transparent bg-secondary text-secondary-foreground",
        destructive: 
          "border-transparent bg-destructive/10 text-destructive",
        outline: 
          "text-foreground border-border/50",
        success:
          "border-transparent bg-success/10 text-success",
        warning:
          "border-transparent bg-warning/10 text-warning",
        info:
          "border-transparent bg-info/10 text-info",
        premium:
          "border-transparent bg-gradient-to-r from-accent/20 to-[hsl(262_70%_55%/0.2)] text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
