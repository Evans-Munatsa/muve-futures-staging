"use client";
// Radix Slot (used by `asChild`) calls hooks, so this must be a Client Component.

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-brand-green text-white hover:brightness-95 shadow-sm",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        outline:
          "border-2 border-white text-white hover:bg-white hover:text-brand-green shadow-xs",
        secondary:
          "bg-brand-ink text-white hover:bg-brand-ink/90 shadow-sm",
        ghost: "hover:bg-black/5 text-current",
        link: "text-brand-ink underline-offset-4 hover:underline",
        coral: "bg-brand-orange text-white hover:bg-[#d94e20] shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
        navy: "bg-brand-ink text-white hover:bg-brand-ink/90 shadow-md hover:shadow-lg",
        white: "bg-white text-brand-ink hover:bg-neutral-100 shadow-md",
        orange: "bg-brand-orange text-white hover:bg-[#d94e20] active:scale-100",
        "outline-white":
          "border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-ink active:scale-100",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        pill: "h-auto px-7 py-3",
        "pill-sm": "h-auto px-4 py-2 text-xs",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
