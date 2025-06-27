import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getLinks } from '@/app/functions/get-links'
import { unwrapEither } from '@/infra/shared/either'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get all links',
        tags: ['Links'],
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
