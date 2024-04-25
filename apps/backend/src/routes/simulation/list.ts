import type { FastifyRequest, FastifyReply } from 'fastify';

const opts = {};

const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  return { helloworld: true };
};

export default {
  opts,
  handler,
};
