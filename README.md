# AI Tools Collection

通过 AI 生成的实用工具和演示页面集合。

## 🌐 在线访问

访问地址：https://shenlan177.github.io/tools/

## 📁 目录结构

```
.
├── index.html          # 导航首页
├── pages/              # 存放所有工具页面
│   └── (your-tool.html)
├── assets/             # 公共资源
│   ├── css/           # 样式文件
│   ├── js/            # 脚本文件
│   └── images/        # 图片资源
└── README.md
```

## 🚀 如何添加新页面

1. 将 HTML 文件复制到 `pages/` 目录
2. 编辑 `index.html`，添加对应的工具卡片：

```html
<a href="./pages/your-tool.html" class="tool-card">
    <div class="tool-icon">📊</div>
    <h3 class="tool-title">工具名称</h3>
    <p class="tool-desc">工具描述</p>
    <span class="tool-tag">标签</span>
</a>
```

3. 提交并推送到 GitHub

## 📝 License

MIT
