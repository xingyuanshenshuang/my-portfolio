import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const isSystemPreference = ref(true)

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
      isSystemPreference.value = false
    } else {
      isSystemPreference.value = true
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDark.value = mediaQuery.matches

      mediaQuery.addEventListener('change', (e) => {
        if (isSystemPreference.value) {
          isDark.value = e.matches
          applyTheme()
        }
      })
    }
    applyTheme()
  }

  const applyTheme = () => {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    isSystemPreference.value = false
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  const setLightTheme = () => {
    isDark.value = false
    isSystemPreference.value = false
    localStorage.setItem('theme', 'light')
    applyTheme()
  }

  const setDarkTheme = () => {
    isDark.value = true
    isSystemPreference.value = false
    localStorage.setItem('theme', 'dark')
    applyTheme()
  }

  const followSystem = () => {
    isSystemPreference.value = true
    localStorage.removeItem('theme')
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    isDark.value = mediaQuery.matches
    applyTheme()
  }

  watch(isDark, () => {
    applyTheme()
  })

  return {
    isDark,
    isSystemPreference,
    initTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    followSystem
  }
})
