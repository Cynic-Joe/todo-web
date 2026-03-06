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
        "flex flex-col gap-5 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {Icon ? (
            <div className="flex size-12 items-center justify-center rounded-[18px] border border-border/70 bg-card/85 text-foreground shadow-[0_10px_18px_rgba(86,73,63,0.05)]">
              <Icon className="size-5" strokeWidth={1.8} />
            </div>
          ) : null}
          <div>
            {kicker ? <p className="section-kicker">{kicker}</p> : null}
            <h2 className="font-display text-[1.8rem] leading-none text-foreground sm:text-[2rem]">
              {title}
            </h2>
          </div>
        </div>
        {description ? <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        {count !== undefined ? <Badge tone={badgeTone}>{count}</Badge> : null}
        {action}
      </div>
    </div>
  );
}
