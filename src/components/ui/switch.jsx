import { cn } from "../../lib/utils";

export function Switch({ checked, className, ...props }) {
  return (
    <button
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full border transition outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        checked
          ? "border-ink bg-ink-soft"
          : "border-border bg-card/84",
        className,
      )}
      role="switch"
      type="button"
      {...props}
    >
      <span
        className={cn(
          "block size-5 rounded-full bg-card shadow-[0_4px_14px_rgba(58,44,34,0.18)] transition",
          checked ? "translate-x-[22px]" : "translate-x-1",
        )}
      />
    </button>
  );
}
