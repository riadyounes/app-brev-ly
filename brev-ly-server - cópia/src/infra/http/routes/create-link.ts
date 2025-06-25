import { asc, desc } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const getLinksInput = z.object({
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
})

type GetLinksInput = z.input<typeof getLinksInput>

type GetLinksOutput = {
  links: {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }[]
}

export function getLinks(input: GetLinksInput) {
  const { sortBy, sortDirection } = getLinksInput.parse(input)

  db.select()
    .from(schema.links)
    .orderBy(fields => {
      if (sortBy && sortDirection === 'asc') {
        return asc(fields[sortBy])
      }

      if (sortBy && sortDirection === 'desc') {
        return desc(fields[sortBy])
      }

      return desc(fields.id)
    })
}
