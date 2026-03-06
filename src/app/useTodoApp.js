import { useEffect, useRef, useState } from "react";
import { DEFAULT_SETTINGS } from "../lib/constants";
import { createGist, getGist, updateGist } from "../lib/github";
import {
  normalizeAppData,
  readActiveTab,
  readAppData,
  readSettings,
  writeActiveTab,
  writeAppData,
  writeSettings,
} from "../lib/storage";

export function useTodoApp() {
  const [data, setData] = useState(() => readAppData());
  const [settings, setSettings] = useState(() => readSettings());
  const [activeTab, setActiveTabState] = useState(() => readActiveTab());
  const [status, setStatus] = useState(null);
  const [busyState, setBusyState] = useState({ sync: false, pull: false });

  const dataRef = useRef(data);
  const settingsRef = useRef(settings);
  const autoPulledRef = useRef(false);

  useEffect(() => {
    dataRef.current = data;
    writeAppData(data);
  }, [data]);

  useEffect(() => {
    settingsRef.current = settings;
    writeSettings(settings);
  }, [settings]);

  useEffect(() => {
    writeActiveTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (!status || status.type === "loading") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setStatus(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [status]);

  async function triggerAutoSync(nextData) {
    const currentSettings = settingsRef.current;
    if (!currentSettings.autoSync || !currentSettings.token || !currentSettings.gistId) {
      return;
    }

    try {
      await updateGist(currentSettings.token, currentSettings.gistId, nextData);
    } catch (error) {
      console.warn("自动同步失败:", error);
    }
  }

  function commitData(nextData, options = {}) {
    const normalized = normalizeAppData(nextData);
    dataRef.current = normalized;
    setData(normalized);

    if (!options.skipAutoSync) {
      void triggerAutoSync(normalized);
    }

    return normalized;
  }

  function updateSettings(patch) {
    const nextSettings = {
      ...DEFAULT_SETTINGS,
      ...settingsRef.current,
      ...patch,
    };

    settingsRef.current = nextSettings;
    setSettings(nextSettings);
    return nextSettings;
  }

  async function syncToCloud() {
    const currentSettings = settingsRef.current;
    if (!currentSettings.token) {
      setStatus({ type: "error", message: "请先填写 GitHub 令牌。" });
      return;
    }

    setBusyState((current) => ({ ...current, sync: true }));
    setStatus({ type: "loading", message: "正在同步到 Gist..." });

    try {
      let gistId = currentSettings.gistId;

      if (gistId) {
        await updateGist(currentSettings.token, gistId, dataRef.current);
        setStatus({ type: "success", message: "同步完成，云端数据已更新。" });
      } else {
        gistId = await createGist(currentSettings.token, dataRef.current);
        updateSettings({ gistId });
        setStatus({
          type: "success",
          message: "已创建新的 Gist，并保存了同步设置。",
        });
      }
    } catch (error) {
      setStatus({ type: "error", message: `同步失败：${error.message}` });
    } finally {
      setBusyState((current) => ({ ...current, sync: false }));
    }
  }

  async function pullFromCloud() {
    const currentSettings = settingsRef.current;
    if (!currentSettings.token) {
      setStatus({ type: "error", message: "请先填写 GitHub 令牌。" });
      return;
    }

    if (!currentSettings.gistId) {
      setStatus({ type: "error", message: "请先填写 Gist ID，或先执行一次同步。" });
      return;
    }

    setBusyState((current) => ({ ...current, pull: true }));
    setStatus({ type: "loading", message: "正在拉取云端数据..." });

    try {
      const cloudData = normalizeAppData(await getGist(currentSettings.token, currentSettings.gistId));
      commitData(cloudData, { skipAutoSync: true });
      setStatus({ type: "success", message: "拉取完成，页面已更新为云端版本。" });
    } catch (error) {
      setStatus({ type: "error", message: `拉取失败：${error.message}` });
    } finally {
      setBusyState((current) => ({ ...current, pull: false }));
    }
  }

  useEffect(() => {
    if (autoPulledRef.current) {
      return;
    }

    autoPulledRef.current = true;
    if (settingsRef.current.autoPull && settingsRef.current.token && settingsRef.current.gistId) {
      void pullFromCloud();
    }
  }, []);

  function setActiveTab(tab) {
    setActiveTabState(tab);
  }

  function addTodo(text) {
    const value = text.trim();
    if (!value) {
      return false;
    }

    commitData({
      ...dataRef.current,
      todos: [
        ...dataRef.current.todos,
        {
          text: value,
          createdAt: Date.now(),
        },
      ],
    });

    return true;
  }

  function deleteTodo(index) {
    commitData({
      ...dataRef.current,
      todos: dataRef.current.todos.filter((_, itemIndex) => itemIndex !== index),
    });
  }

  function completeTodo(index) {
    const todo = dataRef.current.todos[index];
    if (!todo) {
      return;
    }

    commitData({
      ...dataRef.current,
      todos: dataRef.current.todos.filter((_, itemIndex) => itemIndex !== index),
      completed: [
        ...dataRef.current.completed,
        {
          text: todo.text,
          createdAt: todo.createdAt,
          completedAt: Date.now(),
        },
      ],
    });
  }

  function deleteCompleted(index) {
    commitData({
      ...dataRef.current,
      completed: dataRef.current.completed.filter((_, itemIndex) => itemIndex !== index),
    });
  }

  function shelveTodo(index) {
    const todo = dataRef.current.todos[index];
    if (!todo) {
      return;
    }

    commitData({
      ...dataRef.current,
      todos: dataRef.current.todos.filter((_, itemIndex) => itemIndex !== index),
      shelved: [
        ...dataRef.current.shelved,
        {
          text: todo.text,
          createdAt: todo.createdAt,
          shelvedAt: Date.now(),
        },
      ],
    });
  }

  function restoreShelved(index) {
    const shelvedItem = dataRef.current.shelved[index];
    if (!shelvedItem) {
      return;
    }

    commitData({
      ...dataRef.current,
      shelved: dataRef.current.shelved.filter((_, itemIndex) => itemIndex !== index),
      todos: [
        ...dataRef.current.todos,
        {
          text: shelvedItem.text,
          createdAt: shelvedItem.createdAt,
        },
      ],
    });
  }

  function deleteShelved(index) {
    commitData({
      ...dataRef.current,
      shelved: dataRef.current.shelved.filter((_, itemIndex) => itemIndex !== index),
    });
  }

  function addIncome(note, amount) {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return false;
    }

    commitData({
      ...dataRef.current,
      incomes: [
        ...dataRef.current.incomes,
        {
          amount: numericAmount,
          note: note.trim() || "未标注",
          createdAt: Date.now(),
        },
      ],
    });

    return true;
  }

  function addExpense(note, amount) {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return false;
    }

    commitData({
      ...dataRef.current,
      expenses: [
        ...dataRef.current.expenses,
        {
          amount: numericAmount,
          note: note.trim() || "未标注",
          createdAt: Date.now(),
        },
      ],
    });

    return true;
  }

  function deleteIncome(index) {
    commitData({
      ...dataRef.current,
      incomes: dataRef.current.incomes.filter((_, itemIndex) => itemIndex !== index),
    });
  }

  function deleteExpense(index) {
    commitData({
      ...dataRef.current,
      expenses: dataRef.current.expenses.filter((_, itemIndex) => itemIndex !== index),
    });
  }

  return {
    data,
    settings,
    activeTab,
    status,
    busyState,
    setActiveTab,
    updateSettings,
    syncToCloud,
    pullFromCloud,
    addTodo,
    deleteTodo,
    completeTodo,
    deleteCompleted,
    shelveTodo,
    restoreShelved,
    deleteShelved,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
  };
}
