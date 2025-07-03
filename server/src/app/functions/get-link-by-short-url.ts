import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeRight } from '@/infra/shared/either'
import { NotFoundError } from './errors/not-found-error'

const getLinkByShortUrlInput = z.object({
  shortUrl: z.string(),
})

type GetLinkByShortUrlInput = z.input<typeof getLinkByShortUrlInput>

type GetLinkByShortUrlOutput = {
  originalUrl: string
}

export async function getLinkByShortUrl(
  input: GetLinkByShortUrlInput
): Promise<Either<'not_found', GetLinkByShortUrlOutput>> {
  const { shortUrl } = getLinkByShortUrlInput.parse(input)

  const link = await db
    .select({
      originalUrl: schema.links.originalUrl,
      accessCount: schema.links.accessCount,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .limit(1)
    .then(rows => rows[0])

  if (!link) {
    throw new NotFoundError('Url não encontrada')
  }

  await db
    .update(schema.links)
    .set({ accessCount: link.accessCount + 1 })
    .where(eq(schema.links.shortUrl, shortUrl))

  return makeRight({ originalUrl: link.originalUrl })
}
