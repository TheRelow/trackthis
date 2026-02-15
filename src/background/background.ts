import type { Page, Domain } from '@t/page'
import { addPage, clearPages, getDomains, addDomain } from '@utils/db'

function getDomain(str: string): string {
  const match = str.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)/i)
  return match ? match[1] : '_unknown'
}

/**
 * @description Помечает текущую вкладку как прочитанную
 */
async function markPageAsRead(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (!tab?.url) return

  const addedAt = Math.floor(Date.now() / 1000)

  const domains = await getDomains()
  const currentDomain = getDomain(tab.url)
  let domainId: number | null = null
  const domain: Domain | undefined = domains.find((d: Domain) => d.name === currentDomain)
  domainId = domain === undefined ? await addDomain({
    name: currentDomain,
    addedAt,
    icon: tab.favIconUrl
  }) : domain.id

  const page: Omit<Page, 'id'> = {
    url: tab.url,
    isRead: true,
    domain: domainId,
    title: tab.title ?? tab.url,
    addedAt
  }

  await addPage(page)
}

/**
 * @description Обработчик сообщений
 */
chrome.runtime.onMessage.addListener(async (msg: any) => {
  switch (msg.type) {
    case 'markAsRead':
      await markPageAsRead()
      return
    case 'clearAll':
      await clearPages()
      return
  }
})
