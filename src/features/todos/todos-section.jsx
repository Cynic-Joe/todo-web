import { useRef, useState } from "react";
import { Archive, CheckCheck, ClipboardList, Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { Input } from "../../components/ui/input";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { ITEM_SOURCES } from "../../lib/constants";
import { formatDateTime } from "../../lib/date";
import { ITEM_MOTION_STATES, useAnimatedItemAction } from "../../lib/use-animated-item-action";

export function TodosSection({
  todos,
  onAddTodo,
  onDeleteTodo,
  onCompleteTodo,
  onShelveTodo,
  headerAction,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const { getMotionState, isSectionBusy, runItemAction } = useAnimatedItemAction();

  function getTodoKey(todo, index) {
    return `todo-${todo.createdAt}-${todo.text}-${index}`;
  }

  function submitTodo() {
    if (onAddTodo(value)) {
      setValue("");
      inputRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }

  return (
    <Panel className="space-y-6">
      <SectionHeader
        action={headerAction}
        count={`${todos.length} 项`}
        icon={ClipboardList}
        title="待办"
      />

      <div className="grid gap-3 rounded-[24px] border border-border/70 bg-secondary/26 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5">
        <Input
          maxLength={100}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitTodo();
            }
          }}
          placeholder="写下接下来要做的事"
          ref={inputRef}
          value={value}
        />
        <Button className="w-full sm:w-auto" onClick={submitTodo} variant="primary">
          记下待办
        </Button>
      </div>

      {todos.length === 0 ? (
        <EmptyState
          actionLabel="开始记录"
          description="先记下一件具体要推进的事。"
          icon={ClipboardList}
          onAction={() => inputRef.current?.focus()}
          title="还没有待办"
        />
      ) : (
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <ItemCard
              actions={
                <>
                  <Button
                    disabled={isSectionBusy}
                    onClick={() =>
                      runItemAction(getTodoKey(todo, index), ITEM_MOTION_STATES.default, () =>
                        onShelveTodo(index),
                      )
                    }
                    size="sm"
                    variant="secondary"
                  >
                    <Archive className="size-4" strokeWidth={1.8} />
                    搁置
                  </Button>
                  <Button
                    disabled={isSectionBusy}
                    onClick={() =>
                      runItemAction(getTodoKey(todo, index), ITEM_MOTION_STATES.complete, () =>
                        onCompleteTodo(index),
                      )
                    }
                    size="sm"
                    variant="success"
                  >
                    <CheckCheck className="size-4" strokeWidth={1.8} />
                    完成
                  </Button>
                  <Button
                    className="border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14"
                    disabled={isSectionBusy}
                    onClick={() =>
                      runItemAction(getTodoKey(todo, index), ITEM_MOTION_STATES.delete, () =>
                        onDeleteTodo(index),
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
              badges={
                todo.source === ITEM_SOURCES.creative ? <Badge tone="soft">创意</Badge> : null
              }
              eyebrow={`写于 ${formatDateTime(todo.createdAt)}`}
              key={getTodoKey(todo, index)}
              motionState={getMotionState(getTodoKey(todo, index))}
              title={todo.text}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
