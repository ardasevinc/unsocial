import type { FastifyRequest, FastifyReply, RouteHandlerMethod } from 'fastify';

const opts = {};

const handler: RouteHandlerMethod = async (request, reply) => {
  return { key: request.server.config.DEV_ANTHROPIC_API_KEY };
};

export default {
  opts,
  handler,
};
