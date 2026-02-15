<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Page} from '@t/page'
import {getPages} from '@utils/db'
import PagesList from "@/widgets/PagesList.vue";

const pages = ref<Page[]>([])

onMounted(async () => {
  pages.value = await getPages()
})
</script>

<template>
  <div class="options">
    <h2>📚 Прочитанные страницы</h2>
    <PagesList v-if="pages.length" :pages="pages" />
    <p v-else>Нет сохранённых страниц</p>
  </div>
</template>

<style scoped lang="scss">
</style>
