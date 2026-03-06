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
    <div className={cn("flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-border bg-white/75 text-foreground shadow-[0_8px_20px_rgba(71,50,37,0.08)]">
            <Icon className="size-5" strokeWidth={1.8} />
          </div>
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 className="font-display text-3xl text-foreground sm:text-[2.2rem]">{title}</h2>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {count !== undefined ? <Badge tone={badgeTone}>{count}</Badge> : null}
        {action}
      </div>
    </div>
  );
}
