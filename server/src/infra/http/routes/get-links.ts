import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getLinks } from '@/app/functions/get-links'
import { unwrapEither } from '@/infra/shared/either'

export const getLinksRoute: FastifyPluginAsyncZod = async (server, _opts) => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get all links',
        tags: ['Links'],
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                shortUrl: z.string(),
                originalUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { sortBy, sortDirection } = request.query as {
        sortBy?: 'createdAt'
        sortDirection?: 'asc' | 'desc'
      }

      const result = await getLinks({
        sortBy,
        sortDirection,
      })

      const links = unwrapEither(result)
      console.log(links)

      return reply.status(200).send(links)
    }
  )
}
