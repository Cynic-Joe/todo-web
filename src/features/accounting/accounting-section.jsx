import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Landmark, ReceiptText, Trash2, WalletCards } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { Input } from "../../components/ui/input";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { formatCurrency, formatDateTime } from "../../lib/date";
import { ITEM_MOTION_STATES, useAnimatedItemAction } from "../../lib/use-animated-item-action";

function LedgerSummary({ label, value, tone = "soft" }) {
  return (
    <div className="rounded-[18px] border border-border/70 bg-white/72 px-4 py-3">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-lg font-medium text-foreground">{value}</span>
        <Badge tone={tone}>{label}</Badge>
      </div>
    </div>
  );
}

function RecordGroup({ title, items, tone, onDelete }) {
  const isIncome = tone === "income";
  const { getMotionState, isSectionBusy, runItemAction } = useAnimatedItemAction();

  function getItemKey(item) {
    return `${tone}-${item.createdAt}-${item.amount}-${item.originalIndex}`;
  }

  return (
    <div className="space-y-3 rounded-[24px] border border-border/70 bg-secondary/24 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-white/80">
            {isIncome ? (
              <ArrowUpRight className="size-[18px]" strokeWidth={1.8} />
            ) : (
              <Landmark className="size-[18px]" strokeWidth={1.8} />
            )}
          </div>
          <div>
            <h3 className="text-base font-medium text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{items.length} 笔</p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          description={isIncome ? "还没有收入记录。" : "还没有支出记录。"}
          icon={ReceiptText}
          title={isIncome ? "收入为空" : "支出为空"}
        />
      ) : (
        <div className="space-y-3">
          {[...items]
            .map((item, index) => ({ ...item, originalIndex: index }))
            .reverse()
            .map((item) => (
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
                amount={`${isIncome ? "+" : "-"}${formatCurrency(item.amount)}`}
                eyebrow={`记录于 ${formatDateTime(item.createdAt)}`}
                key={getItemKey(item)}
                layout="ledger"
                motionState={getMotionState(getItemKey(item))}
                title={item.note}
                tone={isIncome ? "danger" : "success"}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export function AccountingSection({
  incomes,
  expenses,
  totalIncome,
  totalExpense,
  netBalance,
  onAddIncome,
  onAddExpense,
  onDeleteIncome,
  onDeleteExpense,
  headerAction,
}) {
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  function clearForm() {
    setNote("");
    setAmount("");
  }

  function handleIncome() {
    if (onAddIncome(note, amount)) {
      clearForm();
    }
  }

  function handleExpense() {
    if (onAddExpense(note, amount)) {
      clearForm();
    }
  }

  return (
    <Panel className="space-y-6">
      <SectionHeader
        action={headerAction}
        badgeTone="soft"
        count={`${incomes.length + expenses.length} 笔`}
        icon={WalletCards}
        title="记账"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <LedgerSummary label="收入" tone="danger" value={formatCurrency(totalIncome)} />
        <LedgerSummary label="支出" tone="success" value={formatCurrency(totalExpense)} />
        <LedgerSummary label="净值" tone="ink" value={formatCurrency(netBalance)} />
      </div>

      <div className="grid gap-3 rounded-[24px] border border-border/70 bg-secondary/26 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_10rem_10rem]">
        <Input
          maxLength={50}
          onChange={(event) => setNote(event.target.value)}
          placeholder="备注，例如午餐、报销、兼职收入"
          value={note}
        />
        <Input
          min="0"
          onChange={(event) => setAmount(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleIncome();
            }
          }}
          placeholder="金额"
          step="0.01"
          type="number"
          value={amount}
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <Button onClick={handleIncome} variant="danger">
            <ArrowUpRight className="size-4" strokeWidth={1.8} />
            记收入
          </Button>
          <Button onClick={handleExpense} variant="success">
            <ArrowDownLeft className="size-4" strokeWidth={1.8} />
            记支出
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <RecordGroup
          items={incomes}
          onDelete={onDeleteIncome}
          title="收入记录"
          tone="income"
        />
        <RecordGroup
          items={expenses}
          onDelete={onDeleteExpense}
          title="支出记录"
          tone="expense"
        />
      </div>
    </Panel>
  );
}
