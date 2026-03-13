<template>
  <div class="project-detail-view">
    <!-- Hero Section -->
    <section class="project-hero">
      <div class="container">
        <div class="hero-content" v-fade-in>
          <span class="project-category">{{ project.category }}</span>
          <h1 class="project-title">{{ project.name }}</h1>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="project-actions">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              查看源码
            </a>
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary"
            >
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
                />
              </svg>
              在线演示
            </a>
          </div>
        </div>
        <div class="hero-image">
          <img :src="project.image" :alt="project.name" />
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="project-gallery-section">
      <div class="container">
        <div v-fade-in-up="{ delay: 0 }">
          <SectionTitle title="项目截图" subtitle="Project Screenshots" />
          <ImageGallery :images="project.gallery" />
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="project-tech-section">
      <div class="container">
        <div v-fade-in-up>
          <SectionTitle title="技术栈" subtitle="Technology Stack" />
        </div>
        <div class="tech-grid">
          <div
            v-for="(tech, index) in project.techStack"
            :key="tech"
            class="tech-item"
            v-fade-in-up="{ delay: index * 100 }"
          >
            <div class="tech-icon">
              <img :src="getTechIcon(tech)" :alt="tech" />
            </div>
            <span class="tech-name">{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="project-highlights-section">
      <div class="container">
        <div v-fade-in-up>
          <SectionTitle title="项目亮点" subtitle="Key Features" />
        </div>
        <div class="highlights-grid">
          <div
            v-for="(highlight, index) in project.highlights"
            :key="index"
            class="highlight-card"
            v-fade-in-up="{ delay: index * 150 }"
          >
            <div class="highlight-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <p class="highlight-text">{{ highlight }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Study Section -->
    <section class="project-case-section">
      <div class="container">
        <div v-fade-in-up>
          <SectionTitle title="案例分析" subtitle="Case Study" />
        </div>
        <div class="case-content">
          <div class="case-block" v-fade-in-up="{ delay: 0 }">
            <h3 class="case-title">项目背景</h3>
            <p class="case-text">
              大事件管理系统是一个现代化的后台管理解决方案，旨在帮助内容创作者和管理员高效地管理文章发布、分类组织和用户权限。
              随着内容管理需求的不断增长，传统的管理方式已经无法满足快速迭代和多人协作的需求。
            </p>
          </div>
          <div class="case-block" v-fade-in-up="{ delay: 150 }">
            <h3 class="case-title">技术选型</h3>
            <p class="case-text">
              项目采用 Vue3 + Pinia + Element Plus 技术栈。Vue3 的 Composition API
              提供了更好的代码组织方式， Pinia 作为新一代状态管理方案，相比 Vuex
              更加轻量和直观。Element Plus 提供了丰富的后台管理组件， 大大加速了开发进程。
            </p>
          </div>
          <div class="case-block" v-fade-in-up="{ delay: 300 }">
            <h3 class="case-title">核心功能</h3>
            <ul class="case-list">
              <li>文章发布与编辑，支持富文本内容</li>
              <li>文章分类与标签管理</li>
              <li>用户注册、登录与权限控制</li>
              <li>响应式布局适配不同设备</li>
              <li>数据可视化展示</li>
            </ul>
          </div>
          <div class="case-block" v-fade-in-up="{ delay: 450 }">
            <h3 class="case-title">项目成果</h3>
            <p class="case-text">
              系统成功上线并稳定运行，为内容管理团队提供了高效的工作平台。通过模块化的架构设计，
              系统具备良好的可扩展性，能够快速响应业务需求的变化。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example Section -->
    <section class="project-code-section">
      <div class="container">
        <div v-fade-in-up>
          <SectionTitle title="代码示例" subtitle="Code Example" />
        </div>
        <div v-fade-in-up="{ delay: 200 }">
          <CodeBlock :code="codeExample" language="javascript" />
        </div>
      </div>
    </section>

    <!-- Video Section -->
    <section class="project-video-section">
      <div class="container">
        <div v-fade-in-up>
          <SectionTitle title="演示视频" subtitle="Demo Video" />
        </div>
        <div class="video-container" v-fade-in-up="{ delay: 200 }">
          <video controls :poster="project.image">
            <source :src="project.demoVideo" type="video/mp4" />
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
    </section>

    <!-- Navigation Section -->
    <section class="project-nav-section">
      <div class="container">
        <div class="project-nav" v-fade-in>
          <router-link to="/projects/smartmall" class="nav-item prev">
            <span class="nav-label">上一个项目</span>
            <span class="nav-title">智慧商城</span>
          </router-link>
          <router-link to="/projects" class="nav-item all">
            <span class="nav-label">查看全部</span>
            <span class="nav-title">项目列表</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { projects } from '@/constants/projects'
import SectionTitle from '@/components/shared/SectionTitle.vue'
import ImageGallery from '@/components/shared/ImageGallery.vue'
import CodeBlock from '@/components/shared/CodeBlock.vue'
import { vFadeIn, vFadeInUp } from '@/directives/animations'

const project = projects.find((p) => p.id === 'eventmgmt')

const getTechIcon = (tech) => {
  const iconMap = {
    Vue3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    Vue2: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    Pinia: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    Vuex: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Vue Router': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Element Plus': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Vant UI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    Axios: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  }
  return (
    iconMap[tech] ||
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  )
}

const codeExample = `// Pinia 文章状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/api/article'

export const useArticleStore = defineStore('article', () => {
  // State
  const articles = ref([])
  const categories = ref([])
  const loading = ref(false)
  const total = ref(0)

  // Getters
  const publishedArticles = computed(() => 
    articles.value.filter(article => article.status === 1)
  )

  // Actions
  const fetchArticles = async (params = {}) => {
    loading.value = true
    try {
      const res = await getArticles(params)
      articles.value = res.data
      total.value = res.total
      return res
    } finally {
      loading.value = false
    }
  }

  const addArticle = async (data) => {
    const res = await createArticle(data)
    articles.value.unshift(res.data)
    return res
  }

  const editArticle = async (id, data) => {
    const res = await updateArticle(id, data)
    const index = articles.value.findIndex(item => item.id === id)
    if (index !== -1) {
      articles.value[index] = res.data
    }
    return res
  }

  const removeArticle = async (id) => {
    await deleteArticle(id)
    articles.value = articles.value.filter(item => item.id !== id)
  }

  return {
    articles,
    categories,
    loading,
    total,
    publishedArticles,
    fetchArticles,
    addArticle,
    editArticle,
    removeArticle
  }
})`
</script>

<style scoped lang="scss">
.project-detail-view {
  padding-top: 80px;
}

.project-hero {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
}

.hero-content {
  .project-category {
    display: inline-block;
    padding: 8px 16px;
    background: var(--accent-color);
    color: white;
    font-size: 14px;
    font-weight: 500;
    border-radius: 20px;
    margin-bottom: 20px;
  }

  .project-title {
    font-size: 48px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .project-description {
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 30px;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;

    .tag {
      padding: 6px 14px;
      background: var(--bg-tertiary);
      color: var(--text-secondary);
      font-size: 14px;
      border-radius: 16px;
      border: 1px solid var(--border-color);
    }
  }

  .project-actions {
    display: flex;
    gap: 16px;

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s ease;

      .icon {
        width: 20px;
        height: 20px;
      }
    }

    .btn-primary {
      background: var(--accent-color);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
      }
    }

    .btn-secondary {
      background: transparent;
      color: var(--text-primary);
      border: 2px solid var(--border-color);

      &:hover {
        border-color: var(--accent-color);
        color: var(--accent-color);
      }
    }
  }
}

.hero-image {
  img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
}

.project-gallery-section,
.project-tech-section,
.project-highlights-section,
.project-case-section,
.project-code-section,
.project-video-section {
  padding: 80px 0;
}

.project-tech-section,
.project-case-section {
  background: var(--bg-secondary);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--accent-color);
  }

  .tech-icon {
    width: 48px;
    height: 48px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .tech-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
  }
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.highlight-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .highlight-icon {
    width: 40px;
    height: 40px;
    min-width: 40px;
    background: linear-gradient(135deg, var(--accent-color), #0ea5e9);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .highlight-text {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

.case-content {
  max-width: 800px;
  margin: 0 auto;
}

.case-block {
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  .case-title {
    font-size: 22px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--accent-color);
    display: inline-block;
  }

  .case-text {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.8;
  }

  .case-list {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 12px;
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.6;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 8px;
        height: 8px;
        background: var(--accent-color);
        border-radius: 50%;
      }
    }
  }
}

.video-container {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);

  video {
    width: 100%;
    height: auto;
    display: block;
  }
}

.project-nav-section {
  padding: 60px 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.project-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 180px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: var(--accent-color);
  }

  &.prev {
    align-items: flex-start;
  }

  &.all {
    align-items: center;
  }

  .nav-label {
    font-size: 13px;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }

  .nav-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
  }
}

@media (max-width: 768px) {
  .project-hero {
    padding: 60px 0;

    .container {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  .hero-content {
    .project-title {
      font-size: 32px;
    }

    .project-description {
      font-size: 16px;
    }

    .project-actions {
      flex-direction: column;

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  }

  .hero-image {
    order: -1;
  }

  .project-gallery-section,
  .project-tech-section,
  .project-highlights-section,
  .project-case-section,
  .project-code-section,
  .project-video-section {
    padding: 60px 0;
  }

  .tech-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .tech-item {
    padding: 16px;

    .tech-icon {
      width: 36px;
      height: 36px;
    }

    .tech-name {
      font-size: 12px;
    }
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .case-block {
    .case-title {
      font-size: 20px;
    }
  }

  .project-nav {
    flex-direction: column;

    .nav-item {
      width: 100%;
      align-items: center !important;
    }
  }
}
</style>
