import { ArchiveRestore, ArchiveX, PackageOpen, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { formatDateTime } from "../../lib/date";

export function ShelvedSection({ items, onDelete, onRestore }) {
  return (
    <Panel className="space-y-6">
      <SectionHeader
        count={`${items.length} 项暂缓`}
        description="低优先级任务先停在这里，避免它们持续挤占主任务区的注意力。"
        icon={ArchiveX}
        kicker="Archive"
        title="搁置"
      />

      {items.length === 0 ? (
        <EmptyState
          description="没有被暂缓的事项。待办区会保持干净，只有真正需要推进的内容停留在主视图里。"
          icon={PackageOpen}
          title="暂无搁置事项"
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
              meta="搁置区保持与待办区同样的卡片结构，只弱化视觉优先级。"
              title={item.text}
              tone="muted"
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
