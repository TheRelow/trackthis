export interface Page {
  url: string
  title: string
  isRead: boolean
  addedAt: number // unix, секунды
}

export interface Domain {
  name: string
  addedAt: number
}