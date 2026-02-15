<script setup lang="ts">
import {ref, onMounted} from 'vue'
import type {Domain, Page} from '@t/page'
import {getDomain} from "@utils/db";
const domains = ref<Record<string, Domain>>({})

const props = defineProps<{
  pages: Page[]
}>()

function formatTime(unixSec: number): string {
  return new Date(unixSec * 1000).toLocaleString()
}

async function loadDomains() {
  const domainEntries = await Promise.all(
      [...new Set(props.pages.map(p => p.domain))].map(async (id) => {
        const domain = await getDomain(id)
        return domain ? [domain.id, domain] as const : null
      })
  )

  domains.value = Object.fromEntries(
      domainEntries.filter((entry): entry is readonly [number, Domain] => entry != null)
  )
}

onMounted(loadDomains)
</script>

<template>
  <ul>
    <li v-for="page in pages" :key="page.url">
      <router-link :to="`/pages/${page.id}`" class="domain-link"><img :src="domains?.[page.domain]?.icon" :alt="page.title">{{ page.title }}</router-link>
      <time>{{ formatTime(page.addedAt) }}</time>
    </li>
  </ul>
</template>

<style scoped lang="scss">
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
</style>
