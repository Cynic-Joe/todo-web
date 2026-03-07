import { Badge } from "./badge";
import { cn } from "../../lib/utils";

export function SectionHeader({
  icon: Icon,
  kicker,
  title,
  description,
  count,
  badgeTone = "soft",
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {Icon ? (
            <div className="flex size-11 items-center justify-center rounded-full border border-border bg-white/80 text-foreground shadow-[0_8px_18px_rgba(86,73,63,0.07)]">
              <Icon className="size-5" strokeWidth={1.8} />
            </div>
          ) : null}
          <div>
            {kicker ? <p className="section-kicker">{kicker}</p> : null}
            <h2 className="text-[1.45rem] font-medium tracking-[0.02em] text-foreground sm:text-[1.7rem]">
              {title}
            </h2>
          </div>
        </div>
        {description ? <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {count !== undefined ? <Badge tone={badgeTone}>{count}</Badge> : null}
        {action}
      </div>
    </div>
  );
}
