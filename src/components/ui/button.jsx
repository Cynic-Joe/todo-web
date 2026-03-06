import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[16px] border text-sm font-medium transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-ink bg-[linear-gradient(180deg,var(--color-ink),var(--color-ink-soft))] text-primary-foreground shadow-[0_10px_20px_rgba(79,75,67,0.16)] hover:-translate-y-0.5 hover:brightness-[1.04]",
        secondary:
          "border-border bg-card/90 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5 hover:border-border-strong hover:bg-card",
        tonal:
          "border-border/55 bg-secondary/78 text-foreground hover:-translate-y-0.5 hover:bg-secondary-strong/88",
        success:
          "border-success/70 bg-[linear-gradient(180deg,var(--color-success),var(--color-success-soft))] text-white hover:-translate-y-0.5 hover:brightness-[1.03]",
        danger:
          "border-destructive/70 bg-[linear-gradient(180deg,var(--color-destructive),var(--color-destructive-soft))] text-white hover:-translate-y-0.5 hover:brightness-[1.03]",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
        outline:
          "border-border-strong/80 bg-transparent text-foreground hover:bg-card/74",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        icon: "size-11 rounded-[18px]",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export function Button({ className, variant, size, type = "button", ...props }) {
  return <button className={cn(buttonVariants({ variant, size }), className)} type={type} {...props} />;
}
