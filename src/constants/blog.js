// 博客文章列表
export const blogPosts = [
  {
    slug: 'vue-nexttick-guide',
    title: 'Vue3中异步DOM更新与nextTick的实战解析',
    excerpt:
      '从ArticleEdit组件踩坑说起，深入理解Vue3的异步更新机制和nextTick的正确使用方式。本文将结合实际案例，详细讲解nextTick的原理和最佳实践。',
    content: '/assets/blog/vue-nexttick-guide.md',
    date: '2026-03-12',
    author: '星渊',
    tags: ['Vue3', '前端', '异步编程'],
    category: '技术分享',
    readTime: '8分钟',
    views: 128
  }
]

// 博客分类
export const blogCategories = [
  { id: 'all', name: '全部' },
  { id: 'tech', name: '技术分享' },
  { id: 'ai', name: 'AI创作' },
  { id: 'tutorial', name: '教程' },
  { id: 'thoughts', name: '随笔' }
]

// 博客标签
export const blogTags = [
  'Vue3',
  'Vue2',
  'JavaScript',
  'TypeScript',
  '前端',
  '后端',
  'AI',
  'Midjourney',
  '教程',
  '踩坑记录',
  '最佳实践'
]

// 获取最新博客文章
export function getLatestPosts(count = 3) {
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count)
}

// 根据slug获取文章
export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

// 根据分类获取文章
export function getPostsByCategory(category) {
  if (category === 'all') return blogPosts
  return blogPosts.filter((post) => post.category === category)
}
