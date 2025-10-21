import { openDB, DBSchema } from 'idb'
import type { Page } from '../types/page'

export interface Domain {
  name: string
  addedAt: number
}

interface TrackThisDB extends DBSchema {
  pages: {
    key: string // URL
    value: Page
    indexes: { 'by-date': number }
  }
  domains: {
    key: string
    value: Domain
    indexes: { 'by-date': number }
  }
}

const DB_NAME = 'trackthis-db'
const STORE_PAGES = 'pages'
const STORE_DOMAINS = 'domains'
const DB_VERSION = 3

let dbPromise = openDB<TrackThisDB>(DB_NAME, DB_VERSION, {
  async upgrade(db) {
    db.createObjectStore(STORE_PAGES, { keyPath: 'url' }).createIndex('by-date', 'addedAt')
    db.createObjectStore(STORE_DOMAINS, { keyPath: 'name' }).createIndex('by-date', 'addedAt')
  }
})

/**
 * @description Универсальная фабрика CRUD-методов для указанного стора
 * @template T Тип значения, хранимого в store
 * @template K Тип ключа для store
 */
export function createStoreHandlers<T, K = string>(storeName: string) {
  return {
    /**
     * @description Получает все элементы стора
     */
    async getAll(): Promise<T[]> {
      const db = await dbPromise
      return db.getAll(storeName)
    },

    /**
     * @description Получает один элемент по ключу
     */
    async getOne(key: K): Promise<T | undefined> {
      const db = await dbPromise
      return db.get(storeName, key)
    },

    /**
     * @description Добавляет или обновляет элемент
     */
    async putOne(value: T) {
      const db = await dbPromise
      await db.put(storeName, value)
    },

    /**
     * @description Удаляет элемент по ключу
     */
    async deleteOne(key: K) {
      const db = await dbPromise
      await db.delete(storeName, key)
    },

    /**
     * @description Очищает весь store
     */
    async clearAll() {
      const db = await dbPromise
      const tx = db.transaction(storeName, 'readwrite')
      await tx.store.clear()
      await tx.done
    }
  }
}

const pageHandlers = createStoreHandlers<Page>('pages')
const domainHandlers = createStoreHandlers<Domain>('domains') // TODO: сюда бы константы

export const getPages = pageHandlers.getAll
export const addPage = pageHandlers.putOne
export const clearPages = pageHandlers.clearAll

/**
 * @description Фабрика для всех репозиториев в базе
 */
// export async function createRepositories(db?: IDBPDatabase<TrackThisDB>) {
//   return {
//     pages: createStoreHandlers<Page>('pages'),
//     domains: createStoreHandlers<Domain>('domains')
//   }
// }