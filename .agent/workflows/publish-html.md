---
description: 发布 HTML 页面到 GitHub Pages
---

# 发布 HTML 页面到 GitHub Pages

使用此工作流将本地 HTML 页面发布到 GitHub Pages。

## 步骤

### 1. 确认工具信息

确认以下信息：
- 源文件路径
- 工具 ID（小写英文，如 `json-formatter`）
- 工具名称（中文，如 `JSON 格式化`）
- 工具图标（emoji）
- 工具分类（Tools / Games / Demos / Prototypes）
- 工具描述（简短说明）

### 2. 复制文件到 github-tools 目录

```bash
cp <源文件路径> /Users/luckincoffee/antigravitycode/github-tools/pages/<分类>/
```

### 3. 更新 tools-config.json

编辑 `/Users/luckincoffee/antigravitycode/github-tools/tools-config.json`，在 `tools` 数组中添加：

```json
{
  "id": "<工具ID>",
  "name": "<工具名称>",
  "icon": "<emoji图标>",
  "path": "/tools/pages/<分类>/<文件名>",
  "tag": "<分类>",
  "description": "<工具描述>"
}
```

### 4. 更新 index.html 首页

编辑 `/Users/luckincoffee/antigravitycode/github-tools/index.html`，在 `tools-grid` 中添加卡片：

```html
<a href="./pages/<分类>/<文件名>" class="tool-card">
    <div class="tool-icon"><emoji图标></div>
    <h3 class="tool-title"><工具名称></h3>
    <p class="tool-desc"><工具描述></p>
    <span class="tool-tag"><分类></span>
</a>
```

### 5. 确保导航组件已引入

检查工具页面是否已包含导航组件脚本：

```html
<!-- 在 <html> 标签后添加 -->
<script src="../../assets/js/nav-component.js"></script>
```

// turbo
### 6. 提交并推送到 GitHub

```bash
cd /Users/luckincoffee/antigravitycode/github-tools && git add . && git commit -m "Add: <工具名称>" && git push
```

### 7. 访问确认

访问 https://shenlan177.github.io/tools/ 确认发布成功

## 快速发布命令

如果工具已创建完成且配置已更新，可以直接执行：

```bash
cd /Users/luckincoffee/antigravitycode/github-tools && git add . && git commit -m "Add: <工具名称>" && git push
```
