import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-[18px] border border-border/75 bg-card/88 px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.44)] outline-none transition placeholder:text-muted-foreground/75 focus:border-border-strong focus:bg-card focus:ring-2 focus:ring-ring/20",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
