import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Landmark, ReceiptText, Trash2, WalletCards } from "lucide-react";
import { Button } from "../../components/ui/button";
import { EmptyState } from "../../components/ui/empty-state";
import { ItemCard } from "../../components/ui/item-card";
import { Panel } from "../../components/ui/panel";
import { SectionHeader } from "../../components/ui/section-header";
import { Input } from "../../components/ui/input";
import { formatCurrency, formatDateTime } from "../../lib/date";

function SummaryCard({ label, value, hint, tone }) {
  return (
    <div
      className={`rounded-[24px] border p-4 ${
        tone === "income"
          ? "border-destructive/20 bg-destructive/6"
          : tone === "expense"
            ? "border-success/20 bg-success/8"
            : "border-border bg-white/70"
      }`}
    >
      <p className="section-kicker">{label}</p>
      <div className="mt-3 font-display text-4xl text-foreground">{value}</div>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

function RecordList({ title, kicker, icon: Icon, emptyTitle, emptyDescription, items, tone, onDelete }) {
  return (
    <div className="space-y-4 rounded-[28px] border border-border/70 bg-secondary/30 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl border border-border bg-white/80">
            <Icon className="size-[18px]" strokeWidth={1.8} />
          </div>
          <div>
            <p className="section-kicker">{kicker}</p>
            <h3 className="text-base font-medium text-foreground">{title}</h3>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          description={emptyDescription}
          icon={ReceiptText}
          title={emptyTitle}
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
                    onClick={() => onDelete(item.originalIndex)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="size-4" strokeWidth={1.8} />
                    删除
                  </Button>
                }
                amount={`${tone === "income" ? "+" : "-"}${formatCurrency(item.amount)}`}
                eyebrow={`记录于 ${formatDateTime(item.createdAt)}`}
                key={`${item.createdAt}-${item.amount}-${item.originalIndex}`}
                meta="记账记录沿用与任务卡片一致的排版，只改变金额展示方式。"
                title={item.note}
                tone={tone === "income" ? "danger" : "success"}
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
  onAddIncome,
  onAddExpense,
  onDeleteIncome,
  onDeleteExpense,
}) {
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - totalExpense;

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
        count={`${incomes.length + expenses.length} 条记录`}
        description="记账区延续同一套标题、卡片和动作语言，把收入、支出和净值放在一个更清晰的视图里。"
        icon={WalletCards}
        kicker="Accounting"
        title="记账"
      />

      <div className="grid gap-3 xl:grid-cols-3">
        <SummaryCard hint="累计记入的所有收入。" label="Income" tone="income" value={formatCurrency(totalIncome)} />
        <SummaryCard hint="累计记入的所有支出。" label="Expense" tone="expense" value={formatCurrency(totalExpense)} />
        <SummaryCard hint="净值由收入减去支出得出。" label="Balance" tone="net" value={formatCurrency(netBalance)} />
      </div>

      <div className="grid gap-3 rounded-[28px] border border-border/70 bg-secondary/35 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(0,1fr)_14rem_14rem]">
        <Input
          maxLength={50}
          onChange={(event) => setNote(event.target.value)}
          placeholder="事件备注，例如：午餐、外包结算..."
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
        <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-1">
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

      <div className="grid gap-4 xl:grid-cols-2">
        <RecordList
          emptyDescription="收入列表为空时不会占据过多视觉空间，保持工作台的主要注意力在可操作内容上。"
          emptyTitle="暂无收入记录"
          icon={ArrowUpRight}
          items={incomes}
          kicker="Incoming"
          onDelete={onDeleteIncome}
          title="收入记录"
          tone="income"
        />
        <RecordList
          emptyDescription="支出记录使用同一结构，仅通过颜色语义和文案区分，降低识别成本。"
          emptyTitle="暂无支出记录"
          icon={Landmark}
          items={expenses}
          kicker="Outgoing"
          onDelete={onDeleteExpense}
          title="支出记录"
          tone="expense"
        />
      </div>
    </Panel>
  );
}
