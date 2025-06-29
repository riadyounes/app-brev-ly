import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeRight } from '@/infra/shared/either'

const createLinkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'A URL encurtada deve conter apenas letras, números, hifens ou underscores'
    ),
})

type CreateLinkInput = z.input<typeof createLinkInput>

type CreateLinkOutput = {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: Date
}

export async function createLink(
  input: CreateLinkInput
): Promise<Either<never, CreateLinkOutput>> {
  const { originalUrl, shortUrl } = createLinkInput.parse(input)

  const existing = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortUrl, shortUrl),
  })

  if (existing) {
    throw new Error('Essa URL encurtada já existe')
  }

  const link = await db
    .insert(schema.links)
    .values({
      originalUrl,
      shortUrl,
      accessCount: 0,
    })
    .returning({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })

  return makeRight(link[0])
}
