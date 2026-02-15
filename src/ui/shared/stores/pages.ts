import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { pageHandlers, domainHandlers, pagePackHandlers } from '@utils/db'
import type { Page, Domain, PagePack } from '@t/page'

type StoreType = 'pages' | 'domains' | 'pagePacks'

type StoreMap = {
  pages: Page
  domains: Domain
  pagePacks: PagePack
}

type HandlersMap = {
  pages: typeof pageHandlers
  domains: typeof domainHandlers
  pagePacks: typeof pagePackHandlers
}

const handlersMap: HandlersMap = {
  pages: pageHandlers,
  domains: domainHandlers,
  pagePacks: pagePackHandlers
}

export const usePagesStore = defineStore('trackThis', () => {
  // --- состояние ---
  const pages = ref<Page[]>([])
  const domains = ref<Domain[]>([])
  const pagePacks = ref<PagePack[]>([])

  // мапа состояния с правильными типами
  type StateMap = {
    pages: Ref<Page[]>
    domains: Ref<Domain[]>
    pagePacks: Ref<PagePack[]>
  }

  const stateMap: StateMap = {
    pages,
    domains,
    pagePacks
  }

  // --- универсальные методы ---
  /**
   * Загружает все записи из стора и записывает их в stateMap
   * @param store имя стора
   * @param filter опциональный фильтр
   */
  async function fetchAll<K extends StoreType>(store: K, filter?: Partial<StoreMap[K]>):Promise<StoreMap[K][]> {
    const result: any = await handlersMap[store].getAll(filter)
    return stateMap[store].value = result //TODO: че это?
  }

  async function fetchOne<K extends StoreType>(store: K, id: number): Promise<StoreMap[K] | undefined> {
    return await handlersMap[store].getOne(id) as StoreMap[K] | undefined
  }

  async function addOne<K extends StoreType>(store: K, value: Partial<StoreMap[K]>) {
    const id = await handlersMap[store].putOne(value)
    await fetchAll(store)
    return id
  }

  async function deleteOne<K extends StoreType>(store: K, id: number) {
    await handlersMap[store].deleteOne(id)
    await fetchAll(store)
  }

  async function clearAll<K extends StoreType>(store: K) {
    await handlersMap[store].clearAll()
    stateMap[store].value = []
  }

  return {
    // state
    pages,
    domains,
    pagePacks,

    // actions
    fetchAll,
    fetchOne,
    addOne,
    deleteOne,
    clearAll
  }
})
