<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text" v-fade-in-left>
            <h1 class="hero-title">
              Hi, 我是 <span class="name">{{ profile.name }}</span>
            </h1>
            <p class="hero-subtitle" v-fade-in-up="{ delay: 200 }">{{ profile.title }}</p>
            <p class="hero-description" v-fade-in-up="{ delay: 300 }">{{ profile.bio }}</p>
            <div class="hero-actions" v-fade-in-up="{ delay: 400 }">
              <router-link to="/projects" class="btn btn-primary"> 查看作品 </router-link>
              <router-link to="/about" class="btn btn-secondary"> 了解更多 </router-link>
            </div>
          </div>
          <div class="hero-image" v-fade-in-right>
            <div class="avatar-container">
              <img :src="profile.avatar" :alt="profile.name + '的头像'" class="avatar" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="featured-projects">
      <div class="container">
        <SectionTitle title="精选项目" subtitle="探索我的技术实践与创意作品" v-fade-in-up />
        <div class="projects-grid" v-stagger="{ delay: 100, stagger: 150 }">
          <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
        </div>
        <div class="section-footer" v-fade-in-up="{ delay: 300 }">
          <router-link to="/projects" class="btn btn-secondary"> 查看全部项目 </router-link>
        </div>
      </div>
    </section>

    <!-- Latest Blog Section -->
    <section class="latest-blog">
      <div class="container">
        <SectionTitle title="最新博客" subtitle="分享技术心得与学习经验" v-fade-in-up />
        <div class="blog-list" v-stagger="{ delay: 100, stagger: 100 }">
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
            <router-link :to="`/blog/${post.slug}`" class="read-more"> 阅读全文 → </router-link>
          </article>
        </div>
        <div class="section-footer" v-fade-in-up="{ delay: 300 }">
          <router-link to="/blog" class="btn btn-secondary"> 查看全部文章 </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Preview Section -->
    <section class="skills-preview">
      <div class="container">
        <SectionTitle title="技术栈" subtitle="熟练掌握的前端技术与工具" v-fade-in-up />
        <div class="skills-grid" v-stagger="{ delay: 100, stagger: 150 }">
          <div
            v-for="category in skills.slice(0, 3)"
            :key="category.category"
            class="skill-category"
          >
            <h3 class="category-title">{{ category.category }}</h3>
            <div class="skill-items">
              <div v-for="skill in category.items.slice(0, 3)" :key="skill.name" class="skill-item">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-footer" v-fade-in-up="{ delay: 300 }">
          <router-link to="/about" class="btn btn-secondary"> 查看全部技能 </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { profile } from '@/constants/profile'
import { featuredProjects } from '@/constants/projects'
import { skills } from '@/constants/skills'
import { getLatestPosts } from '@/constants/blog'
import SectionTitle from '@/components/shared/SectionTitle.vue'
import ProjectCard from '@/components/shared/ProjectCard.vue'
import { vFadeInUp, vFadeInLeft, vFadeInRight, vStagger } from '@/directives/animations'

const latestPosts = getLatestPosts(3)

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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.section-footer {
  text-align: center;
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
  margin-bottom: var(--space-4);
}

.read-more {
  color: var(--color-accent);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
}

.read-more:hover {
  text-decoration: underline;
}

/* Skills Preview */
.skills-preview {
  padding: var(--space-20) 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.skill-category {
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
}

.category-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.skill-name {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.skill-bar {
  height: 6px;
  background-color: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-success));
  border-radius: var(--radius-full);
  transition: width var(--transition-slow);
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
    order: -1;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
