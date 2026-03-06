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
        "flex flex-col gap-4 border-b border-border/60 pb-5 sm:gap-5",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3 sm:gap-4">
          {Icon ? (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-[16px] border border-border/70 bg-card/85 text-foreground shadow-[0_10px_18px_rgba(86,73,63,0.05)] sm:size-12 sm:rounded-[18px]">
              <Icon className="size-[18px] sm:size-5" strokeWidth={1.8} />
            </div>
          ) : null}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {kicker ? <p className="section-kicker">{kicker}</p> : null}
              {count !== undefined ? <Badge className="sm:hidden" tone={badgeTone}>{count}</Badge> : null}
            </div>
            <h2 className="font-display text-[1.65rem] leading-none text-foreground sm:text-[2rem]">
              {title}
            </h2>
          </div>
        </div>
        {description ? <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p> : null}
      </div>
      <div className="hidden flex-wrap items-center gap-3 sm:flex sm:justify-end">
        {count !== undefined ? <Badge tone={badgeTone}>{count}</Badge> : null}
        {action}
      </div>
      {action ? <div className="sm:hidden">{action}</div> : null}
    </div>
  );
}
