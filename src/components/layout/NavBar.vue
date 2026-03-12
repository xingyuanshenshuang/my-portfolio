<template>
  <header class="navbar" :class="{ 'is-scrolled': isScrolled }">
    <div class="container navbar-container">
      <router-link to="/" class="logo">
        <span class="logo-text">星渊</span>
      </router-link>

      <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'is-active': $route.path === item.path }"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <div class="nav-actions">
        <button class="theme-toggle" @click="toggleTheme" aria-label="切换主题">
          <span v-if="isDark" class="theme-icon">☀️</span>
          <span v-else class="theme-icon">🌙</span>
        </button>

        <button
          class="menu-toggle"
          :class="{ 'is-open': isMenuOpen }"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="切换菜单"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '项目', path: '/projects' },
  { name: 'AI作品', path: '/ai-works' },
  { name: '博客', path: '/blog' },
  { name: '关于我', path: '/about' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  themeStore.initTheme()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background-color: transparent;
  transition: background-color var(--transition-normal), box-shadow var(--transition-normal);
}

.navbar.is-scrolled {
  background-color: var(--color-bg-secondary);
  box-shadow: var(--shadow-md);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  text-decoration: none;
}

.logo-text {
  background: linear-gradient(135deg, var(--color-accent), var(--color-success));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.nav-link {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width var(--transition-fast);
}

.nav-link:hover::after,
.nav-link.is-active::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  border-color: var(--color-accent);
  transform: scale(1.05);
}

.theme-icon {
  font-size: var(--text-lg);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  gap: 6px;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.menu-toggle.is-open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-bg-secondary);
    flex-direction: column;
    justify-content: flex-start;
    padding: var(--space-8);
    gap: var(--space-6);
    transform: translateX(100%);
    transition: transform var(--transition-normal);
  }

  .nav-menu.is-open {
    transform: translateX(0);
  }

  .nav-link {
    font-size: var(--text-xl);
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
