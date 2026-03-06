# 纸黄待办 - GitHub 项目管理指南

## 仓库信息

| 项目 | 信息 |
|------|------|
| 仓库地址 | https://github.com/Cynic-Joe/todo-web |
| GitHub Pages | https://cynic-joe.github.io/todo-web |
| 主文件 | index.html |

---

## 本地开发与 Git 同步

### 1. 克隆仓库到本地

```bash
git clone https://github.com/Cynic-Joe/todo-web.git
cd todo-web
```

### 2. 修改代码后提交

```bash
# 查看修改状态
git status

# 添加修改的文件
git add index.html

# 提交修改
git commit -m "更新说明"

# 推送到 GitHub
git push origin main
```

### 3. 更新 GitHub Pages

代码推送到 `main` 分支后，GitHub Pages 会自动部署。

- 访问地址：https://cynic-joe.github.io/todo-web
- 部署等待时间：约 1-2 分钟

---

## 云同步配置

### GitHub Token
```
ghp_your_personal_access_token_here
```

### Gist ID
```
2480b2d13fba341844a3388550b07a75
```

### Gist 数据结构

数据存储在 Gist 的 `todos.json` 文件中，格式如下：

```json
{
  "todos": [
    { "text": "待办内容", "createdAt": 1234567890123 }
  ],
  "completed": [
    { "text": "已完成", "completedAt": 1234567890123, "weekKey": "2/17~2/23" }
  ],
  "incomes": [
    { "amount": 400, "note": "第1期视频", "createdAt": 1234567890123 }
  ],
  "expenses": [
    { "amount": 100, "note": "购买素材", "createdAt": 1234567890123 }
  ]
}
```

---

## 注意事项

1. **Token 权限**：如需修改代码并推送，需要用户自行创建一个带 `repo` 权限的 Personal Access Token
2. **Gist 文件名**：代码中使用 `todos.json` 作为数据文件名
3.网页端 **自动同步**：支持自动同步和自动拉取功能

---

## 常用 Git 命令速查

| 操作 | 命令 |
|------|------|
| 拉取最新代码 | `git pull` |
| 查看状态 | `git status` |
| 查看差异 | `git diff` |
| 撤销修改 | `git checkout -- index.html` |
| 查看提交历史 | `git log` |
