import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[0.72rem] font-medium tracking-[0.04em]",
  {
    variants: {
      tone: {
        neutral: "border-border/60 bg-secondary/75 text-muted-foreground",
        ink: "border-ink/60 bg-ink text-primary-foreground",
        soft: "border-border/65 bg-card/84 text-foreground",
        success: "border-success/18 bg-success/12 text-success-strong",
        danger: "border-destructive/18 bg-destructive/12 text-destructive-strong",
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
