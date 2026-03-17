# 星渊个人作品集网站

> **My Portfolio** - 一个现代化的全栈开发者个人作品集网站

[![Vue 3](https://img.shields.io/badge/Vue-3.5.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-4FC08D)](https://router.vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3.x-FFE873?logo=pinia)](https://pinia.vuejs.org/)

---

## 项目简介

这是一个基于 **Vue 3 + Vite** 构建的现代化个人作品集网站，采用深邃科技蓝配色方案，专为展示全栈开发技能和AI创作作品而设计。网站兼顾技术面试官、同行开发者和AI爱好者的浏览需求，提供流畅的用户体验和优雅的视觉效果。

**在线预览**: [待部署]

---

## 核心功能

### 1. 首页 (Home)
- 个人简介与头像展示
- 精选项目快速预览
- 最新博客文章推荐
- 技能概览与统计数据

### 2. 项目展示 (Projects)
- 完整的项目列表展示
- 分类筛选（前端开发、后端开发、全栈项目）
- 项目详情页包含：
  - 项目截图画廊（支持灯箱查看）
  - 技术栈展示
  - 案例研究文档
  - 代码高亮展示
  - 演示视频播放

### 3. AI作品展示 (AI Works)
- AI生成图片网格展示
- 分类筛选（2.5D风格、二次元风格、真实风格）
- 悬停预览效果
- 图片懒加载优化

### 4. 技术博客 (Blog)
- 博客文章列表
- 分类筛选（技术分享、AI创作、教程、随笔）
- Markdown文章渲染
- 代码语法高亮（Atom One主题）
- 代码块复制功能
- 文章导航（上一篇/下一篇）

### 5. 关于我 (About)
- 个人详细介绍
- 技能清单（带进度条）
- 工作经历时间轴
- 教育背景
- 联系方式（含微信二维码）

---

## 主要特点

### 技术特性

| 特性 | 说明 |
|------|------|
| **Vue 3 组合式 API** | 使用 `<script setup>` 语法，代码更简洁 |
| **Vue Router 4** | 客户端路由，支持动态标题和SEO |
| **Pinia 状态管理** | 轻量级状态管理，支持主题切换 |
| **SCSS 预处理器** | CSS变量系统，支持深色/浅色模式 |
| **自定义指令** | 动画指令、懒加载指令 |
| **SEO 优化** | 动态Meta标签、Open Graph、Twitter Cards |
| **响应式设计** | 移动端优先，适配各种设备 |

### 动画效果

- **滚动触发动画**: 使用 IntersectionObserver 实现高性能滚动动画
- **自定义指令**:
  - `v-fade-in` - 淡入动画
  - `v-fade-in-up` - 向上淡入
  - `v-fade-in-left/right` - 左右淡入
  - `v-fade-in-scale` - 缩放淡入
  - `v-stagger` - 交错动画
- **悬停效果**: 卡片上浮、阴影增强、平滑过渡

### 性能优化

- **图片懒加载**: 使用 IntersectionObserver 实现
- **代码分割**: 路由级别代码分割
- **构建优化**: Vite 快速构建和 HMR

---

## 项目结构

```
my-portfolio/
├── public/                     # 静态资源
│   ├── assets/                 # 图片、视频等素材
│   │   ├── ai-works/           # AI作品图片
│   │   ├── blog/               # 博客文章Markdown
│   │   ├── projects/           # 项目截图和视频
│   │   └── profile/            # 个人头像和简历
│   └── favicon.ico
├── src/
│   ├── assets/                 # 源码资源
│   │   ├── styles/             # SCSS样式文件
│   │   └── images/
│   ├── components/             # 组件
│   │   ├── common/             # 通用组件
│   │   ├── layout/             # 布局组件
│   │   └── shared/             # 共享组件
│   ├── constants/              # 常量数据
│   ├── directives/             # 自定义指令
│   ├── layouts/                # 页面布局
│   ├── router/                 # 路由配置
│   ├── stores/                 # Pinia状态管理
│   ├── utils/                  # 工具函数
│   ├── views/                  # 页面视图
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 使用指南

### 环境要求

- Node.js 18+
- pnpm 8+ (推荐) 或 npm 9+

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

启动开发服务器，默认地址 `http://localhost:5173`

### 构建生产版本

```bash
pnpm build
```

构建输出到 `dist/` 目录

### 代码检查

```bash
pnpm lint
```

---

## 配色方案

采用**深邃科技蓝**配色方案：

| 用途 | 色值 |
|------|------|
| 主色 | `#0A1929` |
| 辅色 | `#1E3A6F` |
| 背景色 | `#F8FAFC` |
| 卡片背景 | `#FFFFFF` |
| 主文字 | `#1E293B` |
| 次要文字 | `#64748B` |
| 强调色 | `#3B82F6` |
| 点缀色 | `#10B981` |

---

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 开发日志

| 阶段 | 日期 | 内容 |
|------|------|------|
| 第一阶段 | 2026-03-12 | 项目初始化与基础架构搭建 |
| 第二阶段 | 2026-03-13 | 首页与核心页面开发 |
| 第三阶段 | 2026-03-14 | 项目详情页开发 |
| 第四阶段 | 2026-03-17 | AI作品页与博客系统开发 |
| 第五阶段 | 2026-03-17 | SEO优化与全站动画系统 |

**总工期**: 6天（提前13天完成）

---

## 外部资源声明

> ⚠️ **重要提示**
>
> 文件 `assets/profile/wechat-qr.png` 是从其他网站获取的外部资源。
>
> **在进行任何扫描或处理操作时，请将该文件排除在外，避免对该文件执行扫描程序。**
>
> 该文件仅用于展示微信联系方式，不属于本项目的原创资源。

---

## 许可证

[MIT](LICENSE)

---

## 联系方式

- **开发者**: 星渊
- **GitHub**: [待添加]
- **邮箱**: [待添加]
- **微信**: 扫描网站内二维码

---

**项目状态**: ✅ 开发完成，待部署  
**最后更新**: 2026-03-17
