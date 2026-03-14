<template>
  <div class="not-found-view">
    <div class="container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">页面未找到</h2>
        <p class="error-description">抱歉，您访问的页面不存在或已被移除。</p>
        <router-link to="/" class="btn btn-primary"> 返回首页 </router-link>
      </div>
    </div>
  </div>
</template>

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
