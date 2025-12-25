# 项目规则 (Project Rules)

本项目是一个 **AI 辅助的 HTML 工具集和产品原型管理仓库**。

## 📁 项目结构

```
antigravitycode/
├── github-tools/           # 🌐 公开发布的工具（GitHub Pages）
│   ├── index.html         # 导航首页
│   └── pages/             # 所有工具页面
│       ├── tools/         # 实用工具
│       ├── demos/         # UI/交互演示
│       └── prototypes/    # 产品原型
├── 隐私数据清理/           # 项目原型（开发中）
├── prd-framework/         # PRD 文档框架
├── referance/             # 参考资料（不发布）
└── .agent/workflows/      # AI 工作流命令
```

---

## ✅ AI 允许做的事

1. **创建单文件 HTML 工具**：遵循 No React、No Build 原则
2. **修改现有页面**：优化样式、添加功能
3. **执行发布工作流**：复制文件、更新导航、Git 提交推送
4. **创建产品原型**：高保真交互原型
5. **文件查找和分析**：查看项目结构、分析代码

---

## 🚫 AI 禁止做的事

1. **禁止删除任何文件**：除非用户明确要求
2. **禁止修改 referance/ 目录**：这是参考资料，只读
3. **禁止使用 React/Vue/Angular**：坚持原生 JS
4. **禁止引入 npm 依赖**：只使用 CDN
5. **禁止推送未经确认的内容**：Git push 前必须告知用户
6. **禁止在原型中使用真实敏感数据**：使用模拟数据

---

## 🎨 代码风格规范

### HTML 工具文件

```html
<!-- 必须包含的 meta -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<html lang="zh-CN">

<!-- 推荐的设计系统 -->
:root {
    --bg-primary: #0f0f1a;
    --bg-secondary: #1a1a2e;
    --text-primary: #ffffff;
    --text-secondary: #a0a0b0;
    --accent: #667eea;
}
```

### 命名规范

- 文件名：小写英文 + 短横线，如 `json-formatter.html`
- 中文项目目录可保留中文，如 `隐私数据清理/`

---

## 🔧 常用工作流命令

| 命令 | 说明 |
|------|------|
| `/create-tool` | 创建新的单文件 HTML 工具 |
| `/create-prototype` | 创建产品交互原型 |
| `/publish-html` | 发布页面到 GitHub Pages |

---

## 📝 与 AI 协作的提示词模板

### 创建工具
```
帮我创建一个 [工具功能描述]。
要求：单文件、No React、暗色主题、中文界面。
```

### 修改页面
```
修改 [文件名]，[具体修改内容]。
不要改动其他部分。
```

### 发布页面
```
/publish-html
发布 [文件路径] 到 GitHub Pages，分类为 [tools/demos/prototypes]。
```
