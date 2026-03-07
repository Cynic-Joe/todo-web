import { startTransition, useState } from "react";
import { Settings2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { StatusBanner } from "../components/ui/status-banner";
import { TabNav } from "../components/ui/tab-nav";
import { AccountingSection } from "../features/accounting/accounting-section";
import { CompletedSection } from "../features/completed/completed-section";
import { CreativeSection } from "../features/creative/creative-section";
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
    addCreative,
    addTodo,
    busyState,
    completeTodo,
    data,
    deleteCompleted,
    deleteCreative,
    deleteExpense,
    deleteIncome,
    deleteShelved,
    deleteTodo,
    pullFromCloud,
    promoteCreativeToTodo,
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
    },
    {
      id: TAB_IDS.shelved,
      label: "搁置",
    },
    {
      id: TAB_IDS.creative,
      label: "创意",
    },
    {
      id: TAB_IDS.completed,
      label: "完成",
    },
    {
      id: TAB_IDS.accounting,
      label: "记账",
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
      case TAB_IDS.creative:
        return (
          <CreativeSection
            items={data.creative}
            onAddCreative={addCreative}
            onDeleteCreative={deleteCreative}
            onPromoteCreative={promoteCreativeToTodo}
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
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          <div className="workspace-stage">
            <div className="workspace-nav">
              <Button
                aria-label="打开同步设置"
                className="workspace-settings-button"
                onClick={() => setSettingsOpen(true)}
                size="icon"
                title="同步设置"
                variant="ghost"
              >
                <Settings2 className="size-[1.15rem]" strokeWidth={1.8} />
              </Button>

              <TabNav
                activeTab={activeTab}
                className="pr-14 sm:pr-20"
                items={tabs}
                onChange={(tab) => {
                  startTransition(() => {
                    setActiveTab(tab);
                  });
                }}
              />
            </div>

            <div className="workspace-panel-shell">{renderCurrentSection()}</div>
          </div>
        </div>
      </div>

      <StatusBanner floating status={status} />

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
