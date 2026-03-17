<template>
  <div class="projects-view">
    <!-- Hero Section -->
    <section class="projects-hero">
      <div class="container">
        <div class="hero-content" v-fade-in>
          <h1 class="hero-title">项目展示</h1>
          <p class="hero-description">
            探索我开发的前端项目，从电商全栈系统到后台管理系统，每个项目都是技术与创意的结合
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">{{ projects.length }}</span>
              <span class="stat-label">个项目</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalTechnologies }}</span>
              <span class="stat-label">项技术</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>精选项目</h2>

        <!-- Category Filter -->
        <div class="filter-bar" v-fade-in-up="{ delay: 100 }">
          <button
            v-for="category in projectCategories"
            :key="category.id"
            class="filter-btn"
            :class="{ active: currentCategory === category.id }"
            @click="setCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="project-card"
            v-fade-in-up="{ delay: index * 100 }"
            @click="goToProject(project.path)"
          >
            <div class="project-image-wrapper">
              <img
                v-lazy="project.image"
                :alt="project.name"
                class="project-image"
              />
              <div class="project-overlay">
                <span class="view-text">查看详情</span>
              </div>
            </div>
            <div class="project-info">
              <span class="project-category">{{ project.category }}</span>
              <h3 class="project-name">{{ project.name }}</h3>
              <p class="project-description">{{ project.shortDescription }}</p>
              <div class="project-tech">
                <span
                  v-for="tech in project.techStack.slice(0, 4)"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-links">
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  @click.stop
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" class="link-icon">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  GitHub
                </a>
                <span class="project-link view-detail">
                  查看详情
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="link-icon">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              stroke-width="2"
            />
            <polyline points="14 2 14 8 20 8" stroke-width="2" />
            <line x1="9" y1="15" x2="15" y2="15" stroke-width="2" />
          </svg>
          <p>该分类下暂无项目</p>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-section">
      <div class="container">
        <h2 class="section-title" v-fade-in-up>技术栈</h2>
        <p class="section-description" v-fade-in-up="{ delay: 100 }">
          项目开发中使用的核心技术
        </p>
        <div class="tech-grid">
          <div
            v-for="(tech, index) in technologies"
            :key="tech.name"
            class="tech-card"
            v-fade-in-up="{ delay: index * 50 }"
          >
            <span class="tech-icon">{{ tech.icon }}</span>
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { projects, projectCategories } from '@/constants/projects'
import { vFadeIn, vFadeInUp } from '@/directives/animations'

const router = useRouter()
const currentCategory = ref('all')

// 计算总技术数
const totalTechnologies = computed(() => {
  const techSet = new Set()
  projects.forEach((project) => {
    project.techStack.forEach((tech) => techSet.add(tech))
  })
  return techSet.size
})

// 过滤项目
const filteredProjects = computed(() => {
  if (currentCategory.value === 'all') {
    return projects
  }
  // 根据分类ID映射到项目类型
  const categoryMap = {
    frontend: ['前端开发'],
    backend: ['后台管理系统'],
    ai: ['AI创作'],
  }
  const targetCategories = categoryMap[currentCategory.value] || []
  return projects.filter((project) => targetCategories.includes(project.category))
})

// 设置分类
const setCategory = (categoryId) => {
  currentCategory.value = categoryId
}

// 跳转到项目详情
const goToProject = (path) => {
  router.push(path)
}

// 技术栈数据
const technologies = [
  { name: 'Vue 2', icon: '⚡' },
  { name: 'Vue 3', icon: '🔥' },
  { name: 'Vuex', icon: '📦' },
  { name: 'Pinia', icon: '🍍' },
  { name: 'Vue Router', icon: '🛣️' },
  { name: 'Vant', icon: '📱' },
  { name: 'Element Plus', icon: '🧩' },
  { name: 'Axios', icon: '🌐' },
  { name: 'SCSS', icon: '🎨' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'HTML5', icon: '🏗️' },
  { name: 'CSS3', icon: '💅' },
]
</script>

<style scoped>
.projects-view {
  padding-bottom: var(--space-16);
}

/* Hero Section */
.projects-hero {
  padding: var(--space-20) 0;
  background: linear-gradient(
    135deg,
    var(--color-bg-primary) 0%,
    var(--color-bg-secondary) 100%
  );
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
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
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-12);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-accent);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* Projects Section */
.projects-section {
  padding: var(--space-16) 0;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-8);
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: var(--space-6);
}

.project-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.project-image-wrapper {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-text {
  color: white;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  padding: var(--space-2) var(--space-4);
  border: 2px solid white;
  border-radius: var(--radius-md);
}

.project-info {
  padding: var(--space-5);
}

.project-category {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--color-accent);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  margin-bottom: var(--space-2);
}

.project-name {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.project-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.tech-tag {
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
}

.project-links {
  display: flex;
  gap: var(--space-4);
}

.project-link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.project-link:hover {
  color: var(--color-accent);
}

.project-link.view-detail {
  margin-left: auto;
  color: var(--color-accent);
  font-weight: var(--font-medium);
}

.link-icon {
  width: 16px;
  height: 16px;
}

.empty-state {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-muted);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-4);
  opacity: 0.5;
}

/* Tech Section */
.tech-section {
  padding: var(--space-16) 0;
  background-color: var(--color-bg-secondary);
}

.section-description {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}

.tech-card {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.tech-card:hover {
  transform: translateY(-2px);
}

.tech-icon {
  font-size: var(--text-xl);
}

.tech-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-stats {
    gap: var(--space-8);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-links {
    flex-wrap: wrap;
  }

  .tech-grid {
    gap: var(--space-3);
  }

  .tech-card {
    padding: var(--space-2) var(--space-3);
  }
}
</style>
