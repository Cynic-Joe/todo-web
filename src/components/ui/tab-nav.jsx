import { cn } from "../../lib/utils";

export function TabNav({ items, activeTab, onChange, className }) {
  return (
    <nav className={cn("bookmark-nav", className)} aria-label="章节切换">
      <div className="bookmark-rail">
        {items.map((item) => {
          const isActive = item.id === activeTab;

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "bookmark-tab",
                isActive ? "bookmark-tab-active" : "bookmark-tab-idle",
              )}
              key={item.id}
              onClick={() => onChange(item.id)}
              type="button"
            >
              <span className="bookmark-tab-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
