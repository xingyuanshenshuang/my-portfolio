// 技能清单
export const skills = [
  {
    category: '前端框架',
    items: [
      { name: 'Vue 2/3', level: 90, description: '熟练掌握Vue2 Options API和Vue3 Composition API' },
      { name: 'Vue Router', level: 85, description: '路由配置、导航守卫、动态路由' },
      { name: 'Pinia/Vuex', level: 80, description: '状态管理、模块化、持久化' }
    ]
  },
  {
    category: '前端基础',
    items: [
      { name: 'HTML5/CSS3', level: 90, description: '语义化标签、Flex/Grid布局、动画' },
      { name: 'JavaScript/ES6+', level: 85, description: '异步编程、模块化、新特性' },
      { name: 'TypeScript', level: 70, description: '类型系统、接口定义、泛型' }
    ]
  },
  {
    category: 'UI框架',
    items: [
      { name: 'Element Plus', level: 85, description: '后台管理系统UI组件' },
      { name: 'Vant', level: 80, description: '移动端UI组件库' },
      { name: 'SCSS/Less', level: 75, description: 'CSS预处理器、变量、混入' }
    ]
  },
  {
    category: '工具链',
    items: [
      { name: 'Vite', level: 80, description: '构建工具、配置优化' },
      { name: 'Git', level: 85, description: '版本控制、分支管理' },
      { name: 'ESLint/Prettier', level: 75, description: '代码规范、格式化' }
    ]
  },
  {
    category: 'AI工具',
    items: [
      { name: 'Midjourney', level: 75, description: 'AI图像生成、提示词工程' },
      { name: 'Stable Diffusion', level: 70, description: '本地AI绘画、模型训练' },
      { name: 'ChatGPT', level: 80, description: 'AI辅助编程、文案创作' }
    ]
  }
]

// 技能标签（用于展示）
export const skillTags = [
  'Vue 2/3', 'Vue Router', 'Pinia', 'Vuex',
  'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SCSS',
  'Element Plus', 'Vant', 'Vite',
  'Git', 'ESLint', 'Prettier',
  'Midjourney', 'Stable Diffusion', 'AI创作'
]

// 工作经历
export const experiences = [
  {
    id: 1,
    period: '2024 - 至今',
    title: '前端开发学习者',
    company: '自学阶段',
    description: '系统学习Vue生态，完成多个实战项目，包括智慧商城、大事件管理系统等。探索AI工具在前端开发中的应用。',
    highlights: ['完成Vue2/Vue3项目实战', '掌握前后端分离开发', '学习AI辅助编程']
  },
  {
    id: 2,
    period: '2023 - 2024',
    title: '编程入门',
    company: '基础学习',
    description: '学习HTML、CSS、JavaScript基础知识，建立编程思维和前端开发基础。',
    highlights: ['掌握前端三剑客', '理解编程核心概念', '完成基础练习项目']
  }
]

// 教育背景
export const education = [
  {
    id: 1,
    period: '2020 - 2024',
    degree: '本科',
    school: '某某大学',
    major: '计算机相关专业',
    description: '系统学习计算机基础知识，培养编程能力和问题解决能力。'
  }
]
