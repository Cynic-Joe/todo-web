import { CheckCheck, CircleCheckBig, Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { formatDateTime, groupCompletedByWeek } from "../../lib/date";

export function CompletedSection({ items, onDelete }) {
  const groupedWeeks = groupCompletedByWeek(
    items.map((item, index) => ({
      ...item,
      originalIndex: index,
    })),
  );

  return (
    <Panel className="space-y-6">
      <SectionHeader
        count={`${items.length} 项`}
        description="已经完成的内容会按周归档。"
        icon={CheckCheck}
        kicker="已完成"
        title="完成"
      />

      {items.length === 0 ? (
        <EmptyState
          description="完成第一项之后，这里会开始留下本周记录。"
          icon={CircleCheckBig}
          title="还没有完成记录"
        />
      ) : (
        <div className="space-y-6">
          {groupedWeeks.map((group) => (
            <div className="space-y-3" key={group.key}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="section-kicker">按周查看</p>
                  <h3 className="mt-2 text-[1.15rem] font-medium text-foreground">{group.label}</h3>
                </div>
                <Badge tone="ink">{group.badge}</Badge>
              </div>

              {group.items.map((item) => (
                <ItemCard
                  actions={
                    <Button
                      className="flex-1 border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14 sm:flex-none"
                      onClick={() => onDelete(item.originalIndex)}
                      size="sm"
                      variant="outline"
                    >
                      <Trash2 className="size-4" strokeWidth={1.8} />
                      删除
                    </Button>
                  }
                  eyebrow={`完成于 ${formatDateTime(item.completedAt)}`}
                  key={`${item.completedAt}-${item.text}-${item.originalIndex}`}
                  strike
                  title={item.text}
                  tone="success"
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
