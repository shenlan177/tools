/**
 * AI Tools Collection - 共享导航组件
 * 自动注入顶部导航栏，从 tools-config.json 动态加载工具列表
 */

(function () {
    'use strict';

    // 配置
    const CONFIG_PATH = '/tools/tools-config.json';
    const NAV_CONTAINER_ID = 'tools-nav';

    // 注入导航样式
    function injectStyles() {
        if (document.getElementById('tools-nav-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'tools-nav-styles';
        styles.textContent = `
            /* 导航栏容器 */
            .tools-nav {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                background: rgba(13, 17, 23, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: 1px solid #30363d;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            }

            .tools-nav-inner {
                max-width: 1600px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 24px;
                height: 56px;
            }

            /* 左侧：Logo + 首页链接 */
            .tools-nav-brand {
                display: flex;
                align-items: center;
                gap: 12px;
                text-decoration: none;
                color: #e6edf3;
                font-weight: 600;
                font-size: 1rem;
                transition: opacity 0.2s;
            }

            .tools-nav-brand:hover {
                opacity: 0.8;
            }

            .tools-nav-brand-icon {
                font-size: 1.25rem;
            }

            /* 中间：工具链接 */
            .tools-nav-links {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .tools-nav-link {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                border-radius: 8px;
                text-decoration: none;
                color: #8b949e;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.2s;
                white-space: nowrap;
            }

            .tools-nav-link:hover {
                background: rgba(255, 255, 255, 0.08);
                color: #e6edf3;
            }

            .tools-nav-link.active {
                background: rgba(88, 166, 255, 0.15);
                color: #58a6ff;
            }

            .tools-nav-link-icon {
                font-size: 1rem;
            }

            /* 右侧：更多菜单 */
            .tools-nav-more {
                position: relative;
            }

            .tools-nav-more-btn {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 12px;
                border-radius: 8px;
                background: transparent;
                border: 1px solid #30363d;
                color: #8b949e;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }

            .tools-nav-more-btn:hover {
                background: rgba(255, 255, 255, 0.08);
                color: #e6edf3;
            }

            .tools-nav-dropdown {
                position: absolute;
                top: calc(100% + 8px);
                right: 0;
                min-width: 220px;
                background: #161b22;
                border: 1px solid #30363d;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.2s;
                overflow: hidden;
            }

            .tools-nav-dropdown.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .tools-nav-dropdown-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                text-decoration: none;
                color: #e6edf3;
                font-size: 0.9rem;
                transition: background 0.2s;
            }

            .tools-nav-dropdown-item:hover {
                background: rgba(255, 255, 255, 0.08);
            }

            .tools-nav-dropdown-item.active {
                background: rgba(88, 166, 255, 0.15);
            }

            .tools-nav-dropdown-icon {
                font-size: 1.1rem;
            }

            .tools-nav-dropdown-info {
                flex: 1;
            }

            .tools-nav-dropdown-name {
                font-weight: 500;
            }

            .tools-nav-dropdown-desc {
                font-size: 0.75rem;
                color: #8b949e;
                margin-top: 2px;
            }

            .tools-nav-dropdown-tag {
                padding: 2px 8px;
                background: rgba(88, 166, 255, 0.2);
                color: #58a6ff;
                border-radius: 12px;
                font-size: 0.7rem;
                font-weight: 500;
            }

            /* 移动端汉堡菜单 */
            .tools-nav-mobile-toggle {
                display: none;
                padding: 8px;
                background: transparent;
                border: none;
                color: #e6edf3;
                font-size: 1.5rem;
                cursor: pointer;
            }

            /* 页面内容偏移 */
            body.has-tools-nav {
                padding-top: 56px !important;
            }

            /* 响应式 */
            @media (max-width: 768px) {
                .tools-nav-links {
                    display: none;
                    position: absolute;
                    top: 56px;
                    left: 0;
                    right: 0;
                    flex-direction: column;
                    background: rgba(13, 17, 23, 0.98);
                    border-bottom: 1px solid #30363d;
                    padding: 12px;
                    gap: 4px;
                }

                .tools-nav-links.show {
                    display: flex;
                }

                .tools-nav-link {
                    width: 100%;
                    padding: 12px 16px;
                }

                .tools-nav-mobile-toggle {
                    display: block;
                }

                .tools-nav-more {
                    display: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // 获取当前页面路径
    function getCurrentPath() {
        return window.location.pathname;
    }

    // 判断是否当前页面
    function isCurrentPage(path) {
        const current = getCurrentPath();
        return current.endsWith(path) || current.includes(path.replace('/tools/', ''));
    }

    // 创建导航栏 HTML
    function createNavHTML(config) {
        const currentPath = getCurrentPath();
        const tools = config.tools || [];
        const maxVisibleLinks = 5;
        const visibleTools = tools.slice(0, maxVisibleLinks);
        const moreTools = tools.slice(maxVisibleLinks);

        let linksHTML = visibleTools.map(tool => {
            const isActive = isCurrentPage(tool.path);
            return `
                <a href="${tool.path}" class="tools-nav-link ${isActive ? 'active' : ''}">
                    <span class="tools-nav-link-icon">${tool.icon}</span>
                    <span>${tool.name}</span>
                </a>
            `;
        }).join('');

        let moreHTML = '';
        if (moreTools.length > 0 || tools.length > 0) {
            const dropdownItems = tools.map(tool => {
                const isActive = isCurrentPage(tool.path);
                return `
                    <a href="${tool.path}" class="tools-nav-dropdown-item ${isActive ? 'active' : ''}">
                        <span class="tools-nav-dropdown-icon">${tool.icon}</span>
                        <div class="tools-nav-dropdown-info">
                            <div class="tools-nav-dropdown-name">${tool.name}</div>
                            <div class="tools-nav-dropdown-desc">${tool.description}</div>
                        </div>
                        <span class="tools-nav-dropdown-tag">${tool.tag}</span>
                    </a>
                `;
            }).join('');

            moreHTML = `
                <div class="tools-nav-more">
                    <button class="tools-nav-more-btn" onclick="toggleToolsDropdown(event)">
                        📦 全部工具
                        <span>▾</span>
                    </button>
                    <div class="tools-nav-dropdown" id="tools-dropdown">
                        ${dropdownItems}
                    </div>
                </div>
            `;
        }

        return `
            <nav class="tools-nav" id="tools-nav">
                <div class="tools-nav-inner">
                    <a href="${config.site.homeUrl}" class="tools-nav-brand">
                        <span class="tools-nav-brand-icon">${config.site.icon}</span>
                        <span>${config.site.name}</span>
                    </a>
                    <button class="tools-nav-mobile-toggle" onclick="toggleMobileNav()">☰</button>
                    <div class="tools-nav-links" id="tools-nav-links">
                        ${linksHTML}
                    </div>
                    ${moreHTML}
                </div>
            </nav>
        `;
    }

    // 全局函数：切换下拉菜单
    window.toggleToolsDropdown = function (e) {
        e.stopPropagation();
        const dropdown = document.getElementById('tools-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    };

    // 全局函数：切换移动端菜单
    window.toggleMobileNav = function () {
        const links = document.getElementById('tools-nav-links');
        if (links) {
            links.classList.toggle('show');
        }
    };

    // 点击外部关闭下拉菜单
    document.addEventListener('click', function (e) {
        const dropdown = document.getElementById('tools-dropdown');
        if (dropdown && !e.target.closest('.tools-nav-more')) {
            dropdown.classList.remove('show');
        }
    });

    // 默认配置（用于本地 file:// 协议回退）
    const DEFAULT_CONFIG = {
        site: {
            name: "AI Tools Collection",
            icon: "🛠️",
            homeUrl: "../../index.html"
        },
        tools: [
            {
                id: "text-diff",
                name: "文本比对",
                icon: "⚖️",
                path: "text-diff.html",
                tag: "Tools",
                description: "JSON/XML/SQL 格式化校验与差异对比"
            },
            {
                id: "gomoku",
                name: "五子棋",
                icon: "⚫",
                path: "gomoku.html",
                tag: "Games",
                description: "经典双人对战五子棋游戏"
            }
        ]
    };

    // 加载配置并渲染导航
    async function init() {
        let config = null;

        // 检测是否为本地文件协议
        const isLocalFile = window.location.protocol === 'file:';

        if (!isLocalFile) {
            try {
                // 在线模式：尝试从服务器加载配置
                let configUrl = CONFIG_PATH;
                const basePath = window.location.pathname.split('/pages/')[0];
                if (basePath) {
                    configUrl = basePath + '/tools-config.json';
                }

                const response = await fetch(configUrl);
                if (response.ok) {
                    config = await response.json();
                }
            } catch (error) {
                console.warn('无法加载配置文件，使用默认配置');
            }
        }

        // 使用默认配置（本地模式或加载失败时）
        if (!config) {
            config = DEFAULT_CONFIG;
        }

        // 注入样式
        injectStyles();

        // 创建导航
        const nav = document.createElement('div');
        nav.innerHTML = createNavHTML(config);
        document.body.insertBefore(nav.firstElementChild, document.body.firstChild);

        // 添加页面偏移类
        document.body.classList.add('has-tools-nav');
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
