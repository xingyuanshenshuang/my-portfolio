import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/main.scss'

// 导入懒加载指令
import { vLazy, vLazyBg } from './directives/lazyLoad.js'

const app = createApp(App)

// 注册全局指令
app.directive('lazy', vLazy)
app.directive('lazy-bg', vLazyBg)

app.use(createPinia())
app.use(router)

app.mount('#app')
