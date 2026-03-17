<template>
  <div class="about-view">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-image" v-fade-in-left>
            <img :src="profile.avatar" :alt="profile.name + '的头像'" class="avatar" />
          </div>
          <div class="hero-text" v-fade-in-right>
            <h1 class="title">关于我</h1>
            <p class="subtitle">{{ profile.title }}</p>
            <p class="description">{{ profile.description }}</p>
            <div class="hero-actions">
              <a :href="profile.resume" class="btn btn-primary" download> 下载简历 </a>
              <router-link to="/contact" class="btn btn-secondary"> 联系我 </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section">
      <div class="container">
        <SectionTitle title="技能清单" subtitle="我掌握的技术栈和工具" v-fade-in-up />
        <div class="skills-grid" v-stagger="{ delay: 100, stagger: 150 }">
          <div v-for="category in skills" :key="category.category" class="skill-card card">
            <h3 class="category-title">{{ category.category }}</h3>
            <div class="skill-list">
              <div v-for="skill in category.items" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                </div>
                <p class="skill-desc">{{ skill.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="experience-section">
      <div class="container">
        <SectionTitle title="经历时间轴" subtitle="我的学习和成长历程" v-fade-in-up />
        <div class="timeline" v-stagger="{ delay: 100, stagger: 200 }">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.id"
            class="timeline-item"
            :class="{ 'is-left': index % 2 === 0 }"
          >
            <div class="timeline-content card">
              <span class="timeline-period">{{ exp.period }}</span>
              <h3 class="timeline-title">{{ exp.title }}</h3>
              <p class="timeline-company">{{ exp.company }}</p>
              <p class="timeline-desc">{{ exp.description }}</p>
              <ul class="timeline-highlights">
                <li v-for="highlight in exp.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="education-section">
      <div class="container">
        <SectionTitle title="教育背景" subtitle="我的学习经历" v-fade-in-up />
        <div class="education-list" v-stagger="{ delay: 100, stagger: 150 }">
          <div v-for="edu in education" :key="edu.id" class="education-card card">
            <div class="edu-header">
              <h3 class="edu-school">{{ edu.school }}</h3>
              <span class="edu-period">{{ edu.period }}</span>
            </div>
            <p class="edu-major">{{ edu.major }} · {{ edu.degree }}</p>
            <p class="edu-desc">{{ edu.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <SectionTitle title="联系方式" subtitle="期待与您的交流与合作" v-fade-in-up />
        <div class="contact-grid" v-stagger="{ delay: 100, stagger: 100 }">
          <div class="contact-card card">
            <h3 class="contact-title">社交媒体</h3>
            <div class="contact-links">
              <a
                :href="socialLinks.github"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link"
              >
                <span class="icon">🐙</span>
                <span>GitHub</span>
              </a>
              <a :href="socialLinks.email" class="contact-link">
                <span class="icon">✉️</span>
                <span>邮箱</span>
              </a>
            </div>
          </div>
          <div class="contact-card card">
            <h3 class="contact-title">直接联系</h3>
            <div class="contact-info">
              <p><strong>邮箱：</strong>{{ contact.email }}</p>
              <p><strong>位置：</strong>{{ contact.location }}</p>
              <p><strong>状态：</strong>{{ contact.availability }}</p>
            </div>
          </div>
          <div class="contact-card card wechat-card">
            <h3 class="contact-title">微信</h3>
            <img :src="profile.wechatQR" alt="微信二维码" class="wechat-qr" />
            <p class="wechat-tip">扫码添加微信</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { profile, socialLinks, contact } from '@/constants/profile'
import { skills, experiences, education } from '@/constants/skills'
import SectionTitle from '@/components/shared/SectionTitle.vue'
import { vFadeInUp, vFadeInLeft, vFadeInRight, vStagger } from '@/directives/animations'
</script>

<style scoped>
.about-view {
  padding-bottom: var(--space-16);
}

/* Hero Section */
.about-hero {
  padding: var(--space-20) 0;
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-12);
  align-items: center;
}

.hero-image {
  display: flex;
  justify-content: center;
}

.avatar {
  width: 250px;
  height: 250px;
  border-radius: var(--radius-full);
  object-fit: cover;
  box-shadow: var(--shadow-xl);
}

.hero-text {
  text-align: left;
}

.title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.subtitle {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
  font-weight: var(--font-medium);
}

.description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
}

/* Skills Section */
.skills-section {
  padding: var(--space-20) 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-6);
}

.skill-card {
  padding: var(--space-6);
}

.category-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--color-accent);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

.skill-level {
  font-size: var(--text-sm);
  color: var(--color-accent);
  font-weight: var(--font-semibold);
}

.skill-bar {
  height: 8px;
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

.skill-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* Experience Section */
.experience-section {
  padding: var(--space-20) 0;
  background-color: var(--color-bg-secondary);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: var(--color-border);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--space-8);
  width: 50%;
}

.timeline-item.is-left {
  left: 0;
  padding-right: var(--space-8);
}

.timeline-item:not(.is-left) {
  left: 50%;
  padding-left: var(--space-8);
}

.timeline-item::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
  top: var(--space-4);
}

.timeline-item.is-left::before {
  right: -8px;
}

.timeline-item:not(.is-left)::before {
  left: -8px;
}

.timeline-content {
  padding: var(--space-6);
}

.timeline-period {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-accent);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  margin-bottom: var(--space-3);
}

.timeline-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.timeline-company {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.timeline-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-3);
}

.timeline-highlights {
  list-style: none;
  padding: 0;
}

.timeline-highlights li {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  padding-left: var(--space-4);
  position: relative;
  margin-bottom: var(--space-1);
}

.timeline-highlights li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

/* Education Section */
.education-section {
  padding: var(--space-20) 0;
}

.education-list {
  max-width: 800px;
  margin: 0 auto;
}

.education-card {
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.edu-school {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.edu-period {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.edu-major {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.edu-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

/* Contact Section */
.contact-section {
  padding: var(--space-20) 0;
  background-color: var(--color-bg-secondary);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  max-width: 900px;
  margin: 0 auto;
}

.contact-card {
  padding: var(--space-6);
}

.contact-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.contact-link:hover {
  background-color: var(--color-bg-primary);
}

.icon {
  font-size: var(--text-xl);
}

.contact-info p {
  margin-bottom: var(--space-2);
  color: var(--color-text-secondary);
}

.wechat-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wechat-qr {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-3);
  object-fit: contain;
}

.wechat-tip {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .avatar {
    width: 180px;
    height: 180px;
  }

  .hero-actions {
    justify-content: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-item,
  .timeline-item.is-left,
  .timeline-item:not(.is-left) {
    width: 100%;
    left: 0;
    padding-left: 50px;
    padding-right: 0;
  }

  .timeline-item::before,
  .timeline-item.is-left::before,
  .timeline-item:not(.is-left)::before {
    left: 12px;
  }

  .edu-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }
}
</style>
