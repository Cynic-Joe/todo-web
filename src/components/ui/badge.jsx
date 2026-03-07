import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "border-transparent bg-secondary/85 text-muted-foreground",
        ink: "border-transparent bg-ink text-primary-foreground",
        soft: "border-border bg-white/84 text-foreground",
        success: "border-success/18 bg-success/10 text-success-strong",
        danger: "border-destructive/18 bg-destructive/10 text-destructive-strong",
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
