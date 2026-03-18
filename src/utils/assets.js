/**
 * 资源路径工具函数
 * 用于处理 GitHub Pages 部署时的资源路径问题
 */

// 根据环境判断基础路径
const getBaseUrl = () => {
  // 生产环境使用配置的 base 路径
  if (import.meta.env.PROD) {
    return '/my-portfolio'
  }
  // 开发环境使用空路径
  return ''
}

/**
 * 获取完整的资源路径
 * @param {string} path - 资源路径，如 '/assets/profile/avatar.png'
 * @returns {string} - 完整的资源路径
 */
export const getAssetUrl = (path) => {
  const baseUrl = getBaseUrl()
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}

/**
 * 批量处理资源路径
 * @param {Object} obj - 包含资源路径的对象
 * @param {string[]} keys - 需要处理的字段名数组
 * @returns {Object} - 处理后的对象
 */
export const processAssetUrls = (obj, keys) => {
  const result = { ...obj }
  keys.forEach((key) => {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key] = result[key].map((url) => getAssetUrl(url))
      } else {
        result[key] = getAssetUrl(result[key])
      }
    }
  })
  return result
}
