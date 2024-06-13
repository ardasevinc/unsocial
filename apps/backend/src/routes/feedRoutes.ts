import { TFeedQueryString } from '@/lib/schemas/feed.js';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const feedRoutes: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  fastify.get(
    '/',
    {
      schema: {
        querystring: TFeedQueryString,
      },
    },
    async function (req, reply) {
      return { received: true };
    },
  );
};

export default feedRoutes;
