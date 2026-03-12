<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <router-link to="/" class="footer-logo">
            <span class="logo-text">星渊</span>
          </router-link>
          <p class="footer-description">
            全栈开发者 | AI创作者<br>
            热爱技术，痴迷于将创意落地
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-section">
            <h4 class="footer-title">导航</h4>
            <ul class="footer-list">
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/projects">项目</router-link></li>
              <li><router-link to="/ai-works">AI作品</router-link></li>
              <li><router-link to="/blog">博客</router-link></li>
              <li><router-link to="/about">关于我</router-link></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">联系方式</h4>
            <ul class="footer-list">
              <li>
                <a :href="socialLinks.github" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a :href="socialLinks.email">
                  邮箱
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} 星渊. All rights reserved.
        </p>
        <p class="tech-stack">
          Built with Vue 3 + Vite + ❤️
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = {
  github: 'https://github.com/xingyuanshenshuang',
  email: 'mailto:123456@qq.com'
}
</script>

<style scoped>
.footer {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--space-16) 0 var(--space-8);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  text-decoration: none;
  display: inline-block;
  margin-bottom: var(--space-4);
}

.logo-text {
  background: linear-gradient(135deg, var(--color-accent), var(--color-success));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
}

.footer-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-list {
  list-style: none;
}

.footer-list li {
  margin-bottom: var(--space-2);
}

.footer-list a {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-list a:hover {
  color: var(--color-accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.copyright,
.tech-stack {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
}
</style>
