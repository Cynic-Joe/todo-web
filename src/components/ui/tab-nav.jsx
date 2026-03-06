import { Badge } from "./badge";
import { cn } from "../../lib/utils";

export function TabNav({ items, activeTab, onChange }) {
  return (
    <nav className="archive-tab-nav" aria-label="章节切换">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {items.map((item, index) => {
          const isActive = item.id === activeTab;

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "archive-tab-button px-3.5 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 sm:py-4",
                isActive
                  ? "archive-tab-button-active text-foreground"
                  : "text-muted-foreground hover:border-border/70 hover:text-foreground",
              )}
              key={item.id}
              onClick={() => onChange(item.id)}
              type="button"
            >
              <div className="min-w-0">
                <p className="archive-tab-number">0{index + 1}</p>
                <span className="mt-2 block text-sm font-medium sm:text-[0.95rem]">{item.label}</span>
              </div>
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
