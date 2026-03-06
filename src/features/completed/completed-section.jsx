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
        count={`${items.length} 项归档`}
        description="已完成事项按周归档，便于回看一段时间内的推进节奏，而不是只看到零散的完成记录。"
        icon={CheckCheck}
        kicker="Completed"
        title="完成"
      />

      {items.length === 0 ? (
        <EmptyState
          description="完成区还没有内容。完成任意一项待办后，这里会自动按周归档并形成回顾视图。"
          icon={CircleCheckBig}
          title="暂无已完成事项"
        />
      ) : (
        <div className="space-y-6">
          {groupedWeeks.map((group) => (
            <div className="space-y-3" key={group.key}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-kicker">Weekly Review</p>
                  <h3 className="font-display text-2xl text-foreground">{group.label}</h3>
                </div>
                <Badge tone="ink">{group.badge}</Badge>
              </div>

              {group.items.map((item) => (
                <ItemCard
                  actions={
                    <Button
                      className="border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14"
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
                  meta="完成项与其他列表卡片保持同一骨架，只通过删除线和状态文案区分。"
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
