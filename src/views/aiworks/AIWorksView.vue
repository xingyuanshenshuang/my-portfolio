<template>
  <div class="aiworks-view">
    <!-- Hero Section -->
    <section class="aiworks-hero">
      <div class="container">
        <div class="hero-content" v-fade-in>
          <h1 class="hero-title">AI作品</h1>
          <p class="hero-description">
            探索我使用 Midjourney、Stable Diffusion 等 AI 工具创作的艺术作品
          </p>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>作品展示</h2>

        <!-- Category Filter -->
        <div class="filter-bar" v-fade-in-up="{ delay: 100 }">
          <button
            v-for="category in categories"
            :key="category.id"
            class="filter-btn"
            :class="{ active: currentCategory === category.id }"
            @click="setCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Works Grid -->
        <div class="works-grid">
          <div
            v-for="(work, index) in filteredWorks"
            :key="work.id"
            class="work-item"
            v-fade-in-up="{ delay: index * 100 }"
            @click="openLightbox(work)"
          >
            <div class="work-image-wrapper">
              <img :src="work.image" :alt="work.title" class="work-image" v-lazy="work.image" />
              <div class="work-overlay">
                <div class="view-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="view-svg">
                    <circle cx="11" cy="11" r="8" stroke-width="2" />
                    <path
                      d="M21 21l-4.35-4.35"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="view-text">查看详情</span>
                </div>
              </div>
            </div>
            <div class="work-info">
              <h3 class="work-title">{{ work.title }}</h3>
              <span class="work-category">{{ work.category }}</span>
              <p class="work-description">{{ work.description }}</p>
              <div class="work-meta">
                <span class="work-tool">{{ work.tool }}</span>
                <span class="work-date">{{ work.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredWorks.length === 0" class="empty-state">
          <p>该分类下暂无作品</p>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="tools-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>使用的AI工具</h2>
        <div class="tools-grid">
          <div
            v-for="(tool, index) in aiTools"
            :key="tool.name"
            class="tool-card card"
            v-fade-in-up="{ delay: index * 100 }"
          >
            <h3 class="tool-name">{{ tool.name }}</h3>
            <p class="tool-description">{{ tool.description }}</p>
            <a :href="tool.url" target="_blank" rel="noopener noreferrer" class="tool-link">
              了解更多 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
          <button class="lightbox-close" @click.stop="closeLightbox">×</button>
          <button v-if="hasPrev" class="lightbox-nav lightbox-prev" @click.stop="prevImage">
            ←
          </button>
          <button v-if="hasNext" class="lightbox-nav lightbox-next" @click.stop="nextImage">
            →
          </button>
          <div class="lightbox-content" @click.stop>
            <img :src="currentWork?.image" :alt="currentWork?.title" class="lightbox-image" />
            <div class="lightbox-info">
              <h3>{{ currentWork?.title }}</h3>
              <p>{{ currentWork?.description }}</p>
              <div class="lightbox-meta">
                <span>工具: {{ currentWork?.tool }}</span>
                <span>分类: {{ currentWork?.category }}</span>
                <span>时间: {{ currentWork?.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { aiWorks, aiWorkCategories, aiTools } from '@/constants/aiWorks'
import { vFadeIn, vFadeInUp } from '@/directives/animations'

const currentCategory = ref('all')
const lightboxOpen = ref(false)
const currentWork = ref(null)
const currentIndex = ref(0)

const categories = aiWorkCategories

const filteredWorks = computed(() => {
  if (currentCategory.value === 'all') {
    return aiWorks
  }
  return aiWorks.filter((work) => work.category === currentCategory.value)
})

const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < filteredWorks.value.length - 1)

const setCategory = (categoryId) => {
  currentCategory.value = categoryId
}

const openLightbox = (work) => {
  currentWork.value = work
  currentIndex.value = filteredWorks.value.findIndex((w) => w.id === work.id)
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const prevImage = () => {
  if (hasPrev.value) {
    currentIndex.value--
    currentWork.value = filteredWorks.value[currentIndex.value]
  }
}

const nextImage = () => {
  if (hasNext.value) {
    currentIndex.value++
    currentWork.value = filteredWorks.value[currentIndex.value]
  }
}
</script>

<style scoped>
.aiworks-view {
  padding-bottom: var(--space-16);
}

/* Hero Section */
.aiworks-hero {
  padding: var(--space-20) 0;
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
  text-align: center;
}

.hero-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--leading-relaxed);
}

/* Tools Section */
.tools-section {
  padding: var(--space-16) 0;
  background-color: var(--color-bg-secondary);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-8);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

.tool-card {
  padding: var(--space-6);
  text-align: center;
}

.tool-name {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.tool-description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.tool-link {
  color: var(--color-accent);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
}

.tool-link:hover {
  text-decoration: underline;
}

/* Gallery Section */
.gallery-section {
  padding: var(--space-16) 0;
}

.filter-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.filter-btn {
  padding: var(--space-2) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.filter-btn.active {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}

.work-item {
  cursor: pointer;
  transition: all var(--transition-normal);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.work-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.work-item:hover .work-image-wrapper {
  transform: scale(1.02);
}

.work-image-wrapper {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-4);
  transition: transform var(--transition-normal);
}

.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.work-item:hover .work-image {
  transform: scale(1.1);
}

.work-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.work-item:hover .work-overlay {
  opacity: 1;
}

.view-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: white;
  transform: translateY(10px);
  transition: transform var(--transition-normal);
}

.work-item:hover .view-icon {
  transform: translateY(0);
}

.view-svg {
  width: 32px;
  height: 32px;
  stroke: white;
}

.view-text {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  opacity: 0.9;
}

.work-info {
  padding: 0 var(--space-2);
}

.work-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.work-category {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-accent);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  margin-bottom: var(--space-2);
}

.work-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-3);
}

.work-meta {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.empty-state {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-muted);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
}

.lightbox-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  color: white;
  font-size: var(--text-3xl);
  cursor: pointer;
  z-index: 1;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: var(--radius-full);
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: var(--text-xl);
  cursor: pointer;
  z-index: 1;
  transition: background-color var(--transition-fast);
}

.lightbox-nav:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.lightbox-prev {
  left: var(--space-4);
}

.lightbox-next {
  right: var(--space-4);
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
}

.lightbox-info {
  text-align: center;
  color: white;
  margin-top: var(--space-4);
}

.lightbox-info h3 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.lightbox-info p {
  font-size: var(--text-base);
  opacity: 0.8;
  margin-bottom: var(--space-3);
}

.lightbox-meta {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  font-size: var(--text-sm);
  opacity: 0.6;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--text-3xl);
  }

  .works-grid {
    grid-template-columns: 1fr;
  }

  .lightbox-nav {
    display: none;
  }

  .lightbox-meta {
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>
