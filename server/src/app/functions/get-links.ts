import { asc, desc } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeRight } from '@/infra/shared/either'

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

export async function getLinks(
  input: GetLinksInput
): Promise<Either<never, GetLinksOutput>> {
  const { sortBy, sortDirection } = getLinksInput.parse(input)

  const links = await db
    .select({
      id: schema.links.id,
      shortUrl: schema.links.shortUrl,
      originalUrl: schema.links.originalUrl,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
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

  return makeRight({ links })
}
