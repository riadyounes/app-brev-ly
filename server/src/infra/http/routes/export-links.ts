import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { exportLinks } from '@/app/functions/export-links'
import { unwrapEither } from '@/infra/shared/either'

export const exportLinksRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/links/exports',
    {
      schema: {
        summary: 'Export links',
        description: 'Export links to a CSV file',
        tags: ['Links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z
            .object({
              reportUrl: z.string(),
            })
            .describe('OK'),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query as { searchQuery?: string }

      const result = await exportLinks({
        searchQuery,
      })

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({ reportUrl })
    }
  )
}
