export interface Page {
  url: string
  title: string
  domain: string
  isRead: boolean
  addedAt: number // unix, секунды
}

export interface Domain {
  name: string
  addedAt: number
  icon: string
}

export interface PagePack {
  id: number
  title: string
}