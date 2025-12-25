---
description: 创建新的单文件 HTML 工具
---

# 创建新的单文件 HTML 工具

使用此工作流让 AI 帮你创建新的 HTML 工具。

## 规范要求

创建工具时必须遵循以下原则：

- ✅ **单文件原则**：HTML + CSS + JS 全部内联在一个 .html 文件中
- ✅ **No Build**：不使用 npm、Webpack、Vite 等构建工具
- ✅ **No React**：使用原生 JavaScript 或轻量库（如 Alpine.js）
- ✅ **CDN 依赖**：如需第三方库，通过 CDN 引入（jsdelivr, cdnjs）
- ✅ **中文界面**：默认使用中文
- ✅ **暗色主题**：优先使用深色背景，现代感设计
- ✅ **响应式**：适配桌面和移动端
- ✅ **包含导航组件**：必须引入共享导航栏

## 模板结构（必须遵循）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<!-- 导航组件 - 必须添加 -->
<script src="../../assets/js/nav-component.js"></script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>工具名称</title>
    <!-- CDN 依赖放这里 -->
    <style>
        :root {
            --bg-primary: #0d1117;
            --bg-secondary: #161b22;
            --bg-tertiary: #21262d;
            --text-primary: #e6edf3;
            --text-secondary: #8b949e;
            --border-color: #30363d;
            --accent: #58a6ff;
        }
        /* 内联样式 */
    </style>
</head>
<body>
    <!-- HTML 结构 -->
    <script>
        // 内联脚本
    </script>
</body>
</html>
```

## 常用工具类型

1. **粘贴-转换-复制**：JSON 格式化、编码转换、文本处理
2. **文件处理**：图片压缩、PDF 解析、格式转换
3. **可视化**：图表生成、数据展示、流程图
4. **计算器**：各种专用计算工具
5. **游戏**：小游戏、互动工具

## 创建后的后续步骤

工具创建后，需要执行 `/publish-html` 工作流来：
1. 更新 `tools-config.json` 添加新工具配置
2. 更新 `index.html` 添加工具卡片
3. 提交并推送到 GitHub

## 使用方法

直接告诉 AI：
> "帮我创建一个 [工具描述]"
