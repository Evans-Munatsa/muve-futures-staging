import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#8cc63f] text-white hover:bg-[#7db437]",
        secondary:
          "border-transparent bg-[#092233] text-white hover:bg-[#123650]",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        outline: "text-[#092233] border-neutral-300",
        coral: "border-transparent bg-[#f05a28] text-white hover:bg-[#d94e20]",
        navy: "border-transparent bg-[#092233] text-white hover:bg-[#123650]",
        lime: "border-transparent bg-[#8cc63f] text-white hover:bg-[#7db437]",
        white: "border-transparent bg-white text-[#092233]",
        greenSoft: "border-emerald-200 bg-emerald-50 text-emerald-800",
        orangeSoft: "border-orange-200 bg-orange-50 text-orange-800",
        blueSoft: "border-sky-200 bg-sky-50 text-sky-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
  key?: React.Key;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
