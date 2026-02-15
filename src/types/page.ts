export interface Page {
  id: number
  url: string
  title: string
  note?: string
  domain: number
  isRead: boolean
  addedAt: number // unix, секунды
}

export interface Domain {
  id: number
  name: string
  addedAt: number
  icon: string
}

export interface PagePack {
  id: number
  title: string
  pageIds: number[]
  addedAt: number
}
