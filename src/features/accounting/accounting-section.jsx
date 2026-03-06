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

function LedgerSummary({ label, value, tone = "soft" }) {
  return (
    <div className="rounded-[22px] border border-border/65 bg-[linear-gradient(180deg,rgba(246,242,236,0.9),rgba(237,231,223,0.86))] px-4 py-3 shadow-[0_10px_20px_rgba(86,73,63,0.04)]">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <span className="font-display text-[1.4rem] leading-none text-foreground">{value}</span>
        <Badge tone={tone}>{label}</Badge>
      </div>
    </div>
  );
}

function RecordGroup({ title, items, tone, onDelete }) {
  const isIncome = tone === "income";

  return (
    <div className="space-y-3 rounded-[26px] border border-border/65 bg-[linear-gradient(180deg,rgba(230,224,214,0.56),rgba(222,214,203,0.36))] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-[18px] border border-border/70 bg-card/82">
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
                    className="flex-1 border-destructive/28 bg-destructive/10 text-destructive-strong hover:bg-destructive/14 sm:flex-none"
                    onClick={() => onDelete(item.originalIndex)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="size-4" strokeWidth={1.8} />
                    删除
                  </Button>
                }
                amount={`${isIncome ? "+" : "-"}${formatCurrency(item.amount)}`}
                eyebrow={`记录于 ${formatDateTime(item.createdAt)}`}
                key={`${item.createdAt}-${item.amount}-${item.originalIndex}`}
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
        badgeTone="soft"
        count={`${incomes.length + expenses.length} 笔`}
        description="把每一笔收入和支出记在同一页里。"
        icon={WalletCards}
        kicker="流水页"
        title="记账"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <LedgerSummary label="收入" tone="danger" value={formatCurrency(totalIncome)} />
        <LedgerSummary label="支出" tone="success" value={formatCurrency(totalExpense)} />
        <LedgerSummary label="净值" tone="ink" value={formatCurrency(netBalance)} />
      </div>

      <div className="grid gap-3 rounded-[26px] border border-border/65 bg-[linear-gradient(180deg,rgba(229,223,214,0.64),rgba(223,216,206,0.42))] p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_10rem_10rem]">
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
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
