<template>
  <div class="project-card card">
    <div class="project-image">
      <img :src="project.image" :alt="project.name">
      <div class="project-overlay">
        <router-link :to="project.path" class="view-btn">
          查看详情
        </router-link>
      </div>
    </div>
    <div class="project-content">
      <h3 class="project-name">{{ project.name }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.project-card {
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.project-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 25, 41, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-btn {
  padding: var(--space-3) var(--space-6);
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transform: translateY(20px);
  transition: transform var(--transition-normal), background var(--transition-fast);
}

.project-card:hover .view-btn {
  transform: translateY(0);
}

.view-btn:hover {
  background: var(--color-secondary);
}

.project-content {
  padding: var(--space-6);
}

.project-name {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
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

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}
</style>
