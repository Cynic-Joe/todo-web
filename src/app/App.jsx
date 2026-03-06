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
      mobileSummary: "当前只看接下来要推进的事。",
      hint: "先写下一步，再直接处理。",
    },
    [TAB_IDS.shelved]: {
      label: "搁置",
      description: "暂时不处理的内容先收进旁页，主页面保持清爽，不让任务堆在眼前。",
      mobileSummary: "先把暂时不处理的内容收起来。",
      hint: "需要时再恢复回当前页。",
    },
    [TAB_IDS.completed]: {
      label: "完成",
      description: "完成记录按周留档，保留结果和时间线，方便回看这一段推进过什么。",
      mobileSummary: "这里留下已经完成的记录。",
      hint: "回顾进展，也能清理旧记录。",
    },
    [TAB_IDS.accounting]: {
      label: "记账",
      description: "把收入和支出留在同一本记录册里，保持录入、查看和核对都在同一页序完成。",
      mobileSummary: "在同一页里录入和查看流水。",
      hint: "先记一笔，再继续整理流水。",
    },
  };

  const activeTabMeta = tabMeta[activeTab] ?? tabMeta[TAB_IDS.todos];
  const activeCount = tabs.find((tab) => tab.id === activeTab)?.count ?? 0;
  const activeOrder = tabs.findIndex((tab) => tab.id === activeTab) + 1;

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
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
          <div className="archive-shell">
            <div className="archive-shell-content p-4 sm:p-5 lg:p-7">
              <div className="archive-stage">
                <aside className="archive-rail">
                  <div className="archive-rail-sticky">
                    <section className="archive-brief px-4 py-4 sm:px-5 sm:py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="section-kicker">桌面档案册</p>
                            <p className="archive-eyebrow">日常记录</p>
                          </div>
                          <div className="space-y-3">
                            <h1 className="archive-title">今天这一册</h1>
                            <p className="text-sm leading-7 text-muted-foreground lg:hidden">
                              {activeTabMeta.mobileSummary}
                            </p>
                            <p className="hidden text-sm leading-7 text-muted-foreground lg:block">
                              {activeTabMeta.description}
                            </p>
                          </div>
                        </div>
                        <Button onClick={() => setSettingsOpen(true)} size="icon" variant="secondary">
                          <Settings2 className="size-5" strokeWidth={1.8} />
                        </Button>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        <div className="archive-brief-card">
                          <p className="archive-mini-label">当前页序</p>
                          <div className="mt-3 flex items-end justify-between gap-4">
                            <div>
                              <p className="archive-sheet-number">{String(activeOrder).padStart(2, "0")}</p>
                              <p className="mt-2 text-sm font-medium text-foreground">{activeTabMeta.label}</p>
                            </div>
                            <p className="max-w-[7rem] text-right text-sm leading-6 text-muted-foreground">
                              导航和当前页保持更强存在感。
                            </p>
                          </div>
                        </div>

                        <div className="archive-brief-card">
                          <p className="archive-mini-label">页内内容</p>
                          <div className="mt-3 flex items-end justify-between gap-4">
                            <div>
                              <p className="archive-sheet-number">{activeCount}</p>
                              <p className="mt-2 text-sm font-medium text-foreground">当前内容</p>
                            </div>
                            <p className="max-w-[8rem] text-right text-sm leading-6 text-muted-foreground">
                              {activeTabMeta.hint}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <TabNav
                      activeTab={activeTab}
                      items={tabs}
                      onChange={(tab) => {
                        startTransition(() => {
                          setActiveTab(tab);
                        });
                      }}
                    />

                    {status ? <StatusBanner status={status} /> : null}
                  </div>
                </aside>

                <main className="min-w-0">
                  <div className="archive-page-stack">
                    <div className="archive-page-tab">
                      第 {String(activeOrder).padStart(2, "0")} 页 · {activeTabMeta.label}
                    </div>
                    <div>{renderCurrentSection()}</div>
                  </div>
                </main>
              </div>
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
