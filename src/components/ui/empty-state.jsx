import { Button } from "./button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-border-strong/75 bg-[linear-gradient(180deg,rgba(232,226,216,0.56),rgba(225,217,206,0.34))] px-6 py-14 text-center">
      <div className="mb-5 flex size-15 items-center justify-center rounded-[18px] border border-border/70 bg-card/85 text-muted-foreground">
        <Icon className="size-6" strokeWidth={1.8} />
      </div>
      <h3 className="font-display text-[1.5rem] text-foreground">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
