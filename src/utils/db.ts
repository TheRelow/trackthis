import { openDB, DBSchema } from 'idb'
import type { Page, Domain, PagePack } from '@t/page'

interface TrackThisDB extends DBSchema {
  pages: {
    key: number
    value: Page
    indexes: { 'by-date': number }
  }
  domains: {
    key: number
    value: Domain
    indexes: { 'by-date': number }
  }
  pagePacks: {
    key: number
    value: PagePack
    indexes: { 'by-date': number }
  }
}

const DB_NAME = 'trackthis-db'
const DB_VERSION = 3

export const STORE_PAGES = 'pages'
export const STORE_DOMAINS = 'domains'
export const STORE_PAGEPACKS = 'pagePacks'

type StoreName = typeof STORE_PAGES | typeof STORE_DOMAINS | typeof STORE_PAGEPACKS

let dbPromise = openDB<TrackThisDB>(DB_NAME, DB_VERSION, {
  async upgrade(db) {
    db.createObjectStore(STORE_PAGES, { keyPath: 'id', autoIncrement: true }).createIndex('by-date', 'addedAt')
    db.createObjectStore(STORE_DOMAINS, { keyPath: 'id', autoIncrement: true }).createIndex('by-date', 'addedAt')
    db.createObjectStore(STORE_PAGEPACKS, { keyPath: 'id', autoIncrement: true }).createIndex('by-date', 'addedAt')
  }
})

type StoreMap = {
  pages: Page
  domains: Domain
  pagePacks: PagePack
}

/**
 * Возвращает набор обработчиков для работы с хранилищем
 * @param storeName имя стора
 */
export function createStoreHandlers<K extends StoreName>(storeName: K) {
  type Value = StoreMap[K]
  type Key = number

  /**
   * Проверяет соответствие записи переданному фильтру
   * @param item запись из IndexedDB
   * @param filter поля, по которым нужно фильтровать
   */
  const matchFilter = (item: Value, filter: Partial<Value>) => {
    for (const key in filter) {
      const expected = filter[key]
      const actual = item[key]

      switch (true) {
        case expected === undefined:
          continue
        case actual !== expected:
          return false
      }
    }

    return true
  }

  return {
    /**
     * Получает записи. Если фильтр пуст — простой getAll без курсоров.
     * @param filter объект вида { поле: значение }
     */
    async getAll(filter?: Partial<Value>): Promise<Value[]> {
      const db = await dbPromise

      // есть ли реальные поля для фильтрации
      let hasFilter = false
      if (filter) {
        for (const _ in filter) {
          hasFilter = true
          break
        }
      }

      // сценарий: нет фильтра или он пустой → просто вернуть всё
      switch (true) {
        case !filter:
          const result: any = db.getAll(storeName) //TODO: че это?
          return result
        case !hasFilter:
          const result1: any = db.getAll(storeName) //TODO: че это?
          return result1
      }

      // сценарий: есть фильтрация → курсор
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.store
      const result: Value[] = []

      let cursor = await store.openCursor()

      while (cursor) {
        const value = cursor.value

        switch (true) {
          case matchFilter(value, filter):
            result.push(value)
        }

        cursor = await cursor.continue()
      }

      return result
    },

    /**
     * Получить одну запись по ключу
     */
    async getOne(key: Key): Promise<Value | undefined> {
      const db = await dbPromise
      return db.get(storeName, key)
    },

    /**
     * Добавляет или обновляет запись
     */
    async putOne(value: Partial<Value>): Promise<Key> {
      const db = await dbPromise
      return db.put(storeName, value as Value)
    },

    /**
     * Удаляет запись
     */
    async deleteOne(key: Key) {
      const db = await dbPromise
      await db.delete(storeName, key)
    },

    /**
     * Полная очистка хранилища
     */
    async clearAll() {
      const db = await dbPromise
      const tx = db.transaction(storeName, 'readwrite')
      await tx.store.clear()
      await tx.done
    }
  }
}

// --- Хендлеры ---
export const pageHandlers = createStoreHandlers(STORE_PAGES)
export const pagePackHandlers = createStoreHandlers(STORE_PAGEPACKS)
export const domainHandlers = createStoreHandlers(STORE_DOMAINS)

// удобные алиасы
export const getPages = pageHandlers.getAll
export const getPage = pageHandlers.getOne
export const addPage = pageHandlers.putOne
export const clearPages = pageHandlers.clearAll

export const getDomains = domainHandlers.getAll
export const getDomain = domainHandlers.getOne
export const addDomain = domainHandlers.putOne
