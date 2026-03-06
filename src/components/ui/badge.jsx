import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase",
  {
    variants: {
      tone: {
        neutral: "bg-secondary text-muted-foreground",
        ink: "bg-ink text-primary-foreground",
        soft: "bg-white/80 text-foreground border border-border",
        success: "bg-success/12 text-success-strong",
        danger: "bg-destructive/12 text-destructive-strong",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export function Badge({ className, tone, ...props }) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
