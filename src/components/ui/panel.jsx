import { cn } from "../../lib/utils";

export function Panel({ className, children, ...props }) {
  return (
    <section className={cn("paper-panel p-4 sm:p-5", className)} {...props}>
      {children}
    </section>
  );
}
