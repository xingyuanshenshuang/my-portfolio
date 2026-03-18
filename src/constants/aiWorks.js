// AI作品数据
// 注意：资源路径使用相对路径（不带/开头），让Vite自动处理base路径
export const aiWorks = [
  {
    id: 'ai-2.5d-01',
    title: '2.5D风格作品 01',
    category: '2.5D',
    image: 'assets/ai-works/ai-2.5d-01.png',
    description: '使用Midjourney生成的2.5D风格艺术作品',
    prompt: '2.5D illustration style, isometric view, vibrant colors',
    tool: 'Midjourney',
    date: '2026-03'
  },
  {
    id: 'ai-2.5d-02',
    title: '2.5D风格作品 02',
    category: '2.5D',
    image: 'assets/ai-works/ai-2.5d-02.png',
    description: '使用Midjourney生成的2.5D风格艺术作品',
    prompt: '2.5D illustration style, isometric view, vibrant colors',
    tool: 'Midjourney',
    date: '2026-03'
  },
  {
    id: 'ai-anime-01',
    title: '二次元风格作品 01',
    category: '二次元',
    image: 'assets/ai-works/ai-anime-01.png',
    description: '使用Stable Diffusion生成的二次元风格作品',
    prompt: 'Anime style, detailed, high quality',
    tool: 'Stable Diffusion',
    date: '2026-03'
  },
  {
    id: 'ai-realistic-01',
    title: '真实风格作品 01',
    category: '真实',
    image: 'assets/ai-works/ai-realistic-01.png',
    description: '使用Midjourney生成的真实风格作品',
    prompt: 'Photorealistic, detailed, high quality',
    tool: 'Midjourney',
    date: '2026-03'
  },
  {
    id: 'ai-realistic-02',
    title: '真实风格作品 02',
    category: '真实',
    image: 'assets/ai-works/ai-realistic-02.png',
    description: '使用Midjourney生成的真实风格作品',
    prompt: 'Photorealistic, detailed, high quality',
    tool: 'Midjourney',
    date: '2026-03'
  }
]

// AI作品分类
export const aiWorkCategories = [
  { id: 'all', name: '全部' },
  { id: '2.5D', name: '2.5D风格' },
  { id: '二次元', name: '二次元' },
  { id: '真实', name: '真实风格' }
]

// AI工具信息
export const aiTools = [
  {
    name: 'Midjourney',
    description: '强大的AI图像生成工具，擅长创作艺术风格作品',
    url: 'https://www.midjourney.com'
  },
  {
    name: 'Stable Diffusion',
    description: '开源的AI绘画模型，支持本地部署和自定义训练',
    url: 'https://stability.ai'
  },
  {
    name: 'ChatGPT',
    description: 'AI语言模型，辅助编程和创意构思',
    url: 'https://chat.openai.com'
  }
]
