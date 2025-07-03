import { api } from '@/lib/axios'

export interface ExportLinksResponse {
  reportUrl: string
}

export async function exportLinks() {
  const response = await api.post<ExportLinksResponse>('/links/exports')

  return response.data
}
