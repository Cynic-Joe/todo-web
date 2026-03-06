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
        status.type === "success" && "border-success/30 bg-[linear-gradient(180deg,rgba(105,120,98,0.11),rgba(105,120,98,0.06))]",
        status.type === "error" && "border-destructive/28 bg-[linear-gradient(180deg,rgba(159,113,100,0.11),rgba(159,113,100,0.06))]",
        status.type === "loading" && "border-border-strong bg-card/88",
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
