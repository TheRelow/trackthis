<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Domain, Page} from '@types/page'
import {clearPages, getDomain, getPages} from '@utils/db'

const pages = ref<Page[]>([])
const domains = ref<Record<string, Domain>>({})

async function loadPages() {
  pages.value = await getPages()

  const domainEntries = await Promise.all(
    [...new Set(pages.value.map(p => p.domain))].map(async (name) => {
      const domain = await getDomain(name)
      return domain ? [domain.name, domain] as const : null
    })
  )

  domains.value = Object.fromEntries(
    domainEntries.filter((entry): entry is readonly [string, Domain] => entry != null)
  )
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
    <div v-if="pages.length">
      <ul>
        <li v-for="page in pages" :key="page.url">
          <a :href="page.url" target="_blank" class="domain-link"><img :src="domains?.[page.domain]?.icon" :alt="page.title">{{ page.title }}</a>
          <time>{{ formatTime(page.addedAt) }}</time>
        </li>
      </ul>
      <button @click="clearAll">Очистить всё</button>
    </div>
    <p v-else>Нет сохранённых страниц</p>
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
        padding-left: 28px;
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