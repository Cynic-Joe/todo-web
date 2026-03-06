import { DEFAULT_DATA, DEFAULT_SETTINGS, DEFAULT_TAB, STORAGE_KEYS } from "./constants";

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readRaw(key) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
}

function writeRaw(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, value);
}

function readJson(key) {
  const value = readRaw(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function normalizeTimestamp(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : Date.now();
}

function normalizeText(value, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  const nextValue = value.trim();
  return nextValue || fallback;
}

function normalizeTodoLikeItem(item, extra = {}) {
  if (!isRecord(item)) {
    return null;
  }

  const text = normalizeText(item.text);
  if (!text) {
    return null;
  }

  return {
    text,
    createdAt: normalizeTimestamp(item.createdAt),
    ...extra,
  };
}

function normalizeTodos(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => normalizeTodoLikeItem(item))
    .filter(Boolean);
}

function normalizeShelved(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) =>
      normalizeTodoLikeItem(item, {
        shelvedAt: normalizeTimestamp(item?.shelvedAt ?? item?.createdAt),
      }),
    )
    .filter(Boolean);
}

function normalizeCompleted(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) =>
      normalizeTodoLikeItem(item, {
        completedAt: normalizeTimestamp(item?.completedAt ?? item?.createdAt),
      }),
    )
    .filter(Boolean);
}

function normalizeRecords(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const amount = Number(item.amount);
      if (!Number.isFinite(amount) || amount <= 0) {
        return null;
      }

      return {
        amount,
        note: normalizeText(item.note, "未标注"),
        createdAt: normalizeTimestamp(item.createdAt),
      };
    })
    .filter(Boolean);
}

export function normalizeAppData(data) {
  const nextData = isRecord(data) ? data : DEFAULT_DATA;

  return {
    todos: normalizeTodos(nextData.todos),
    shelved: normalizeShelved(nextData.shelved),
    completed: normalizeCompleted(nextData.completed),
    incomes: normalizeRecords(nextData.incomes),
    expenses: normalizeRecords(nextData.expenses),
  };
}

export function readAppData() {
  return normalizeAppData(readJson(STORAGE_KEYS.data) ?? DEFAULT_DATA);
}

export function writeAppData(data) {
  writeRaw(STORAGE_KEYS.data, JSON.stringify(normalizeAppData(data)));
}

export function readSettings() {
  return {
    ...DEFAULT_SETTINGS,
    token: readRaw(STORAGE_KEYS.githubToken) ?? "",
    gistId: readRaw(STORAGE_KEYS.gistId) ?? "",
    autoSync: readRaw(STORAGE_KEYS.autoSync) === "true",
    autoPull: readRaw(STORAGE_KEYS.autoPull) === "true",
  };
}

export function writeSettings(settings) {
  const nextSettings = {
    ...DEFAULT_SETTINGS,
    ...settings,
  };

  writeRaw(STORAGE_KEYS.githubToken, nextSettings.token);
  writeRaw(STORAGE_KEYS.gistId, nextSettings.gistId);
  writeRaw(STORAGE_KEYS.autoSync, String(Boolean(nextSettings.autoSync)));
  writeRaw(STORAGE_KEYS.autoPull, String(Boolean(nextSettings.autoPull)));
}

export function readActiveTab() {
  const savedTab = readRaw(STORAGE_KEYS.activeTab);
  return savedTab || DEFAULT_TAB;
}

export function writeActiveTab(tab) {
  writeRaw(STORAGE_KEYS.activeTab, tab);
}
