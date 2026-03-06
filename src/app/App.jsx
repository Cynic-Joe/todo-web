import { startTransition, useState } from "react";
import { Settings2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { StatusBanner } from "../components/ui/status-banner";
import { TabNav } from "../components/ui/tab-nav";
import { AccountingSection } from "../features/accounting/accounting-section";
import { CompletedSection } from "../features/completed/completed-section";
import { SettingsDrawer } from "../features/settings/settings-drawer";
import { ShelvedSection } from "../features/shelved/shelved-section";
import { TodosSection } from "../features/todos/todos-section";
import { TAB_IDS } from "../lib/constants";
import { useTodoApp } from "./useTodoApp";

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
      count: data.todos.length,
    },
    {
      id: TAB_IDS.shelved,
      label: "搁置",
      count: data.shelved.length,
    },
    {
      id: TAB_IDS.completed,
      label: "完成",
      count: data.completed.length,
    },
    {
      id: TAB_IDS.accounting,
      label: "记账",
      count: data.incomes.length + data.expenses.length,
    },
  ];

  const tabMeta = {
    [TAB_IDS.todos]: {
      label: "待办",
      description: "把接下来要推进的事写进当前页序，手边只保留正在处理的内容。",
      hint: "先写下一步，再直接处理。",
    },
    [TAB_IDS.shelved]: {
      label: "搁置",
      description: "暂时不处理的内容先收进旁页，主页面保持清爽，不让任务堆在眼前。",
      hint: "需要时再恢复回当前页。",
    },
    [TAB_IDS.completed]: {
      label: "完成",
      description: "完成记录按周留档，保留结果和时间线，方便回看这一段推进过什么。",
      hint: "回顾进展，也能清理旧记录。",
    },
    [TAB_IDS.accounting]: {
      label: "记账",
      description: "把收入和支出留在同一本记录册里，保持录入、查看和核对都在同一页序完成。",
      hint: "先记一笔，再继续整理流水。",
    },
  };

  const activeTabMeta = tabMeta[activeTab] ?? tabMeta[TAB_IDS.todos];
  const activeCount = tabs.find((tab) => tab.id === activeTab)?.count ?? 0;

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
            netBalance={netBalance}
            onAddExpense={addExpense}
            onAddIncome={addIncome}
            onDeleteExpense={deleteExpense}
            onDeleteIncome={deleteIncome}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
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
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="archive-shell">
            <div aria-hidden="true" className="archive-spine-label">
              今日档案
            </div>
            <div className="archive-shell-content space-y-4 p-4 sm:space-y-5 sm:p-6 lg:p-8">
              <header className="archive-cover px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="section-kicker">桌面档案册</p>
                      <p className="text-xs tracking-[0.16em] text-muted-foreground">日常记录</p>
                    </div>
                    <div>
                      <h1 className="font-display text-[2.35rem] leading-none text-foreground sm:text-[3rem]">
                        今天这一册
                      </h1>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                        {activeTabMeta.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-full max-w-[18rem] shrink-0">
                    <div className="archive-index-card">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="archive-mini-label">当前章节</p>
                          <h2 className="mt-2 font-display text-[1.9rem] leading-none text-foreground">
                            {activeTabMeta.label}
                          </h2>
                        </div>
                        <Button onClick={() => setSettingsOpen(true)} size="icon" variant="secondary">
                          <Settings2 className="size-5" strokeWidth={1.8} />
                        </Button>
                      </div>
                      <div className="mt-6 flex items-end justify-between gap-4">
                        <div>
                          <p className="archive-mini-label">页内内容</p>
                          <p className="mt-2 text-[1.6rem] font-medium text-foreground">
                            {activeCount} 项
                          </p>
                        </div>
                        <p className="max-w-[9rem] text-right text-sm leading-6 text-muted-foreground">
                          {activeTabMeta.hint}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

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

              <div>{renderCurrentSection()}</div>
            </div>
          </div>
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
