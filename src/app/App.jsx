import { startTransition, useState } from "react";
import { Settings2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Panel } from "../components/ui/panel";
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
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
          <div className="space-y-5">
            <Panel className="flex items-center justify-between gap-4 p-5 sm:p-6">
              <div className="space-y-2">
                <p className="section-kicker">日常记录</p>
                <div>
                  <h1 className="text-[1.5rem] font-medium tracking-[0.02em] text-foreground sm:text-[1.75rem]">
                    今天这一页
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    页面只保留当前要操作的内容。
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <Button onClick={() => setSettingsOpen(true)} size="icon" variant="secondary">
                  <Settings2 className="size-5" strokeWidth={1.8} />
                </Button>
              </div>
            </Panel>

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
