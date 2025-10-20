import type { ReadPage } from '../types/page'
import { addReadPage, clearReadPages } from '../utils/db'

console.log('zxcxzcxzczxc')

/**
 * @description Помечает текущую вкладку как прочитанную
 */
async function markPageAsRead(): Promise<void> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  if (!tab?.url) return

  const page: ReadPage = {
    url: tab.url,
    isRead: true,
    title: tab.title ?? tab.url,
    addedAt: Math.floor(Date.now() / 1000)
  }

  await addReadPage(page)
}

/**
 * @description Обработчик сообщений
 */
browser.runtime.onMessage.addListener(async (msg) => {
  console.log('qweqwewq')
  switch (msg.type) {
    case 'markAsRead':
      await markPageAsRead()
      return
    case 'clearAll':
      await clearReadPages()
      return
  }
})