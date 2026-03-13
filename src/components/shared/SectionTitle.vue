<template>
  <div class="section-title" :class="{ 'is-centered': centered }">
    <h2 class="title">{{ title }}</h2>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  centered: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.section-title {
  margin-bottom: var(--space-12);
}

.section-title.is-centered {
  text-align: center;
}

.title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--leading-relaxed);
}

@media (max-width: 768px) {
  .title {
    font-size: var(--text-2xl);
  }

  .subtitle {
    font-size: var(--text-base);
  }
}
</style>
