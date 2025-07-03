import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeRight } from '@/infra/shared/either'
import { NotFoundError } from './errors/not-found-error'

const deleteLinkInput = z.object({
  shortUrl: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

type DeleteLinkOutput = {
  shortUrl: string
}

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<never, DeleteLinkOutput>> {
  const { shortUrl } = deleteLinkInput.parse(input)

  const existing = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortUrl, shortUrl),
  })

  if (!existing) {
    throw new NotFoundError('Essa URL encurtada não existe')
  }

  await db.delete(schema.links).where(eq(schema.links.shortUrl, shortUrl))

  return makeRight({ shortUrl })
}
