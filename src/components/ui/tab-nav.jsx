import { cn } from "../../lib/utils";
import { Badge } from "./badge";

export function TabNav({ items, activeTab, onChange }) {
  return (
    <div className="paper-panel p-2">
      <div className="grid gap-2 sm:grid-cols-4">
        {items.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;

          return (
            <button
              className={cn(
                "flex items-center justify-between rounded-[22px] px-4 py-3 text-left transition",
                isActive
                  ? "bg-ink text-primary-foreground shadow-[0_12px_28px_rgba(71,50,37,0.18)]"
                  : "bg-transparent text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
              )}
              key={item.id}
              onClick={() => onChange(item.id)}
              type="button"
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-2xl border",
                    isActive
                      ? "border-white/15 bg-white/10"
                      : "border-border bg-white/75",
                  )}
                >
                  <Icon className="size-[18px]" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span
                    className={cn(
                      "block text-xs tracking-[0.16em] uppercase",
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground/70",
                    )}
                  >
                    {item.kicker}
                  </span>
                </span>
              </span>
              {typeof item.count === "number" ? (
                <Badge tone={isActive ? "soft" : "neutral"}>{item.count}</Badge>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
