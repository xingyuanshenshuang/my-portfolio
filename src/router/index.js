import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/HomeView.vue'),
          meta: {
            title: '首页 - 星渊的个人网站',
            description: '全栈开发者 | AI创作者 - 星渊的个人作品集网站'
          }
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/about/AboutView.vue'),
          meta: {
            title: '关于我 - 星渊的个人网站',
            description: '了解更多关于星渊的技术背景和创作经历'
          }
        },
        {
          path: 'projects',
          name: 'Projects',
          component: () => import('@/views/projects/ProjectsView.vue'),
          meta: {
            title: '项目展示 - 星渊的个人网站',
            description: '探索星渊开发的智慧商城、大事件管理系统等项目'
          }
        },
        {
          path: 'projects/smartmall',
          name: 'SmartMall',
          component: () => import('@/views/projects/SmartMallView.vue'),
          meta: {
            title: '智慧商城 - 项目详情',
            description: '基于Vue2的移动端电商全栈演示项目'
          }
        },
        {
          path: 'projects/eventmgmt',
          name: 'EventMgmt',
          component: () => import('@/views/projects/EventMgmtView.vue'),
          meta: {
            title: '大事件管理系统 - 项目详情',
            description: '基于Vue3的后台管理系统，集成文章管理与用户管理功能'
          }
        },
        {
          path: 'ai-works',
          name: 'AIWorks',
          component: () => import('@/views/aiworks/AIWorksView.vue'),
          meta: {
            title: 'AI作品 - 星渊的个人网站',
            description: '探索星渊的AI生成艺术作品，包含2.5D、二次元、真实风格等'
          }
        },
        {
          path: 'blog',
          name: 'Blog',
          component: () => import('@/views/blog/BlogListView.vue'),
          meta: {
            title: '博客 - 星渊的个人网站',
            description: '分享技术心得、AI工具使用体验等文章'
          }
        },
        {
          path: 'blog/:slug',
          name: 'BlogPost',
          component: () => import('@/views/blog/BlogPostView.vue'),
          meta: {
            title: '博客文章 - 星渊的个人网站',
            description: '阅读详细的技术文章和心得分享'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/error/NotFoundView.vue'),
      meta: {
        title: '页面未找到 - 星渊的个人网站',
        description: '抱歉，您访问的页面不存在'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '星渊的个人网站'
  next()
})

export default router
