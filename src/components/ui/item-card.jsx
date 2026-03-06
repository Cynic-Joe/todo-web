import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const itemCardVariants = cva(
  "group relative overflow-hidden rounded-[24px] border p-4 transition duration-200 sm:p-5",
  {
    variants: {
      tone: {
        default:
          "border-border/70 bg-[linear-gradient(180deg,rgba(246,242,236,0.94),rgba(238,233,226,0.88))] shadow-[0_10px_20px_rgba(86,73,63,0.04)] hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_16px_24px_rgba(86,73,63,0.06)]",
        muted:
          "border-border/70 bg-[linear-gradient(180deg,rgba(231,225,215,0.78),rgba(224,216,205,0.68))] hover:border-border-strong",
        success:
          "border-success/22 bg-[linear-gradient(180deg,rgba(109,127,102,0.1),rgba(109,127,102,0.05))] hover:border-success/35",
        danger:
          "border-destructive/22 bg-[linear-gradient(180deg,rgba(159,113,100,0.1),rgba(159,113,100,0.05))] hover:border-destructive/35",
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
      <div className="flex flex-col gap-4">
        <div className="min-w-0">
          {eyebrow ? <p className="mb-2 text-xs tracking-[0.08em] text-muted-foreground">{eyebrow}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            {amount ? (
              <span className="font-display text-[1.9rem] leading-none text-foreground sm:pt-0.5">{amount}</span>
            ) : null}
            <div className="min-w-0 flex-1">
              <h3
                className={cn(
                  "text-base font-medium text-foreground sm:text-[1.08rem]",
                  strike ? "text-muted-foreground line-through decoration-[1.5px]" : "",
                )}
              >
                {title}
              </h3>
              {meta ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{meta}</p> : null}
            </div>
          </div>
        </div>
        {actions ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-border/55 pt-3 sm:border-0 sm:pt-0">
            {actions}
          </div>
        ) : null}
      </div>
    </article>
  );
}
