import type { ReadPage } from '../types/page'

/**
 * @description Модуль работы с browser.storage.local
 * Экспортирует функции для получения, добавления и очищения списка
 */

/**
 * @description Возвращает список прочитанных страниц
 */
export async function getReadPages(): Promise<ReadPage[]> {
  const res = await browser.storage.local.get('readPages')
  return res.readPages || []
}

/**
 * @description Добавляет страницу в список, если её там нет
 * @param page объект страницы
 */
export async function addReadPage(page: ReadPage): Promise<void> {
  const pages = await getReadPages()
  const exists = pages.some(p => p.url === page.url)
  if (exists) return
  pages.push(page)
  await browser.storage.local.set({ readPages: pages })
}

/**
 * @description Полностью очищает список
 */
export async function clearReadPages(): Promise<void> {
  await browser.storage.local.remove('readPages')
}
