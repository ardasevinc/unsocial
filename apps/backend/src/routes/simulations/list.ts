import type { FastifyRequest, FastifyReply } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

const opts = {};

const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  return { helloworld: true };
};

export default {
  opts,
  handler,
};
