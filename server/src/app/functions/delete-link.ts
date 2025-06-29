import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { unwrapEither } from '@/infra/shared/either'
import { createLink } from './create-link'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server, _opts) => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a new link',
        tags: ['Links'],
        body: z.object({
          originalUrl: z.string(),
          shortUrl: z.string().min(3).max(20),
        }),
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body as {
        originalUrl: string
        shortUrl: string
      }

      const result = await createLink({ originalUrl, shortUrl })
      const data = unwrapEither(result)

      return reply.status(201).send(data)
    }
  )
}
