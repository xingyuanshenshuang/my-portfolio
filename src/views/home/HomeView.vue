<template>
  <div class="home-view">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Hi, 我是 <span class="name">星渊</span>
            </h1>
            <p class="hero-subtitle">
              全栈开发者 | AI创作者
            </p>
            <p class="hero-description">
              热爱技术、痴迷于将创意落地的实践派前端学习者。
              我相信代码不仅是逻辑的表达，更是连接用户与体验的桥梁。
            </p>
            <div class="hero-actions">
              <router-link to="/projects" class="btn btn-primary">
                查看作品
              </router-link>
              <router-link to="/about" class="btn btn-secondary">
                了解更多
              </router-link>
            </div>
          </div>
          <div class="hero-image">
            <div class="avatar-container">
              <img src="/assets/profile/avatar.png" alt="星渊的头像" class="avatar">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-projects">
      <div class="container">
        <h2 class="section-title">精选项目</h2>
        <div class="projects-grid">
          <div v-for="project in featuredProjects" :key="project.id" class="project-card card">
            <div class="project-image">
              <img :src="project.image" :alt="project.name">
            </div>
            <div class="project-content">
              <h3 class="project-name">{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <router-link :to="project.path" class="project-link">
                查看详情 →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="latest-blog">
      <div class="container">
        <h2 class="section-title">最新博客</h2>
        <div class="blog-list">
          <article v-for="post in latestPosts" :key="post.slug" class="blog-card card">
            <div class="blog-meta">
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <div class="blog-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <h3 class="blog-title">
              <router-link :to="`/blog/${post.slug}`">{{ post.title }}</router-link>
            </h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
          </article>
        </div>
        <div class="section-footer">
          <router-link to="/blog" class="btn btn-secondary">
            查看全部文章
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const featuredProjects = ref([
  {
    id: 1,
    name: '智慧商城',
    description: '基于Vue2的移动端电商全栈演示项目，实现了用户从浏览、购物到支付的完整流程。',
    image: '/assets/projects/smartmall/home.png',
    tags: ['Vue2', 'Vuex', 'Vant'],
    path: '/projects/smartmall'
  },
  {
    id: 2,
    name: '大事件管理系统',
    description: '基于Vue3的后台管理系统，集成文章管理与用户管理功能，实现对大事件数据的高效管理。',
    image: '/assets/projects/eventmgmt/login.png',
    tags: ['Vue3', 'Pinia', 'Element Plus'],
    path: '/projects/eventmgmt'
  },
  {
    id: 3,
    name: 'AI作品集',
    description: '使用Midjourney、Stable Diffusion等AI工具创作的艺术作品，包含多种风格。',
    image: '/assets/ai-works/ai-2.5d-01.png',
    tags: ['Midjourney', 'AI Art'],
    path: '/ai-works'
  }
])

const latestPosts = ref([
  {
    slug: 'vue-nexttick-guide',
    title: 'Vue3中异步DOM更新与nextTick的实战解析',
    excerpt: '从ArticleEdit组件踩坑说起，深入理解Vue3的异步更新机制和nextTick的正确使用方式。',
    date: '2026-03-12',
    tags: ['Vue3', '前端']
  }
])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.home-view {
  padding-bottom: var(--space-16);
}

/* Hero Section */
.hero {
  padding: var(--space-24) 0;
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

.hero-title {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.hero-title .name {
  background: linear-gradient(135deg, var(--color-accent), var(--color-success));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--text-2xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  font-weight: var(--font-medium);
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: var(--radius-full);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Featured Projects */
.featured-projects {
  padding: var(--space-20) 0;
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-12);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-8);
}

.project-card {
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: var(--space-6);
}

.project-name {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.project-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.project-link {
  color: var(--color-accent);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
}

.project-link:hover {
  text-decoration: underline;
}

/* Latest Blog */
.latest-blog {
  padding: var(--space-20) 0;
  background-color: var(--color-bg-secondary);
}

.blog-list {
  display: grid;
  gap: var(--space-6);
  max-width: 800px;
  margin: 0 auto var(--space-8);
}

.blog-card {
  padding: var(--space-6);
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.blog-tags {
  display: flex;
  gap: var(--space-2);
}

.blog-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.blog-title a {
  color: var(--color-text-primary);
}

.blog-title a:hover {
  color: var(--color-accent);
}

.blog-excerpt {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.section-footer {
  text-align: center;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-title {
    font-size: var(--text-4xl);
  }

  .hero-description {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .avatar-container {
    width: 200px;
    height: 200px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
