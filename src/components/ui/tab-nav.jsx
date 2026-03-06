import { Badge } from "./badge";
import { cn } from "../../lib/utils";

export function TabNav({ items, activeTab, onChange }) {
  return (
    <nav className="paper-panel p-2.5" aria-label="章节切换">
      <div className="grid gap-2 sm:grid-cols-4">
        {items.map((item) => {
          const isActive = item.id === activeTab;

          return (
            <button
              className={cn(
                "flex items-center justify-between rounded-[18px] border px-4 py-3 text-left transition",
                isActive
                  ? "border-border-strong bg-white text-foreground shadow-[0_10px_22px_rgba(86,73,63,0.08)]"
                  : "border-transparent bg-transparent text-muted-foreground hover:border-border/70 hover:bg-white/60 hover:text-foreground",
              )}
              key={item.id}
              onClick={() => onChange(item.id)}
              type="button"
            >
              <span className="text-sm font-medium">{item.label}</span>
              {typeof item.count === "number" ? (
                <Badge tone={isActive ? "ink" : "soft"}>{item.count}</Badge>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
