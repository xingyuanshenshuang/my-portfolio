<template>
  <div
    class="fade-in-section"
    :class="{ 'is-visible': isVisible }"
    :style="{ transitionDelay: delay + 'ms' }"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  threshold: {
    type: Number,
    default: 0.1
  }
})

const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  const element = document.querySelector('.fade-in-section')
  if (element) {
    observer.observe(element)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.fade-in-section {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
