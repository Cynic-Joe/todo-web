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
      motionState: {
        idle: "",
        "exiting-default": "translate-x-4 opacity-0 scale-[0.985]",
        "exiting-complete": "translate-x-3 translate-y-1 opacity-0 scale-[0.985]",
        "exiting-delete": "translate-x-5 opacity-0 scale-[0.975]",
      },
    },
    defaultVariants: {
      tone: "default",
      motionState: "idle",
    },
  },
);

export function ItemCard({
  title,
  eyebrow,
  badges,
  meta,
  amount,
  actions,
  strike = false,
  tone,
  className,
  motionState = "idle",
  layout = "default",
}) {
  const isLedger = layout === "ledger";

  return (
    <article
      className={cn(
        itemCardVariants({ tone, motionState }),
        "will-change-transform transition-[transform,opacity] duration-[180ms] ease-out motion-reduce:transition-none",
        motionState !== "idle" ? "pointer-events-none" : "",
        className,
      )}
    >
      {isLedger ? (
        <>
          {eyebrow ? <p className="mb-2 text-xs text-muted-foreground">{eyebrow}</p> : null}
          <div className="grid grid-cols-[minmax(0,1fr)_8.4rem] items-start gap-x-4 gap-y-3 lg:grid-cols-[minmax(0,1fr)_9.2rem_auto]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={cn(
                    "text-base font-medium text-foreground sm:text-[1.05rem]",
                    strike ? "text-muted-foreground line-through decoration-[1.5px]" : "",
                  )}
                >
                  {title}
                </h3>
                {badges ? <div className="flex flex-wrap items-center gap-2">{badges}</div> : null}
              </div>
              {meta ? <div className="mt-2 text-sm leading-6 text-muted-foreground">{meta}</div> : null}
            </div>
            {amount ? (
              <div className="justify-self-stretch pt-0.5 text-left lg:pt-0">
                <span className="font-display text-[1.5rem] leading-none text-foreground tabular-nums sm:text-[1.75rem]">
                  {amount}
                </span>
              </div>
            ) : null}
            {actions ? (
              <div className="col-span-2 flex flex-wrap items-center gap-2 lg:col-auto lg:justify-self-end">
                {actions}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            {eyebrow ? <p className="mb-2 text-xs text-muted-foreground">{eyebrow}</p> : null}
            <div className="flex flex-wrap items-start gap-3">
              {amount ? (
                <span className="font-display text-[1.75rem] leading-none text-foreground">{amount}</span>
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={cn(
                      "text-base font-medium text-foreground sm:text-[1.05rem]",
                      strike ? "text-muted-foreground line-through decoration-[1.5px]" : "",
                    )}
                  >
                    {title}
                  </h3>
                  {badges ? <div className="flex flex-wrap items-center gap-2">{badges}</div> : null}
                </div>
                {meta ? <div className="mt-2 text-sm leading-6 text-muted-foreground">{meta}</div> : null}
              </div>
            </div>
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      )}
    </article>
  );
}
