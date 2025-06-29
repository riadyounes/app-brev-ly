import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { deleteLink } from '@/app/functions/delete-link'
import { unwrapEither } from '@/infra/shared/either'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server, _opts) => {
  server.delete(
    '/links2/:shortUrl',
    {
      schema: {
        summary: 'Delete a link',
        tags: ['Links'],
        params: z.object({
          shortUrl: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params as { shortUrl: string }

      const result = await deleteLink({ shortUrl })
      const data = unwrapEither(result)

      return reply.status(200).send(data)
    }
  )
}
