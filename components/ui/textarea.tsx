import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-[#092233] ring-offset-background placeholder:text-neutral-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#8cc63f] focus-visible:border-[#8cc63f] disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-xs resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
