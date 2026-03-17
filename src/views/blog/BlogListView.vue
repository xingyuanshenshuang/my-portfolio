<template>
  <div class="blog-list-view">
    <!-- Hero 区域 -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content" v-fade-in>
          <h1 class="hero-title" v-fade-in-up="{ delay: 100 }">技术博客</h1>
          <p class="hero-description" v-fade-in-up="{ delay: 200 }">
            分享前端开发经验、AI工具使用心得和技术探索笔记
          </p>
          <div class="blog-stats" v-fade-in-up="{ delay: 300 }">
            <span class="stat-item">
              <strong>{{ filteredPosts.length }}</strong> 篇文章
            </span>
            <span class="stat-item">
              <strong>{{ blogCategories.length - 1 }}</strong> 个分类
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 分类筛选 -->
    <section class="filter-section">
      <div class="container">
        <div class="category-filter" v-fade-in-up>
          <button
            v-for="category in blogCategories"
            :key="category.id"
            class="filter-btn"
            :class="{ active: currentCategory === category.id }"
            @click="currentCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- 文章列表 -->
    <section class="posts-section">
      <div class="container">
        <div class="posts-grid" v-stagger="{ delay: 100, stagger: 100 }">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="post-card"
            @click="goToPost(post.slug)"
          >
            <div class="post-content">
              <div class="post-meta">
                <span class="post-category">{{ post.category }}</span>
                <span class="post-date">{{ formatDate(post.date) }}</span>
              </div>
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="post-footer">
                <div class="post-tags">
                  <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                </div>
                <div class="post-stats">
                  <span class="read-time">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" stroke-width="2" />
                      <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    {{ post.readTime }}
                  </span>
                  <span class="views">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2" />
                      <circle cx="12" cy="12" r="3" stroke-width="2" />
                    </svg>
                    {{ post.views }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredPosts.length === 0" class="empty-state" v-fade-in>
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2" />
            <polyline points="14 2 14 8 20 8" stroke-width="2" />
          </svg>
          <p>该分类下暂无文章</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { blogPosts, blogCategories } from '@/constants/blog.js'
import { vFadeIn, vFadeInUp, vStagger } from '@/directives/animations'

const router = useRouter()
const currentCategory = ref('all')

// 过滤文章
const filteredPosts = computed(() => {
  if (currentCategory.value === 'all') {
    return blogPosts
  }
  return blogPosts.filter((post) => {
    // 根据分类名称匹配
    const categoryMap = {
      tech: '技术分享',
      ai: 'AI创作',
      tutorial: '教程',
      thoughts: '随笔'
    }
    return post.category === categoryMap[currentCategory.value]
  })
})

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 跳转到文章详情
const goToPost = (slug) => {
  router.push(`/blog/${slug}`)
}
</script>

<style scoped lang="scss">
.blog-list-view {
  min-height: 100vh;
}

// Hero 区域
.hero-section {
  padding: var(--space-20) 0 var(--space-12);
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
}

.hero-content {
  text-align: center;
}

.hero-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);

  @media (min-width: 768px) {
    font-size: var(--text-5xl);
  }
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-6);
  line-height: var(--leading-relaxed);
}

.blog-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-8);

  .stat-item {
    color: var(--color-text-secondary);
    font-size: var(--text-base);

    strong {
      color: var(--color-accent);
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      margin-right: var(--space-1);
    }
  }
}

// 分类筛选
.filter-section {
  padding: var(--space-6) 0;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 64px;
  z-index: var(--z-sticky);
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
}

.filter-btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  &.active {
    color: white;
    background-color: var(--color-accent);
    border-color: var(--color-accent);
  }
}

// 文章列表
.posts-section {
  padding: var(--space-12) 0 var(--space-20);
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.post-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid var(--color-border);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-accent);
  }
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
}

.post-category {
  color: var(--color-accent);
  font-weight: var(--font-semibold);
}

.post-date {
  color: var(--color-text-muted);
}

.post-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  margin: 0;
}

.post-excerpt {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
}

.post-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.tag {
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
}

.post-stats {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.read-time,
.views {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.icon {
  width: 16px;
  height: 16px;
}

// 空状态
.empty-state {
  text-align: center;
  padding: var(--space-16) 0;
  color: var(--color-text-muted);

  .empty-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto var(--space-4);
    opacity: 0.5;
  }

  p {
    font-size: var(--text-lg);
  }
}
</style>
