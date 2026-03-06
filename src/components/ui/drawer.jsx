import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

export function Drawer({ open, title, description, onClose, children }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="关闭设置面板"
        className="absolute inset-0 bg-[rgba(48,31,18,0.2)] backdrop-blur-[6px]"
        onClick={onClose}
        type="button"
      />
      <div className="absolute inset-y-0 right-0 flex w-full justify-end">
        <aside
          className={cn(
            "h-full w-full max-w-[32rem] border-l border-border/70 bg-[linear-gradient(180deg,rgba(244,240,233,0.98),rgba(234,228,219,0.96))] px-5 py-5 shadow-[0_24px_80px_rgba(48,31,18,0.16)] sm:px-6",
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <p className="section-kicker">同步选项</p>
              <h2 className="font-display text-[1.9rem] leading-none text-foreground">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
            </div>
            <Button aria-label="关闭设置面板" onClick={onClose} size="icon" variant="ghost">
              <X className="size-5" strokeWidth={1.8} />
            </Button>
          </div>
          <div className="mt-6 h-[calc(100%-6rem)] overflow-y-auto pr-1">{children}</div>
        </aside>
      </div>
    </div>
  );
}
