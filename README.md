# 纸黄待办

一个面向 GitHub Pages 的前端原型，包含待办、搁置、完成归档与记账四个功能区，并保留 GitHub Gist 云同步能力。

## 技术栈

- Vite
- React
- Tailwind CSS v4
- Lucide React

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

新版本继续沿用原有本地存储键：

- `zhihuang_data`
- `zhihuang_github_token`
- `zhihuang_gist_id`
- `zhihuang_auto_sync`
- `zhihuang_auto_pull`
- `activeTab`

因此旧版用户数据无需迁移即可直接读取。

## 分支与部署

- `main`：正式版本，发布到 GitHub Pages 主路径
- `preview-branch`：React / Vite 重构预览分支，发布到 GitHub Pages 子路径

默认访问地址：

- 正式站：`https://cynic-joe.github.io/todo-web/`
- 预览站：`https://cynic-joe.github.io/todo-web/react-preview/`

仓库内置 GitHub Actions 发布流程：

1. 推送 `main` 时，构建并覆盖正式站内容
2. 推送 `preview-branch` 时，构建并发布到 `react-preview/` 子目录
3. 两条发布链互不覆盖，因此可以随时回退到 `main`
