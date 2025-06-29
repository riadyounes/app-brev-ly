import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getLinkByShortUrl } from '@/app/functions/get-link-by-short-url'
import { unwrapEither } from '@/infra/shared/either'

// filepath: /Users/riadyounes/Documents/www/ftr/app-brev-ly/server/src/infra/http/routes/get-link-by-short-url.ts

export const getLinkByShortUrlRoute: FastifyPluginAsyncZod = async (
  server,
  _opts
) => {
  server.get(
    '/links/:shortUrl',
    {
      schema: {
        summary: 'Get link by short URL',
        tags: ['Links'],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            originalUrl: z.string(),
          }),
          404: z.object({
            message: z.literal('not_found'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params as { shortUrl: string }

      const result = await getLinkByShortUrl({ shortUrl })

      const data = unwrapEither(result)

      if (data === 'not_found') {
        return reply.status(404).send({ message: 'not_found' })
      }

      return reply.status(200).send(data)
    }
  )
}
