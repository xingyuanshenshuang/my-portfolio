<template>
  <div class="markdown-body" v-html="renderedContent"></div>
</template>

<script setup>
import { computed, onMounted, watch, nextTick } from 'vue'
import 'highlight.js/styles/atom-one-dark.css'

// 按需导入 highlight.js 核心和语言模块
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('sass', scss)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('md', markdown)

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const renderedContent = computed(() => props.content)

// 代码块复制功能
const copyToClipboard = (text) => {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      return true
    })
    .catch((err) => {
      console.error('复制失败:', err)
      return false
    })
}

// 添加代码块复制按钮
const addCopyButtons = () => {
  nextTick(() => {
    const codeBlocks = document.querySelectorAll('.markdown-body pre')

    codeBlocks.forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return

      const code = pre.querySelector('code')
      if (!code) return

      const copyBtn = document.createElement('button')
      copyBtn.className = 'copy-btn'
      copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2"/>
        </svg>
        <span>复制</span>
      `

      const copyBtnContainer = document.createElement('div')
      copyBtnContainer.className = 'copy-btn-container'
      copyBtnContainer.appendChild(copyBtn)

      pre.style.position = 'relative'
      pre.insertBefore(copyBtnContainer, pre.firstChild)

      copyBtn.addEventListener('click', async () => {
        const text = code.textContent
        const success = await copyToClipboard(text)

        if (success) {
          copyBtn.classList.add('copied')
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>已复制</span>
          `

          setTimeout(() => {
            copyBtn.classList.remove('copied')
            copyBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2"/>
              </svg>
              <span>复制</span>
            `
          }, 2000)
        }
      })
    })
  })
}

// 代码高亮
const highlightCode = () => {
  nextTick(() => {
    document.querySelectorAll('.markdown-body pre code').forEach((block) => {
      hljs.highlightElement(block)
    })
    addCopyButtons()
  })
}

onMounted(() => {
  highlightCode()
})

watch(
  () => props.content,
  () => {
    highlightCode()
  }
)
</script>

<style scoped lang="scss">
.markdown-body {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    margin-top: var(--space-8);
    margin-bottom: var(--space-4);
    font-weight: var(--font-bold);
    line-height: var(--leading-tight);
    color: var(--color-text-primary);
  }

  :deep(h1) {
    font-size: var(--text-3xl);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--color-border);
  }

  :deep(h2) {
    font-size: var(--text-2xl);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }

  :deep(h3) {
    font-size: var(--text-xl);
  }

  :deep(h4) {
    font-size: var(--text-lg);
  }

  :deep(h5),
  :deep(h6) {
    font-size: var(--text-base);
  }

  :deep(p) {
    margin-bottom: var(--space-4);
  }

  :deep(a) {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-secondary);
    }
  }

  :deep(ul),
  :deep(ol) {
    margin-bottom: var(--space-4);
    padding-left: var(--space-6);
  }

  :deep(ul) {
    list-style-type: disc;
  }

  :deep(ol) {
    list-style-type: decimal;
  }

  :deep(li) {
    margin-bottom: var(--space-2);
  }

  :deep(code) {
    font-family: var(--font-mono);
    font-size: 0.875em;
    padding: 0.2em 0.4em;
    background-color: var(--color-bg-code);
    border-radius: var(--radius-sm);
    color: var(--color-text-code);
    line-height: 1.5;
  }

  :deep(pre) {
    margin-bottom: var(--space-4);
    padding: var(--space-4);
    background-color: var(--color-bg-code-block);
    border-radius: var(--radius-lg);
    overflow-x: auto;
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--transition-fast);

    &:hover {
      box-shadow: var(--shadow-md);
    }

    code {
      padding: 0;
      background-color: transparent;
      color: inherit;
      font-size: var(--text-sm);
      line-height: 1.7;
      font-family: var(--font-mono);
    }
  }

  :deep(blockquote) {
    margin-bottom: var(--space-4);
    padding: var(--space-4) var(--space-6);
    border-left: 4px solid var(--color-accent);
    background-color: var(--color-bg-secondary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;

    p:last-child {
      margin-bottom: 0;
    }
  }

  :deep(table) {
    width: 100%;
    margin-bottom: var(--space-4);
    border-collapse: collapse;
    overflow: hidden;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }

  :deep(th),
  :deep(td) {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    text-align: left;
  }

  :deep(th) {
    background-color: var(--color-bg-secondary);
    font-weight: var(--font-semibold);
  }

  :deep(tr:nth-child(even)) {
    background-color: var(--color-bg-secondary);
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    margin: var(--space-4) 0;
    box-shadow: var(--shadow-md);
    transition: box-shadow var(--transition-fast);

    &:hover {
      box-shadow: var(--shadow-lg);
    }
  }

  :deep(hr) {
    margin: var(--space-8) 0;
    border: none;
    border-top: 1px solid var(--color-border);
  }

  :deep(strong) {
    font-weight: var(--font-bold);
    color: var(--color-text-primary);
  }

  :deep(em) {
    font-style: italic;
  }

  :deep(del) {
    text-decoration: line-through;
    color: var(--color-text-muted);
  }
}

// 复制按钮样式
:deep(.copy-btn-container) {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

:deep(pre:hover .copy-btn-container) {
  opacity: 1;
}

:deep(.copy-btn) {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: #abb2bf;
  background-color: #282c34;
  border: 1px solid #3e4451;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: #3e4451;
    border-color: #4b5363;
    color: #c9d1d9;
  }

  &.copied {
    background-color: rgba(16, 185, 129, 0.1);
    border-color: var(--color-success);
    color: var(--color-success);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

// Atom One Dark 主题优化
:deep(.hljs) {
  display: block;
  overflow-x: auto;
  padding: 0;
  background: transparent;
  color: #abb2bf;
}

:deep(.hljs-comment),
:deep(.hljs-quote) {
  color: #5c6370;
  font-style: italic;
}

:deep(.hljs-keyword),
:deep(.hljs-selector-tag),
:deep(.hljs-literal),
:deep(.hljs-section),
:deep(.hljs-link) {
  color: #c678dd;
}

:deep(.hljs-string),
:deep(.hljs-title),
:deep(.hljs-name),
:deep(.hljs-type),
:deep(.hljs-attribute),
:deep(.hljs-symbol),
:deep(.hljs-bullet),
:deep(.hljs-addition),
:deep(.hljs-variable),
:deep(.hljs-template-tag),
:deep(.hljs-template-variable) {
  color: #98c379;
}

:deep(.hljs-number),
:deep(.hljs-meta) {
  color: #d19a66;
}

:deep(.hljs-built_in),
:deep(.hljs-title.class_),
:deep(.hljs-class .hljs-title) {
  color: #e6c07b;
}

:deep(.hljs-attr),
:deep(.hljs-variable.language_) {
  color: #d19a66;
}

:deep(.hljs-function),
:deep(.hljs-title.function_),
:deep(.hljs-name.function_) {
  color: #61afef;
}

:deep(.hljs-selector-attr),
:deep(.hljs-selector-pseudo),
:deep(.hljs-doctag) {
  color: #c678dd;
}

:deep(.hljs-subst) {
  color: #abb2bf;
}

:deep(.hljs-deletion) {
  color: #e06c75;
}

:deep(.hljs-emphasis) {
  font-style: italic;
}

:deep(.hljs-strong) {
  font-weight: bold;
}

:deep(.hljs-regexp) {
  color: #56b6c2;
}

// 深色模式适配
[data-theme='dark'] {
  :deep(.hljs) {
    color: #abb2bf;
  }

  :deep(pre) {
    background-color: #282c34;
    border-color: #3e4451;
  }
}

// 浅色模式适配（使用 Atom One Light 主题）
:not([data-theme='dark']) {
  :deep(.hljs) {
    color: #383a42;
  }

  :deep(.hljs-comment),
  :deep(.hljs-quote) {
    color: #a0a1a7;
    font-style: italic;
  }

  :deep(.hljs-keyword),
  :deep(.hljs-selector-tag),
  :deep(.hljs-literal),
  :deep(.hljs-section),
  :deep(.hljs-link) {
    color: #a626a4;
  }

  :deep(.hljs-string),
  :deep(.hljs-title),
  :deep(.hljs-name),
  :deep(.hljs-type),
  :deep(.hljs-attribute),
  :deep(.hljs-symbol),
  :deep(.hljs-bullet),
  :deep(.hljs-addition),
  :deep(.hljs-variable),
  :deep(.hljs-template-tag),
  :deep(.hljs-template-variable) {
    color: #50a14f;
  }

  :deep(.hljs-number),
  :deep(.hljs-meta) {
    color: #986801;
  }

  :deep(.hljs-built_in),
  :deep(.hljs-title.class_),
  :deep(.hljs-class .hljs-title) {
    color: #c18401;
  }

  :deep(.hljs-attr),
  :deep(.hljs-variable.language_) {
    color: #986801;
  }

  :deep(.hljs-function),
  :deep(.hljs-title.function_),
  :deep(.hljs-name.function_) {
    color: #4078f2;
  }

  :deep(.hljs-selector-attr),
  :deep(.hljs-selector-pseudo),
  :deep(.hljs-doctag) {
    color: #a626a4;
  }

  :deep(.hljs-subst) {
    color: #383a42;
  }

  :deep(.hljs-deletion) {
    color: #e45649;
  }

  :deep(.hljs-regexp) {
    color: #0184bc;
  }

  :deep(pre) {
    background-color: #fafafa;
    border-color: #e5e7eb;
  }

  :deep(.copy-btn) {
    color: #383a42;
    background-color: #f0f0f0;
    border-color: #e0e0e0;

    &:hover {
      background-color: #e0e0e0;
      border-color: #d0d0d0;
      color: #383a42;
    }
  }
}
</style>
