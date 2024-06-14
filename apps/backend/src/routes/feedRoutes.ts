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
      const { sort, limit, agent_type } = req.query;
      return { sort, limit, agent_type };
    },
  );
};

export default feedRoutes;
