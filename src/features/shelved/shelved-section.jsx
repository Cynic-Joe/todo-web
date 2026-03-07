import { ArchiveRestore, ArchiveX, PackageOpen, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { formatDateTime } from "../../lib/date";

export function ShelvedSection({ items, onDelete, onRestore, headerAction }) {
  return (
    <Panel className="space-y-6">
      <SectionHeader
        action={headerAction}
        count={`${items.length} 项`}
        icon={ArchiveX}
        title="搁置"
      />

      {items.length === 0 ? (
        <EmptyState
          description="目前没有需要暂放的事项。"
          icon={PackageOpen}
          title="还没有搁置项"
        />
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <ItemCard
              actions={
                <>
                  <Button onClick={() => onRestore(index)} size="sm" variant="primary">
                    <ArchiveRestore className="size-4" strokeWidth={1.8} />
                    恢复
                  </Button>
                  <Button
                    className="border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14"
                    onClick={() => onDelete(index)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="size-4" strokeWidth={1.8} />
                    删除
                  </Button>
                </>
              }
              eyebrow={`搁置于 ${formatDateTime(item.shelvedAt || item.createdAt)}`}
              key={`${item.createdAt}-${item.text}-${index}`}
              title={item.text}
              tone="muted"
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
