import { api } from '@/lib/axios'

export interface LinkParams {
  shortUrl: string
}
export async function deleteLink({ shortUrl }: LinkParams) {
  await api.delete(`/links/${shortUrl}`)
}
