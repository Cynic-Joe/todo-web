import { cn } from "../../lib/utils";

export function Panel({ className, children, ...props }) {
  return (
    <section className={cn("paper-panel p-5 sm:p-6 lg:p-7", className)} {...props}>
      {children}
    </section>
  );
}
