<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import type {Domain, Page} from "@t/page";
import {usePagesStore} from "@/shared/stores/pages";
import PagesList from "@/widgets/PagesList.vue";

const pagesStore = usePagesStore()
const route = useRoute()
const id = computed(() => route.params.id)
const domain = ref<Domain | null>(null)
const pages = ref<Page[]>([])
onMounted(async () => {
  domain.value = await pagesStore.fetchOne('domains', +id.value) || null
  pages.value = await pagesStore.fetchAll('pages', { domain: +id.value }) || []
})
</script>

<template>
  detail
  <PagesList v-if="pages.length" :pages="pages" />
</template>

<style scoped lang="scss">

</style>
