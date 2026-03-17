/**
 * 图片懒加载指令
 * 使用 IntersectionObserver 实现图片懒加载
 */

// 默认占位图（透明像素）
const defaultPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// 图片加载错误时的占位图
const errorPlaceholder = '/images/image-error.png'

/**
 * 创建懒加载指令
 * @param {Object} options - 配置选项
 * @returns {Object} Vue指令对象
 */
export function createLazyLoadDirective(options = {}) {
  const {
    root = null,
    rootMargin = '50px',
    threshold = 0.01,
    placeholder = defaultPlaceholder,
    errorImage = errorPlaceholder,
  } = options

  // 存储观察器实例
  const observerMap = new WeakMap()

  return {
    mounted(el, binding) {
      // 如果不是img元素，则跳过
      if (el.tagName !== 'IMG') {
        console.warn('v-lazy指令只能用于img元素')
        return
      }

      // 保存原始src
      const src = binding.value || el.getAttribute('data-src')
      if (!src) {
        console.warn('v-lazy指令需要提供图片地址')
        return
      }

      // 设置占位图
      el.src = placeholder
      el.setAttribute('data-src', src)

      // 添加加载样式
      el.classList.add('lazy-image')
      el.classList.add('lazy-image--loading')

      // 创建 IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage(el, src, errorImage)
              observer.unobserve(el)
            }
          })
        },
        {
          root,
          rootMargin,
          threshold,
        }
      )

      // 保存观察器实例
      observerMap.set(el, observer)
      observer.observe(el)
    },

    updated(el, binding) {
      // 如果src发生变化，重新加载
      const newSrc = binding.value
      const oldSrc = el.getAttribute('data-src')

      if (newSrc && newSrc !== oldSrc) {
        el.setAttribute('data-src', newSrc)
        el.classList.add('lazy-image--loading')
        el.classList.remove('lazy-image--loaded')
        el.classList.remove('lazy-image--error')

        // 如果元素已经在视口中，直接加载
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          loadImage(el, newSrc, errorImage)
        }
      }
    },

    unmounted(el) {
      // 清理观察器
      const observer = observerMap.get(el)
      if (observer) {
        observer.disconnect()
        observerMap.delete(el)
      }
    },
  }
}

/**
 * 加载图片
 * @param {HTMLImageElement} el - img元素
 * @param {string} src - 图片地址
 * @param {string} errorImage - 错误占位图
 */
function loadImage(el, src, errorImage) {
  const img = new Image()

  img.onload = () => {
    el.src = src
    el.classList.remove('lazy-image--loading')
    el.classList.add('lazy-image--loaded')
  }

  img.onerror = () => {
    el.src = errorImage
    el.classList.remove('lazy-image--loading')
    el.classList.add('lazy-image--error')
    console.error(`图片加载失败: ${src}`)
  }

  img.src = src
}

/**
 * 默认的懒加载指令配置
 */
export const vLazy = createLazyLoadDirective()

/**
 * 背景图懒加载指令
 */
export const vLazyBg = {
  mounted(el, binding) {
    const src = binding.value
    if (!src) return

    el.style.backgroundImage = 'none'
    el.setAttribute('data-bg-src', src)
    el.classList.add('lazy-bg')
    el.classList.add('lazy-bg--loading')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadBackgroundImage(el, src)
            observer.unobserve(el)
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    observer.observe(el)
  },
}

/**
 * 加载背景图
 * @param {HTMLElement} el - 元素
 * @param {string} src - 背景图地址
 */
function loadBackgroundImage(el, src) {
  const img = new Image()

  img.onload = () => {
    el.style.backgroundImage = `url(${src})`
    el.classList.remove('lazy-bg--loading')
    el.classList.add('lazy-bg--loaded')
  }

  img.onerror = () => {
    el.classList.remove('lazy-bg--loading')
    el.classList.add('lazy-bg--error')
  }

  img.src = src
}
