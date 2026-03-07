import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  loading: LoaderCircle,
};

export function StatusBanner({ status, compact = false, className }) {
  if (!status) {
    return null;
  }

  const Icon = iconMap[status.type] || AlertCircle;

  return (
    <div
      className={cn(
        compact
          ? "flex items-center gap-2.5 rounded-[18px] border px-3.5 py-2.5 shadow-[0_10px_22px_rgba(67,53,39,0.06)] backdrop-blur-sm"
          : "paper-panel flex items-center gap-3 px-4 py-3",
        status.type === "success" && "border-success/30 bg-success/8",
        status.type === "error" && "border-destructive/25 bg-destructive/8",
        status.type === "loading" && "border-border-strong bg-white/85",
        className,
      )}
      role="status"
    >
      <Icon
        className={cn(
          compact ? "size-4 shrink-0" : "size-5 shrink-0",
          status.type === "loading" ? "animate-spin" : "",
        )}
        strokeWidth={1.8}
      />
      <p className={cn(compact ? "text-[0.82rem]" : "text-sm", "text-foreground")}>{status.message}</p>
    </div>
  );
}
