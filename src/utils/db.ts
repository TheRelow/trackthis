import { openDB, DBSchema } from 'idb'
import type { ReadPage } from '../types/page'

interface TrackThisDB extends DBSchema {
  readPages: {
    key: string // URL
    value: ReadPage
    indexes: { 'by-date': number }
  }
}

const DB_NAME = 'trackthis-db'
const STORE_NAME = 'readPages'
const DB_VERSION = 1

let dbPromise = openDB<TrackThisDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    const store = db.createObjectStore(STORE_NAME, { keyPath: 'url' })
    store.createIndex('by-date', 'addedAt')
  }
})

/**
 * @description Получает все страницы
 */
export async function getReadPages(): Promise<ReadPage[]> {
  const db = await dbPromise
  return db.getAll(STORE_NAME)
}

/**
 * @description Добавляет страницу
 */
export async function addReadPage(page: ReadPage) {
  console.log('awdawd')
  const db = await dbPromise
  console.log('db', db)
  await db.put(STORE_NAME, page)
}

/**
 * @description Удаляет все
 */
export async function clearReadPages() {
  const db = await dbPromise
  const tx = db.transaction(STORE_NAME, 'readwrite')
  await tx.store.clear()
  await tx.done
}
