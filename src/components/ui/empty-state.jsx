import { Button } from "./button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-border-strong bg-secondary/45 px-6 py-14 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full border border-border bg-white/80 text-muted-foreground">
        <Icon className="size-7" strokeWidth={1.8} />
      </div>
      <h3 className="font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
