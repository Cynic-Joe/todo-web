import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  loading: LoaderCircle,
};

export function StatusBanner({ status }) {
  if (!status) {
    return null;
  }

  const Icon = iconMap[status.type] || AlertCircle;

  return (
    <div
      className={cn(
        "paper-panel flex items-center gap-3 px-4 py-3",
        status.type === "success" && "border-success/30 bg-success/8",
        status.type === "error" && "border-destructive/25 bg-destructive/8",
        status.type === "loading" && "border-border-strong bg-white/85",
      )}
      role="status"
    >
      <Icon
        className={cn("size-5 shrink-0", status.type === "loading" ? "animate-spin" : "")}
        strokeWidth={1.8}
      />
      <p className="text-sm text-foreground">{status.message}</p>
    </div>
  );
}
