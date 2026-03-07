import { CheckCheck, CircleCheckBig, Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { ITEM_SOURCES } from "../../lib/constants";
import { formatDateTime, groupCompletedByWeek } from "../../lib/date";
import { ITEM_MOTION_STATES, useAnimatedItemAction } from "../../lib/use-animated-item-action";

export function CompletedSection({ items, onDelete, headerAction }) {
  const { getMotionState, isSectionBusy, runItemAction } = useAnimatedItemAction();
  const groupedWeeks = groupCompletedByWeek(
    items.map((item, index) => ({
      ...item,
      originalIndex: index,
    })),
  );

  function getItemKey(item) {
    return `completed-${item.completedAt}-${item.text}-${item.originalIndex}`;
  }

  return (
    <Panel className="space-y-6">
      <SectionHeader
        action={headerAction}
        count={`${items.length} 项`}
        icon={CheckCheck}
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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-kicker">按周查看</p>
                  <h3 className="text-[1.2rem] font-medium text-foreground">{group.label}</h3>
                </div>
                <Badge tone="ink">{group.badge}</Badge>
              </div>

              {group.items.map((item) => (
                <ItemCard
                  actions={
                    <Button
                      className="border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14"
                      disabled={isSectionBusy}
                      onClick={() =>
                        runItemAction(getItemKey(item), ITEM_MOTION_STATES.delete, () =>
                          onDelete(item.originalIndex),
                        )
                      }
                      size="sm"
                      variant="outline"
                    >
                      <Trash2 className="size-4" strokeWidth={1.8} />
                      删除
                    </Button>
                  }
                  badges={
                    item.source === ITEM_SOURCES.creative ? <Badge tone="soft">创意</Badge> : null
                  }
                  eyebrow={`完成于 ${formatDateTime(item.completedAt)}`}
                  key={getItemKey(item)}
                  motionState={getMotionState(getItemKey(item))}
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
