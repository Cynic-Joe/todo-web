import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-[18px] border border-border bg-white/78 px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition placeholder:text-muted-foreground/75 focus:border-border-strong focus:bg-white focus:ring-2 focus:ring-ring/20",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
