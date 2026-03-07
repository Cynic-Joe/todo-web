import { cn } from "../../lib/utils";

export function Switch({ checked, className, ...props }) {
  return (
    <button
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full border transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none",
        checked
          ? "border-ink bg-ink"
          : "border-border bg-white/80",
        className,
      )}
      role="switch"
      type="button"
      {...props}
    >
      <span
        className={cn(
          "block size-5 rounded-full bg-white shadow-[0_4px_14px_rgba(58,44,34,0.18)] transition",
          checked ? "translate-x-[22px]" : "translate-x-1",
        )}
      />
    </button>
  );
}
