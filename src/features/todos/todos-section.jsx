import { useRef, useState } from "react";
import { Archive, ClipboardList, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { Input } from "../../components/ui/input";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { formatDateTime } from "../../lib/date";

export function TodosSection({ todos, onAddTodo, onDeleteTodo, onCompleteTodo, onShelveTodo }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

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
        badgeTone="ink"
        count={`${todos.length} 项进行中`}
        description="把今天要推进的内容写下来，并在同一位置完成、搁置或清理。"
        icon={ClipboardList}
        kicker="Tasks"
        title="待办"
      />

      <div className="grid gap-3 rounded-[28px] border border-border/70 bg-secondary/35 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5">
        <Input
          maxLength={100}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitTodo();
            }
          }}
          placeholder="写下下一项要推进的内容..."
          ref={inputRef}
          value={value}
        />
        <Button className="w-full sm:w-auto" onClick={submitTodo} variant="primary">
          记录待办
        </Button>
      </div>

      {todos.length === 0 ? (
        <EmptyState
          actionLabel="聚焦输入框"
          description="待办清单目前是空的。先写下一个清晰、可执行的任务，工作台就会开始运转。"
          icon={ClipboardList}
          onAction={() => inputRef.current?.focus()}
          title="暂无待办事项"
        />
      ) : (
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <ItemCard
              actions={
                <>
                  <Button onClick={() => onShelveTodo(index)} size="sm" variant="secondary">
                    <Archive className="size-4" strokeWidth={1.8} />
                    搁置
                  </Button>
                  <Button onClick={() => onCompleteTodo(index)} size="sm" variant="success">
                    <CheckCheck className="size-4" strokeWidth={1.8} />
                    完成
                  </Button>
                  <Button
                    className="border-destructive/25 bg-destructive/8 text-destructive-strong hover:bg-destructive/14"
                    onClick={() => onDeleteTodo(index)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="size-4" strokeWidth={1.8} />
                    删除
                  </Button>
                </>
              }
              eyebrow={`创建于 ${formatDateTime(todo.createdAt)}`}
              key={`${todo.createdAt}-${todo.text}-${index}`}
              meta="基础动作统一放在右侧，避免每一类任务出现不同的操作格式。"
              title={todo.text}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
