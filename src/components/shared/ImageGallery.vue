<template>
  <div class="image-gallery">
    <!-- 主图展示 -->
    <div class="main-image-container">
      <img
        :src="images[currentIndex]"
        :alt="`图片 ${currentIndex + 1}`"
        class="main-image"
        @click="openLightbox"
      />
      <button v-if="images.length > 1" class="nav-btn prev" @click="prevImage">&#8249;</button>
      <button v-if="images.length > 1" class="nav-btn next" @click="nextImage">&#8250;</button>
      <div class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
    </div>

    <!-- 缩略图列表 -->
    <div v-if="images.length > 1" class="thumbnail-list">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="thumbnail-item"
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
      >
        <img :src="image" :alt="`缩略图 ${index + 1}`" />
      </div>
    </div>

    <!-- 灯箱 -->
    <Teleport to="body">
      <div v-if="isLightboxOpen" class="lightbox" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <img
            :src="images[currentIndex]"
            :alt="`图片 ${currentIndex + 1}`"
            class="lightbox-image"
          />
          <button class="lightbox-close" @click="closeLightbox">&times;</button>
          <button v-if="images.length > 1" class="lightbox-nav prev" @click.stop="prevImage">
            &#8249;
          </button>
          <button v-if="images.length > 1" class="lightbox-nav next" @click.stop="nextImage">
            &#8250;
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const currentIndex = ref(props.initialIndex)
const isLightboxOpen = ref(false)

watch(
  () => props.initialIndex,
  (newVal) => {
    currentIndex.value = newVal
  }
)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const openLightbox = () => {
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.image-gallery {
  width: 100%;
}

.main-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-4);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
  transition: transform var(--transition-normal);
}

.main-image:hover {
  transform: scale(1.02);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--text-2xl);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-fast);
}

.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.nav-btn.prev {
  left: var(--space-4);
}

.nav-btn.next {
  right: var(--space-4);
}

.image-counter {
  position: absolute;
  bottom: var(--space-4);
  right: var(--space-4);
  padding: var(--space-1) var(--space-3);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
}

.thumbnail-list {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  padding-bottom: var(--space-2);
}

.thumbnail-item {
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color var(--transition-fast);
}

.thumbnail-item.active {
  border-color: var(--color-accent);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 灯箱样式 */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: var(--space-8);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--text-2xl);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-fast);
}

.lightbox-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--text-3xl);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-fast);
}

.lightbox-nav:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.lightbox-nav.prev {
  left: -70px;
}

.lightbox-nav.next {
  right: -70px;
}

@media (max-width: 768px) {
  .lightbox-nav.prev {
    left: var(--space-4);
  }

  .lightbox-nav.next {
    right: var(--space-4);
  }

  .thumbnail-item {
    width: 60px;
    height: 45px;
  }
}
</style>
