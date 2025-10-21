import type { Page } from '../types/page'
import { addPage, clearPages } from '../utils/db'

console.log('zxcxzcxzczxc')

/**
 * @description Помечает текущую вкладку как прочитанную
 */
async function markPageAsRead(): Promise<void> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  if (!tab?.url) return

  const page: Page = {
    url: tab.url,
    isRead: true,
    title: tab.title ?? tab.url,
    addedAt: Math.floor(Date.now() / 1000)
  }

  await addPage(page)
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
      await clearPages()
      return
  }
})