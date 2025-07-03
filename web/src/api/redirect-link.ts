import { api } from '@/lib/axios'

export interface RedirectLinkResponse {
  originalUrl: string
}

export interface RedirectLinkParams {
  shortUrl: string
}
export async function redirectLink({ shortUrl }: RedirectLinkParams) {
  const response = await api.get<RedirectLinkResponse>(`/links/${shortUrl}`)

  return response.data
}
