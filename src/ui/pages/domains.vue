<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Domain } from '@types/page'
import { getDomains } from '@utils/db'

const domains = ref<Domain[]>([])

async function loadDomains() {
  domains.value = await getDomains()
}

onMounted(loadDomains)
</script>

<template>
  <div class="options">
    <h2>📚 Сайты</h2>
    <ul v-if="domains.length">
      <li v-for="d in domains" :key="d.name">
        <a :href="d.name" target="_blank" class="domain-link"><img :src="d.icon" alt="d.name">{{ d.name }}</a>
      </li>
    </ul>
    <p v-else>Пусто(</p>
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
    }
  }
}
</style>