import { api } from '@/lib/axios'

export interface CreateLinkRequest {
  shortUrl: string
  originalUrl: string
}

export async function createLink({ shortUrl, originalUrl }: CreateLinkRequest) {
  await api.post('/links', { shortUrl, originalUrl })
}
