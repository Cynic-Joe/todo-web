import { memo } from "react";
import { ArchiveRestore, ArchiveX, PackageOpen, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { formatDateTime } from "../../lib/date";
import { ITEM_MOTION_STATES, useAnimatedItemAction } from "../../lib/use-animated-item-action";

function getShelvedKey(item, index) {
  return `shelved-${item.createdAt}-${item.text}-${index}`;
}

const ShelvedRow = memo(function ShelvedRow({
  item,
  index,
  onDelete,
  onRestore,
  motionState,
  isPending,
  runItemAction,
}) {
  const itemKey = getShelvedKey(item, index);

  return (
    <ItemCard
      actions={
        <>
          <Button
            disabled={isPending}
            onClick={() => runItemAction(itemKey, ITEM_MOTION_STATES.default, () => onRestore(index))}
            size="sm"
            variant="primary"
          >
            <ArchiveRestore className="size-4" strokeWidth={1.8} />
            恢复
          </Button>
          <Button
            className="border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14"
            disabled={isPending}
            onClick={() => runItemAction(itemKey, ITEM_MOTION_STATES.delete, () => onDelete(index))}
            size="sm"
            variant="outline"
          >
            <Trash2 className="size-4" strokeWidth={1.8} />
            删除
          </Button>
        </>
      }
      eyebrow={`搁置于 ${formatDateTime(item.shelvedAt || item.createdAt)}`}
      motionState={motionState}
      title={item.text}
      tone="muted"
    />
  );
});

export function ShelvedSection({ items, onDelete, onRestore, headerAction }) {
  const { getMotionState, isItemPending, runItemAction } = useAnimatedItemAction();

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
          {items.map((item, index) => {
            const itemKey = getShelvedKey(item, index);

            return (
              <ShelvedRow
                index={index}
                isPending={isItemPending(itemKey)}
                item={item}
                key={itemKey}
                motionState={getMotionState(itemKey)}
                onDelete={onDelete}
                onRestore={onRestore}
                runItemAction={runItemAction}
              />
            );
          })}
        </div>
      )}
    </Panel>
  );
}
