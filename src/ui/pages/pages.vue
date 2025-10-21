<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Page } from '../../types/page'
import { getPages, clearPages } from '../../utils/db'

const pages = ref<Page[]>([])

async function loadPages() {
  pages.value = await getPages()
}

async function clearAll() {
  await clearPages()
  pages.value = []
}

function formatTime(unixSec: number): string {
  return new Date(unixSec * 1000).toLocaleString()
}

onMounted(loadPages)
</script>

<template>
  <div class="options">
    <h2>📚 Прочитанные страницы</h2>
    <ul v-if="pages.length">
      <li v-for="page in pages" :key="page.url">
        <a :href="page.url" target="_blank">{{ page.title }}</a>
        <time>{{ formatTime(page.addedAt) }}</time>
      </li>
    </ul>
    <p v-else>Нет сохранённых страниц</p>
    <button @click="clearAll">Очистить всё</button>
  </div>
</template>

<style scoped lang="scss">
.options {
  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 10px 0;
      line-height: 1.5;

      a {
        color: #1976d2;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      time {
        display: block;
        font-size: 0.9em;
        color: #888;
      }
    }
  }

  button {
    margin-top: 15px;
    padding: 8px 12px;
    border: none;
    background: #c62828;
    color: white;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: #a91c1c;
    }
  }
}
</style>