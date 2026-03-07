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
        "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 pb-3",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          {Icon ? (
            <div className="flex size-10 items-center justify-center rounded-full border border-border bg-white/80 text-foreground shadow-[0_8px_18px_rgba(86,73,63,0.07)]">
              <Icon className="size-[1.15rem]" strokeWidth={1.8} />
            </div>
          ) : null}
          <div className="min-w-0 space-y-0.5">
            {kicker ? <p className="section-kicker">{kicker}</p> : null}
            <h2 className="text-[1.32rem] font-medium tracking-[0.02em] text-foreground sm:text-[1.55rem]">
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {count !== undefined ? <Badge tone={badgeTone}>{count}</Badge> : null}
        {action}
      </div>
    </div>
  );
}
