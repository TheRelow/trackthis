import type { Page, Domain } from '@types/page'
import { addPage, clearPages, getDomains, addDomain } from '@utils/db'

function getDomain(str: string): string {
  const match = str.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)/i)
  return match ? match[1] : '_unknown'
}

/**
 * @description Помечает текущую вкладку как прочитанную
 */
async function markPageAsRead(): Promise<void> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  if (!tab?.url) return

  const addedAt = Math.floor(Date.now() / 1000)

  const domains = await getDomains()
  const currentDomain = getDomain(tab.url)
  if (!domains.some((d: Domain) => d.name === currentDomain)) {
    await addDomain({
      name: currentDomain,
      addedAt,
      icon: tab.favIconUrl
    })
  }

  const page: Page = {
    url: tab.url,
    isRead: true,
    domain: currentDomain,
    title: tab.title ?? tab.url,
    addedAt
  }

  await addPage(page)
}

/**
 * @description Обработчик сообщений
 */
browser.runtime.onMessage.addListener(async (msg) => {
  switch (msg.type) {
    case 'markAsRead':
      await markPageAsRead()
      return
    case 'clearAll':
      await clearPages()
      return
  }
})