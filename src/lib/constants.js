export const STORAGE_KEYS = {
  data: "zhihuang_data",
  githubToken: "zhihuang_github_token",
  gistId: "zhihuang_gist_id",
  autoSync: "zhihuang_auto_sync",
  autoPull: "zhihuang_auto_pull",
  activeTab: "activeTab",
};

export const TAB_IDS = {
  todos: "todos",
  shelved: "shelved",
  creative: "creative",
  completed: "completed",
  accounting: "accounting",
};

export const TAB_ORDER = [
  TAB_IDS.todos,
  TAB_IDS.shelved,
  TAB_IDS.creative,
  TAB_IDS.completed,
  TAB_IDS.accounting,
];

export const DEFAULT_TAB = TAB_IDS.todos;

export const ITEM_SOURCES = {
  creative: "creative",
};

export const DEFAULT_DATA = {
  todos: [],
  shelved: [],
  creative: [],
  completed: [],
  incomes: [],
  expenses: [],
};

export const DEFAULT_SETTINGS = {
  token: "",
  gistId: "",
  autoSync: false,
  autoPull: false,
};
