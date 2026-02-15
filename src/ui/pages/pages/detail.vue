<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { usePagesStore } from "@/shared/stores/pages";
import type { Page } from '@t/page'
import TextEditor from "@/shared/TextEditor.vue";

const pagesStore = usePagesStore()
const route = useRoute()
const id = computed(() => route.params.id)
const page = ref<Page | null>(null)
onMounted(async () => {
  page.value = await pagesStore.fetchOne('pages', +id.value) || null
})

function save() {
  pagesStore.addOne('pages', toRaw(page.value) as Page)
}
</script>

<template>
  <div v-if="page">
    <a :href="page.url" target="_blank">{{ page.title }}</a>
    <TextEditor v-model="page.note" />
    <button @click="save">save</button>
  </div>
</template>

<style scoped lang="scss">

</style>
