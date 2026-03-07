import { useRef, useState } from "react";
import { ArrowRight, Lightbulb, Sparkles, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { Input } from "../../components/ui/input";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { formatDateTime } from "../../lib/date";
import { ITEM_MOTION_STATES, useAnimatedItemAction } from "../../lib/use-animated-item-action";

export function CreativeSection({
  items,
  onAddCreative,
  onDeleteCreative,
  onPromoteCreative,
  headerAction,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const { getMotionState, isSectionBusy, runItemAction } = useAnimatedItemAction();

  function getItemKey(item, index) {
    return `creative-${item.createdAt}-${item.text}-${index}`;
  }

  function submitCreative() {
    if (onAddCreative(value)) {
      setValue("");
      inputRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }

  return (
    <Panel className="space-y-6">
      <SectionHeader action={headerAction} count={`${items.length} 项`} icon={Lightbulb} title="创意" />

      <div className="grid gap-3 rounded-[24px] border border-border/70 bg-secondary/26 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5">
        <Input
          maxLength={100}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitCreative();
            }
          }}
          placeholder="记下一个想法，之后再决定要不要做"
          ref={inputRef}
          value={value}
        />
        <Button className="w-full sm:w-auto" onClick={submitCreative} variant="primary">
          新增创意
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          actionLabel="记一条创意"
          description="先留下一个念头，需要执行时再转成待办。"
          icon={Sparkles}
          onAction={() => inputRef.current?.focus()}
          title="还没有创意"
        />
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <ItemCard
              actions={
                <>
                  <Button disabled={isSectionBusy} onClick={() => onPromoteCreative(index)} size="sm" variant="primary">
                    <ArrowRight className="size-4" strokeWidth={1.8} />
                    转待办
                  </Button>
                  <Button
                    className="border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14"
                    disabled={isSectionBusy}
                    onClick={() =>
                      runItemAction(getItemKey(item, index), ITEM_MOTION_STATES.delete, () =>
                        onDeleteCreative(index),
                      )
                    }
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="size-4" strokeWidth={1.8} />
                    删除
                  </Button>
                </>
              }
              eyebrow={`记于 ${formatDateTime(item.createdAt)}`}
              key={getItemKey(item, index)}
              motionState={getMotionState(getItemKey(item, index))}
              title={item.text}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
