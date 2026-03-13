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
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="project-gallery-section">
      <div class="container">
        <div v-fade-in-up="{ delay: 0 }">
          <ImageGallery :images="project.gallery" />
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-stack-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>技术栈</h2>
        <div class="tech-grid">
          <div
            v-for="(tech, index) in project.techStack"
            :key="tech"
            class="tech-item"
            v-fade-in-up="{ delay: index * 100 }"
          >
            {{ tech }}
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="highlights-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>项目亮点</h2>
        <div class="highlights-grid">
          <div
            v-for="(highlight, index) in project.highlights"
            :key="index"
            class="highlight-card card"
            v-fade-in-up="{ delay: index * 150 }"
          >
            <span class="highlight-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <p class="highlight-text">{{ highlight }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Study Section -->
    <section class="case-study-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>案例研究</h2>
        <div class="case-content">
          <div class="case-block" v-fade-in-up="{ delay: 0 }">
            <h3>技术选型</h3>
            <p>
              项目采用 Vue2 + Vuex + Vant UI 技术栈。Vue2 的成熟稳定为项目提供了可靠的基础，Vuex
              解决了跨组件状态管理问题，Vant UI 提供了丰富的移动端组件，使开发效率大幅提升。
            </p>
          </div>
          <div class="case-block" v-fade-in-up="{ delay: 150 }">
            <h3>核心挑战</h3>
            <p>
              <strong>登录状态管理：</strong>用户登录后需要保持状态，刷新页面后仍需保持登录。通过
              localStorage 存储用户信息，在 Vuex 中统一管理，实现了登录状态的持久化。
            </p>
          </div>
          <div class="case-block" v-fade-in-up="{ delay: 300 }">
            <h3>代码亮点</h3>
            <p>
              封装了通用的购物车逻辑，实现了商品添加、数量修改、选中状态管理等功能。使用 Vuex
              管理购物车状态，确保数据一致性。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example Section -->
    <section class="code-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>代码示例</h2>
        <p class="code-description" v-fade-in-up="{ delay: 100 }">购物车状态管理实现</p>
        <div v-fade-in-up="{ delay: 200 }">
          <CodeBlock :code="codeExample" language="javascript" />
        </div>
      </div>
    </section>

    <!-- Video Section -->
    <section v-if="project.demoVideo" class="video-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>演示视频</h2>
        <div class="video-container" v-fade-in-up="{ delay: 200 }">
          <video controls :src="project.demoVideo" class="demo-video">
            您的浏览器不支持视频播放
          </video>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="project-nav">
      <div class="container">
        <router-link to="/projects" class="back-link" v-fade-in> ← 返回项目列表 </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { projects } from '@/constants/projects'
import ImageGallery from '@/components/shared/ImageGallery.vue'
import CodeBlock from '@/components/shared/CodeBlock.vue'
import { vFadeIn, vFadeInUp } from '@/directives/animations'

const project = projects.find((p) => p.id === 'smartmall')

const codeExample = `// Vuex 购物车状态管理
const state = {
  cartList: []
}

const mutations = {
  addToCart(state, goods) {
    const item = state.cartList.find(item => item.goods_id === goods.goods_id)
    if (item) {
      item.num += goods.num
    } else {
      state.cartList.push(goods)
    }
  },
  updateCart(state, { goodsId, num }) {
    const item = state.cartList.find(item => item.goods_id === goodsId)
    if (item) {
      item.num = num
    }
  }
}

const actions = {
  async getCartList({ commit }) {
    const { data } = await getCartListAPI()
    commit('setCartList', data)
  }
}`
</script>

<style scoped>
.project-detail-view {
  padding-bottom: var(--space-16);
}

/* Hero Section */
.project-hero {
  padding: var(--space-20) 0;
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
  text-align: center;
}

.project-category {
  display: inline-block;
  padding: var(--space-1) var(--space-4);
  background-color: var(--color-accent);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  margin-bottom: var(--space-4);
}

.project-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.project-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto var(--space-6);
  line-height: var(--leading-relaxed);
}

.project-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.tag {
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.project-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
}

.project-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.project-actions .icon {
  width: 20px;
  height: 20px;
}

/* Gallery Section */
.project-gallery-section {
  padding: var(--space-12) 0;
}

/* Tech Stack Section */
.tech-stack-section {
  padding: var(--space-12) 0;
  background-color: var(--color-bg-secondary);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-8);
}

.tech-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.tech-item {
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

/* Highlights Section */
.highlights-section {
  padding: var(--space-12) 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

.highlight-card {
  padding: var(--space-6);
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.highlight-number {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-accent);
  line-height: 1;
}

.highlight-text {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

/* Case Study Section */
.case-study-section {
  padding: var(--space-12) 0;
  background-color: var(--color-bg-secondary);
}

.case-content {
  max-width: 800px;
  margin: 0 auto;
}

.case-block {
  margin-bottom: var(--space-8);
}

.case-block h3 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.case-block p {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

/* Code Section */
.code-section {
  padding: var(--space-12) 0;
}

.code-description {
  text-align: center;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

/* Video Section */
.video-section {
  padding: var(--space-12) 0;
  background-color: var(--color-bg-secondary);
}

.video-container {
  max-width: 900px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.demo-video {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* Navigation */
.project-nav {
  padding: var(--space-8) 0;
  text-align: center;
}

.back-link {
  color: var(--color-accent);
  font-weight: var(--font-medium);
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .project-title {
    font-size: var(--text-3xl);
  }

  .project-actions {
    flex-direction: column;
    align-items: center;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }
}
</style>
