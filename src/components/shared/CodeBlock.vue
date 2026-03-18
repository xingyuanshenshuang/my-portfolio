<template>
  <div class="code-block">
    <div class="code-header">
      <span class="code-language">{{ language }}</span>
      <button class="copy-btn" @click="copyCode" :class="{ 'is-copied': isCopied }">
        {{ isCopied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre><code ref="codeRef" :class="`language-${language}`">{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'highlight.js/styles/github-dark.css'

// 按需导入 highlight.js 核心
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'

// 注册常用语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('json', json)

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  }
})

const codeRef = ref(null)
const isCopied = ref(false)

onMounted(() => {
  if (codeRef.value) {
    hljs.highlightElement(codeRef.value)
  }
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
.code-block {
  background-color: #1e1e1e;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-4) 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background-color: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.code-language {
  font-size: var(--text-sm);
  color: #9cdcfe;
  text-transform: uppercase;
  font-weight: var(--font-medium);
}

.copy-btn {
  padding: var(--space-1) var(--space-3);
  background-color: transparent;
  border: 1px solid #3d3d3d;
  border-radius: var(--radius-md);
  color: #cccccc;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background-color: #3d3d3d;
  color: #ffffff;
}

.copy-btn.is-copied {
  background-color: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

pre {
  margin: 0;
  padding: var(--space-4);
  overflow-x: auto;
}

code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

/* 自定义滚动条 */
pre::-webkit-scrollbar {
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: #1e1e1e;
}

pre::-webkit-scrollbar-thumb {
  background: #3d3d3d;
  border-radius: var(--radius-full);
}

pre::-webkit-scrollbar-thumb:hover {
  background: #4d4d4d;
}
</style>
