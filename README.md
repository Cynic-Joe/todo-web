# 记事本待办

一个基于 `Vite + React + Tailwind CSS v4` 的前端项目，提供待办、搁置、完成和记账四个功能区，并保留 GitHub Gist 同步能力。

## 本地开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`。

## 数据兼容

当前版本继续沿用已有本地存储键：

- `zhihuang_data`
- `zhihuang_github_token`
- `zhihuang_gist_id`
- `zhihuang_auto_sync`
- `zhihuang_auto_pull`
- `activeTab`

因此旧数据不需要迁移。

## 部署

- `main`：正式站根路径 `https://cynic-joe.github.io/todo-web/`
- `preview-branch`：预览路径 `https://cynic-joe.github.io/todo-web/react-preview/`

仓库内置 GitHub Actions 发布流程：

1. 推送 `main` 时，构建并发布正式站根路径
2. 推送 `preview-branch` 时，构建并发布预览子路径
3. 两条发布链互不覆盖，便于后续先预览再合并

## UI 规范

后续任何 UI / 组件 / 页面改动，都应先阅读 [docs/ui-guidelines.md](docs/ui-guidelines.md)。
