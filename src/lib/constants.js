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
  completed: "completed",
  accounting: "accounting",
};

export const DEFAULT_TAB = TAB_IDS.todos;

export const DEFAULT_DATA = {
  todos: [],
  shelved: [],
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
