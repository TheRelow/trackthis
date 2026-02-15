<script setup lang="ts">
import {defineModel, onMounted, onBeforeUnmount, watch} from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Markdown } from '@tiptap/markdown'
import StarterKit from '@tiptap/starter-kit'

const model = defineModel<string>({
  default: ''
})
let editor = useEditor({
  content: model.value,
  extensions: [StarterKit, Markdown],
  onUpdate: (value) => {
    // HTML
    model.value = editor.value?.getHTML() as string

    // JSON
    // model.value = editor.value?.getJSON()
  },
})

onMounted(() => {
  watch(() => model.value, () => {
    // HTML
    const isSame = editor.value?.getHTML() === model.value

    // JSON
    // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

    if (isSame) {
      return
    }
    editor.value?.commands.setContent(model.value as string)
  }, {
    immediate: true,
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <editor-content :editor="editor" />
</template>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1em;
    margin: 0.6em;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin: 1em 0 0.4em;
    text-wrap: pretty;
  }

  h1 {
    font-size: 2.375em;
  }

  h2 {
    font-size: 2em;
  }

  h3 {
    font-size: 1.7em;
  }

  h4 {
    font-size: 1.4em;
  }

  h5 {
    font-size: 1.1em;
  }

  h6 {
    font-size: 0.8em;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
    color: inherit;
  }
}
</style>
