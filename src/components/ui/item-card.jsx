import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const itemCardVariants = cva(
  "group rounded-[22px] border p-4 transition duration-200 sm:p-5",
  {
    variants: {
      tone: {
        default: "border-border bg-white/78 hover:-translate-y-0.5 hover:border-border-strong hover:bg-white",
        muted: "border-border bg-secondary/48 hover:border-border-strong",
        success: "border-success/18 bg-success/8 hover:border-success/28",
        danger: "border-destructive/18 bg-destructive/7 hover:border-destructive/28",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

export function ItemCard({
  title,
  eyebrow,
  meta,
  amount,
  actions,
  strike = false,
  tone,
  className,
}) {
  return (
    <article className={cn(itemCardVariants({ tone }), className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          {eyebrow ? <p className="mb-2 text-xs text-muted-foreground">{eyebrow}</p> : null}
          <div className="flex flex-wrap items-start gap-3">
            {amount ? (
              <span className="font-display text-[1.75rem] leading-none text-foreground">{amount}</span>
            ) : null}
            <div className="min-w-0 flex-1">
              <h3
                className={cn(
                  "text-base font-medium text-foreground sm:text-[1.05rem]",
                  strike ? "text-muted-foreground line-through decoration-[1.5px]" : "",
                )}
              >
                {title}
              </h3>
              {meta ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{meta}</p> : null}
            </div>
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </article>
  );
}
