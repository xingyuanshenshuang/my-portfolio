/**
 * SEO工具函数
 * 用于动态更新页面标题和meta标签
 */

// 默认SEO配置
const defaultSeo = {
  title: '星渊的个人网站',
  description: '全栈开发者 | AI创作者 - 星渊的个人作品集网站，分享前端开发经验、AI工具使用心得和技术探索笔记',
  keywords: '星渊, 前端开发, Vue3, AI创作, 个人网站, 作品集, 技术博客',
  author: '星渊',
  ogType: 'website',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
}

/**
 * 更新页面SEO元信息
 * @param {Object} options - SEO配置选项
 * @param {string} options.title - 页面标题
 * @param {string} options.description - 页面描述
 * @param {string} options.keywords - 页面关键词
 * @param {string} options.author - 作者
 * @param {string} options.ogType - Open Graph类型
 * @param {string} options.ogImage - Open Graph图片
 * @param {string} options.twitterCard - Twitter卡片类型
 */
export function updateSeo(options = {}) {
  const config = { ...defaultSeo, ...options }

  // 更新标题
  if (config.title) {
    document.title = config.title.includes('星渊') 
      ? config.title 
      : `${config.title} - 星渊的个人网站`
  }

  // 更新或创建meta标签
  updateMetaTag('description', config.description)
  updateMetaTag('keywords', config.keywords)
  updateMetaTag('author', config.author)

  // Open Graph标签
  updateMetaTag('og:title', config.title)
  updateMetaTag('og:description', config.description)
  updateMetaTag('og:type', config.ogType)
  updateMetaTag('og:image', config.ogImage)
  updateMetaTag('og:url', window.location.href)

  // Twitter卡片标签
  updateMetaTag('twitter:card', config.twitterCard)
  updateMetaTag('twitter:title', config.title)
  updateMetaTag('twitter:description', config.description)
  updateMetaTag('twitter:image', config.ogImage)
}

/**
 * 更新或创建meta标签
 * @param {string} name - meta标签名称
 * @param {string} content - meta标签内容
 */
function updateMetaTag(name, content) {
  if (!content) return

  // 尝试查找现有的meta标签
  let meta = document.querySelector(`meta[name="${name}"]`) ||
             document.querySelector(`meta[property="${name}"]`)

  if (!meta) {
    // 创建新的meta标签
    meta = document.createElement('meta')
    if (name.startsWith('og:')) {
      meta.setAttribute('property', name)
    } else {
      meta.setAttribute('name', name)
    }
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}

/**
 * 重置为默认SEO配置
 */
export function resetSeo() {
  updateSeo(defaultSeo)
}

/**
 * 生成博客文章的SEO配置
 * @param {Object} post - 博客文章对象
 * @returns {Object} SEO配置
 */
export function generateBlogPostSeo(post) {
  if (!post) return defaultSeo

  return {
    title: post.title,
    description: post.excerpt || defaultSeo.description,
    keywords: post.tags ? post.tags.join(', ') : defaultSeo.keywords,
    author: post.author || defaultSeo.author,
    ogType: 'article',
    ogImage: post.coverImage || defaultSeo.ogImage,
  }
}

/**
 * 生成项目详情页的SEO配置
 * @param {Object} project - 项目对象
 * @returns {Object} SEO配置
 */
export function generateProjectSeo(project) {
  if (!project) return defaultSeo

  return {
    title: project.title,
    description: project.description || defaultSeo.description,
    keywords: project.tags ? project.tags.join(', ') : defaultSeo.keywords,
    ogType: 'article',
    ogImage: project.coverImage || defaultSeo.ogImage,
  }
}
