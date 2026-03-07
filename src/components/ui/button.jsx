import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[18px] border text-sm font-medium transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-ink bg-ink text-primary-foreground shadow-[0_10px_20px_rgba(86,73,63,0.12)] hover:-translate-y-0.5 hover:bg-ink-soft",
        secondary:
          "border-border bg-white/78 text-foreground hover:-translate-y-0.5 hover:border-border-strong hover:bg-white",
        tonal:
          "border-transparent bg-secondary text-foreground hover:-translate-y-0.5 hover:bg-secondary-strong",
        success:
          "border-transparent bg-success text-white hover:-translate-y-0.5 hover:bg-success-soft",
        danger:
          "border-transparent bg-destructive text-white hover:-translate-y-0.5 hover:bg-destructive-soft",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        outline:
          "border-border-strong bg-transparent text-foreground hover:bg-white/80",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-full",
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
