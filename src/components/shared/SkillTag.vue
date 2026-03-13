<template>
  <span class="skill-tag" :class="{ 'is-large': large }">
    {{ name }}
  </span>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  large: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.skill-tag {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.skill-tag:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}

.skill-tag.is-large {
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-base);
}
</style>
