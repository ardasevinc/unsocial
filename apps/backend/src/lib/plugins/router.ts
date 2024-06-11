import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import simulationRoutes from '@/routes/simulationRoutes.js';

const registerRouter: FastifyPluginAsyncTypebox = async function (
  fastify,
  _opts,
) {
  // register routes
  // simulation - list, start, stop etc
  // feed - get etc
  // how to effectively manage the prefix and paths of routes?
  fastify.register(simulationRoutes, { prefix: '/simulation' });
};

export default registerRouter;
