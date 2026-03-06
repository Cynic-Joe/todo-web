import { startTransition, useState } from "react";
import {
  ArchiveX,
  CheckCheck,
  ClipboardList,
  CloudCog,
  Coins,
  Settings2,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Panel } from "../components/ui/panel";
import { StatusBanner } from "../components/ui/status-banner";
import { TabNav } from "../components/ui/tab-nav";
import { AccountingSection } from "../features/accounting/accounting-section";
import { CompletedSection } from "../features/completed/completed-section";
import { SettingsDrawer } from "../features/settings/settings-drawer";
import { ShelvedSection } from "../features/shelved/shelved-section";
import { TodosSection } from "../features/todos/todos-section";
import { formatCurrency } from "../lib/date";
import { TAB_IDS } from "../lib/constants";
import { useTodoApp } from "./useTodoApp";

function SummaryTile({ label, value, hint }) {
  return (
    <div className="rounded-[24px] border border-border/70 bg-white/75 p-4">
      <p className="section-kicker">{label}</p>
      <div className="mt-3 font-display text-4xl text-foreground">{value}</div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{hint}</p>
    </div>
  );
}

export default function App() {
  const {
    activeTab,
    addExpense,
    addIncome,
    addTodo,
    busyState,
    completeTodo,
    data,
    deleteCompleted,
    deleteExpense,
    deleteIncome,
    deleteShelved,
    deleteTodo,
    pullFromCloud,
    restoreShelved,
    settings,
    setActiveTab,
    shelveTodo,
    status,
    syncToCloud,
    updateSettings,
  } = useTodoApp();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const totalIncome = data.incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = data.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const tabs = [
    {
      id: TAB_IDS.todos,
      label: "待办",
      kicker: "Active",
      icon: ClipboardList,
      count: data.todos.length,
    },
    {
      id: TAB_IDS.shelved,
      label: "搁置",
      kicker: "Archive",
      icon: ArchiveX,
      count: data.shelved.length,
    },
    {
      id: TAB_IDS.completed,
      label: "完成",
      kicker: "Review",
      icon: CheckCheck,
      count: data.completed.length,
    },
    {
      id: TAB_IDS.accounting,
      label: "记账",
      kicker: "Ledger",
      icon: WalletCards,
      count: data.incomes.length + data.expenses.length,
    },
  ];

  function renderCurrentSection() {
    switch (activeTab) {
      case TAB_IDS.shelved:
        return (
          <ShelvedSection
            items={data.shelved}
            onDelete={deleteShelved}
            onRestore={restoreShelved}
          />
        );
      case TAB_IDS.completed:
        return <CompletedSection items={data.completed} onDelete={deleteCompleted} />;
      case TAB_IDS.accounting:
        return (
          <AccountingSection
            expenses={data.expenses}
            incomes={data.incomes}
            onAddExpense={addExpense}
            onAddIncome={addIncome}
            onDeleteExpense={deleteExpense}
            onDeleteIncome={deleteIncome}
          />
        );
      case TAB_IDS.todos:
      default:
        return (
          <TodosSection
            onAddTodo={addTodo}
            onCompleteTodo={completeTodo}
            onDeleteTodo={deleteTodo}
            onShelveTodo={shelveTodo}
            todos={data.todos}
          />
        );
    }
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <header className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_22rem]">
            <Panel className="overflow-hidden">
              <div className="relative">
                <div className="absolute inset-x-0 top-0 h-24 rounded-full bg-[radial-gradient(circle_at_top,rgba(201,167,132,0.28),transparent_70%)] blur-3xl" />
                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_18rem]">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone="ink">GitHub Pages Prototype</Badge>
                      <Badge tone="soft">Vite + React + Tailwind v4</Badge>
                    </div>
                    <div className="space-y-3">
                      <p className="section-kicker">Paper Desk</p>
                      <h1 className="font-display text-[3rem] leading-none text-foreground sm:text-[4.25rem]">
                        纸黄待办
                      </h1>
                      <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        用统一的标题系统、动作按钮和卡片语言，重做待办、搁置、完成与记账四个功能区。
                        主界面只保留任务与数据，云同步收进独立设置面板。
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 self-end">
                    <SummaryTile hint="当前正在推进的任务数量。" label="待办" value={String(data.todos.length)} />
                    <SummaryTile hint="收入减去支出后的当前净值。" label="净值" value={formatCurrency(netBalance)} />
                  </div>
                </div>
              </div>
            </Panel>

            <Panel className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="section-kicker">Control Room</p>
                  <h2 className="font-display text-3xl text-foreground">工作台摘要</h2>
                </div>
                <Button onClick={() => setSettingsOpen(true)} size="icon" variant="secondary">
                  <Settings2 className="size-5" strokeWidth={1.8} />
                </Button>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[22px] border border-border/70 bg-secondary/45 p-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="size-5 text-foreground" strokeWidth={1.8} />
                    <div>
                      <h3 className="text-sm font-medium text-foreground">统一交互语义</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        删除、完成、搁置、恢复、记收入、记支出全部映射到一致的按钮体系。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] border border-border/70 bg-secondary/45 p-4">
                  <div className="flex items-center gap-3">
                    <CloudCog className="size-5 text-foreground" strokeWidth={1.8} />
                    <div>
                      <h3 className="text-sm font-medium text-foreground">同步状态</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {settings.gistId
                          ? "已绑定 Gist，必要时可在设置抽屉执行同步或拉取。"
                          : "尚未连接 Gist，原型仍可完整使用本地存储。"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <SummaryTile hint="暂缓中" label="搁置" value={String(data.shelved.length)} />
                  <SummaryTile hint="已完成" label="完成" value={String(data.completed.length)} />
                  <SummaryTile hint="流水总数" label="记录" value={String(data.incomes.length + data.expenses.length)} />
                </div>
              </div>
            </Panel>
          </header>

          <main className="mt-6 space-y-6">
            {status ? <StatusBanner status={status} /> : null}

            <TabNav
              activeTab={activeTab}
              items={tabs}
              onChange={(tab) => {
                startTransition(() => {
                  setActiveTab(tab);
                });
              }}
            />

            <div className="grid gap-6 xl:grid-cols-[19rem,minmax(0,1fr)]">
              <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
                <Panel className="space-y-4">
                  <div>
                    <p className="section-kicker">Ledger Snapshot</p>
                    <h2 className="font-display text-3xl text-foreground">收支侧栏</h2>
                  </div>
                  <SummaryTile hint="累计收入" label="Income" value={formatCurrency(totalIncome)} />
                  <SummaryTile hint="累计支出" label="Expense" value={formatCurrency(totalExpense)} />
                  <div className="rounded-[24px] border border-border/70 bg-secondary/45 p-4 text-sm leading-6 text-muted-foreground">
                    <div className="mb-2 flex items-center gap-2 text-foreground">
                      <Coins className="size-4" strokeWidth={1.8} />
                      <span className="font-medium">设计说明</span>
                    </div>
                    四个功能区沿用同一套抬头、卡片和空状态结构。这个侧栏只负责摘要，不抢占主操作区。
                  </div>
                </Panel>
              </aside>

              <div>{renderCurrentSection()}</div>
            </div>
          </main>
        </div>
      </div>

      <SettingsDrawer
        busyState={busyState}
        onChange={updateSettings}
        onClose={() => setSettingsOpen(false)}
        onPull={pullFromCloud}
        onSync={syncToCloud}
        open={settingsOpen}
        settings={settings}
      />
    </>
  );
}
