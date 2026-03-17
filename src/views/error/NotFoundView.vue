<template>
  <div class="not-found-view">
    <div class="container">
      <div class="error-content" v-fade-in-scale>
        <h1 class="error-code" v-fade-in-up="{ delay: 100 }">404</h1>
        <h2 class="error-title" v-fade-in-up="{ delay: 200 }">页面未找到</h2>
        <p class="error-description" v-fade-in-up="{ delay: 300 }">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <router-link to="/" class="btn btn-primary" v-fade-in-up="{ delay: 400 }">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vFadeInUp, vFadeInScale } from '@/directives/animations'
</script>

<style scoped>
.not-found-view {
  padding: var(--space-20) 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  text-align: center;
}

.error-code {
  font-size: 8rem;
  font-weight: var(--font-bold);
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: var(--space-4);
}

.error-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.error-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
}
</style>
