import { api } from '@/lib/axios'

export interface GetLinksResponse {
  links: {
    id: string
    shortUrl: string
    originalUrl: string
    accessCount: number
    createdAt: Date | null
  }[]
}
export async function getLinks() {
  const response = await api.get<GetLinksResponse>('/links')

  return response.data
}