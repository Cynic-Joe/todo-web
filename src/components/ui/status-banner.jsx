import { Check, RefreshCcw, X } from "lucide-react";
import { cn } from "../../lib/utils";

const statusMeta = {
  pull: {
    loading: { icon: RefreshCcw, label: "正在刷新" },
    success: { icon: Check, label: "完成" },
    error: { icon: X, label: "拉取失败" },
  },
  sync: {
    loading: { icon: RefreshCcw, label: "正在同步" },
    success: { icon: Check, label: "完成" },
    error: { icon: X, label: "同步失败" },
  },
};

export function StatusBanner({ status, floating = false, className }) {
  if (!status) {
    return null;
  }

  const kind = status.kind === "sync" ? "sync" : "pull";
  const meta = statusMeta[kind][status.type] ?? statusMeta.pull.success;
  const Icon = meta.icon;

  return (
    <div
      className={cn(
        floating
          ? "status-float"
          : "paper-panel flex items-center gap-3 px-4 py-3",
        status.type === "success" && "border-success/30 bg-success/8",
        status.type === "error" && "border-destructive/25 bg-destructive/8",
        status.type === "loading" && "border-border-strong bg-white/85",
        className,
      )}
      aria-live={status.type === "loading" ? "polite" : "assertive"}
      role="status"
      title={status.message}
    >
      <Icon
        className={cn(
          floating ? "size-4 shrink-0" : "size-5 shrink-0",
          status.type === "loading" ? "animate-spin" : "",
        )}
        strokeWidth={1.8}
      />
      <p className={cn(floating ? "text-[0.84rem] font-medium" : "text-sm", "text-foreground")}>{meta.label}</p>
    </div>
  );
}
