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
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border/70 pb-4",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          {Icon ? (
            <div className="flex size-11 items-center justify-center rounded-full border border-border bg-white/80 text-foreground shadow-[0_8px_18px_rgba(86,73,63,0.07)]">
              <Icon className="size-5" strokeWidth={1.8} />
            </div>
          ) : null}
          <div className="min-w-0 space-y-1">
            {kicker ? <p className="section-kicker">{kicker}</p> : null}
            <h2 className="text-[1.45rem] font-medium tracking-[0.02em] text-foreground sm:text-[1.7rem]">
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-end gap-2 pt-1">
        {count !== undefined ? <Badge tone={badgeTone}>{count}</Badge> : null}
        {action}
      </div>
    </div>
  );
}
