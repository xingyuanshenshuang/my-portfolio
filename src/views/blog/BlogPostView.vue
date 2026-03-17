<template>
  <div class="blog-post-view">
    <!-- 文章头部 -->
    <section class="post-header">
      <div class="container">
        <div class="header-content">
          <!-- 返回按钮 -->
          <button class="back-btn" @click="goBack">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            返回博客列表
          </button>

          <!-- 文章元信息 -->
          <div class="post-meta" v-if="post">
            <span class="post-category">{{ post.category }}</span>
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="post-author">作者：{{ post.author }}</span>
          </div>

          <!-- 文章标题 -->
          <h1 class="post-title" v-if="post">{{ post.title }}</h1>

          <!-- 文章统计 -->
          <div class="post-stats" v-if="post">
            <span class="stat-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round" />
              </svg>
              {{ post.readTime }}
            </span>
            <span class="stat-item">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2" />
                <circle cx="12" cy="12" r="3" stroke-width="2" />
              </svg>
              {{ post.views }} 阅读
            </span>
          </div>

          <!-- 文章标签 -->
          <div class="post-tags" v-if="post">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 文章内容 -->
    <section class="post-content-section">
      <div class="container">
        <div class="content-wrapper">
          <!-- Markdown 内容 - 使用 vite-plugin-markdown -->
          <MarkdownRenderer v-if="markdownContent" :content="markdownContent" />

          <!-- 文章导航 -->
          <nav class="post-navigation" v-if="post">
            <div class="nav-item prev" v-if="prevPost" @click="goToPost(prevPost.slug)">
              <span class="nav-label">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                上一篇
              </span>
              <span class="nav-title">{{ prevPost.title }}</span>
            </div>
            <div class="nav-spacer"></div>
            <div class="nav-item next" v-if="nextPost" @click="goToPost(nextPost.slug)">
              <span class="nav-label">
                下一篇
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="nav-title">{{ nextPost.title }}</span>
            </div>
          </nav>
        </div>
      </div>
    </section>

    <!-- 404 状态 -->
    <section class="not-found" v-if="!post && !loading">
      <div class="container">
        <div class="not-found-content">
          <svg class="not-found-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2" />
            <polyline points="14 2 14 8 20 8" stroke-width="2" />
            <line x1="9" y1="15" x2="15" y2="15" stroke-width="2" />
          </svg>
          <h2>文章未找到</h2>
          <p>抱歉，您访问的文章不存在或已被删除</p>
          <button class="btn btn-primary" @click="goBack">返回博客列表</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogPosts, getPostBySlug } from '@/constants/blog.js'
import MarkdownRenderer from '@/components/shared/MarkdownRenderer.vue'
import { updateSeo, generateBlogPostSeo } from '@/utils/seo.js'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const markdownContent = ref('')

// 获取当前文章
const post = computed(() => {
  const slug = route.params.slug
  return getPostBySlug(slug)
})

// 获取上一篇文章
const prevPost = computed(() => {
  if (!post.value) return null
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.value.slug)
  if (currentIndex > 0) {
    return blogPosts[currentIndex - 1]
  }
  return null
})

// 获取下一篇文章
const nextPost = computed(() => {
  if (!post.value) return null
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.value.slug)
  if (currentIndex < blogPosts.length - 1) {
    return blogPosts[currentIndex + 1]
  }
  return null
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

// 返回博客列表
const goBack = () => {
  router.push('/blog')
}

// 跳转到文章
const goToPost = (slug) => {
  router.push(`/blog/${slug}`)
}

// 加载 Markdown 内容 - 使用 vite-plugin-markdown
const loadMarkdownContent = async () => {
  if (!post.value) {
    loading.value = false
    return
  }

  try {
    loading.value = true

    // 通过 fetch 获取 Markdown 内容
    const response = await fetch(post.value.content)
    if (!response.ok) {
      throw new Error('Failed to load markdown file')
    }
    const markdownText = await response.text()

    // 使用 vite-plugin-markdown 的 html 模式渲染
    // 这里我们使用 marked 或其他方式将 markdown 转换为 html
    // 由于 vite-plugin-markdown 配置为 html 模式，我们需要手动转换
    markdownContent.value = await renderMarkdown(markdownText)

    // 更新SEO元信息
    updateSeo(generateBlogPostSeo(post.value))
  } catch (error) {
    console.error('加载文章失败:', error)
    markdownContent.value = '<p>加载文章失败，请稍后重试</p>'
  } finally {
    loading.value = false
  }
}

// Markdown 渲染函数 - 使用安全的转换
const renderMarkdown = async (text) => {
  // 为了安全起见，我们先处理代码块，提取并保存它们
  // 然后处理其他 Markdown 语法，最后再把代码块放回去
  // 这样可以防止代码块内的内容被错误处理

  const codeBlocks = []
  let html = text

  // 1. 首先提取所有代码块，保存到数组中
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'plaintext'
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`
    codeBlocks.push({
      language,
      code: escapeHtml(code.trim())
    })
    return placeholder
  })

  // 2. 转义剩余内容中的 HTML 标签（除了我们即将插入的占位符）
  // 先转义非代码块部分的 HTML
  html = escapeHtmlExceptPlaceholders(html)

  // 3. 处理其他 Markdown 语法
  // 行内代码
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    return `<code>${escapeHtml(code)}</code>`
  })

  // 标题
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>')
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>')
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>')
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // 粗体和斜体
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>')
  html = html.replace(/_(.*?)_/g, '<em>$1</em>')

  // 删除线
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>')

  // 引用块
  html = html.replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>')
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>')

  // 无序列表
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>')
  html = html.replace(/<\/ul>\n<ul>/g, '')

  // 有序列表
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n)+/g, (match) => {
    if (!match.includes('<ul>')) {
      return `<ol>${match}</ol>`
    }
    return match
  })
  html = html.replace(/<\/ol>\n<ol>/g, '')

  // 链接 - 安全地处理链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, linkUrl) => {
    // 验证链接 URL，只允许 http、https、mailto 等安全协议
    const safeUrl = sanitizeUrl(linkUrl)
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
  })

  // 图片 - 安全地处理图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, altText, imgUrl) => {
    const safeUrl = sanitizeUrl(imgUrl)
    return `<img src="${safeUrl}" alt="${escapeHtml(altText)}" />`
  })

  // 水平线
  html = html.replace(/^---$/gim, '<hr>')
  html = html.replace(/^\*\*\*$/gim, '<hr>')
  html = html.replace(/^___$/gim, '<hr>')

  // 段落
  html = html.replace(/\n\n/g, '</p><p>')
  html = html.replace(/^(?!<[a-z])/gim, '<p>')
  html = html.replace(/(?<!\n)<\/([a-z]+)>(?!\n)/gi, '</$1>\n')

  // 4. 把保存的代码块放回去
  codeBlocks.forEach((block, index) => {
    const placeholder = `__CODE_BLOCK_${index}__`
    html = html.replace(
      placeholder,
      `<pre><code class="language-${block.language}">${block.code}</code></pre>`
    )
  })

  // 清理空段落
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p>(<[^>]+>)<\/p>/g, '$1')

  return html
}

// 安全转义函数，但保留代码块占位符
const escapeHtmlExceptPlaceholders = (text) => {
  // 先临时保存占位符
  const placeholders = []
  let temp = text.replace(/__CODE_BLOCK_\d+__/g, (match) => {
    placeholders.push(match)
    return `__TEMP_PLACEHOLDER_${placeholders.length - 1}__`
  })

  // 转义 HTML
  temp = escapeHtml(temp)

  // 恢复占位符
  placeholders.forEach((placeholder, index) => {
    temp = temp.replace(`__TEMP_PLACEHOLDER_${index}__`, placeholder)
  })

  return temp
}

// URL 安全过滤函数
const sanitizeUrl = (url) => {
  try {
    const decodedUrl = decodeURIComponent(url)
    const urlObj = new URL(decodedUrl, 'http://localhost')

    // 只允许安全的协议
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return '#'
    }

    // 防止 JavaScript 协议
    if (decodedUrl.toLowerCase().startsWith('javascript:')) {
      return '#'
    }

    return decodedUrl
  } catch {
    // 如果 URL 解析失败，返回 # 作为安全默认值
    return '#'
  }
}

// HTML 转义函数
const escapeHtml = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 监听路由变化
watch(
  () => route.params.slug,
  () => {
    loadMarkdownContent()
  }
)

// 组件挂载时加载内容
onMounted(() => {
  loadMarkdownContent()
})
</script>

<style scoped lang="scss">
.blog-post-view {
  min-height: 100vh;
}

// 文章头部
.post-header {
  padding: var(--space-16) 0 var(--space-8);
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: var(--space-6);

  &:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .icon {
    width: 16px;
    height: 16px;
  }
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
}

.post-category {
  padding: var(--space-1) var(--space-3);
  color: var(--color-accent);
  font-weight: var(--font-semibold);
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: var(--radius-full);
}

.post-date,
.post-author {
  color: var(--color-text-muted);
}

.post-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.post-stats {
  display: flex;
  gap: var(--space-6);
  margin-bottom: var(--space-4);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);

  .icon {
    width: 16px;
    height: 16px;
  }
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

// 文章内容区域
.post-content-section {
  padding: var(--space-8) 0 var(--space-16);
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

// 文章导航
.post-navigation {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.nav-spacer {
  flex: 1;
}

.nav-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  max-width: 300px;

  &:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
  }

  &.prev {
    align-items: flex-start;
  }

  &.next {
    align-items: flex-end;
    text-align: right;
  }
}

.nav-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);

  .icon {
    width: 16px;
    height: 16px;
  }
}

.nav-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
}

// 404 状态
.not-found {
  padding: var(--space-20) 0;
  text-align: center;
}

.not-found-content {
  max-width: 400px;
  margin: 0 auto;
}

.not-found-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-6);
  color: var(--color-text-muted);
}

.not-found h2 {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.not-found p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.btn-primary {
  background-color: var(--color-accent);
  color: white;

  &:hover {
    background-color: var(--color-secondary);
  }
}

// 响应式适配
@media (max-width: 768px) {
  .post-navigation {
    flex-direction: column;
  }

  .nav-item {
    max-width: 100%;
    width: 100%;

    &.next {
      align-items: flex-start;
      text-align: left;
    }
  }

  .nav-spacer {
    display: none;
  }
}
</style>
