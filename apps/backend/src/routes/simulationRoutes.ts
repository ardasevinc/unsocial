import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  TSimulationIdPath,
  TSimulationStartBody,
  TSimulationStopBody,
} from '@/lib/schemas/simulation.js';

const simulationRoutes: FastifyPluginAsyncTypebox = async function (
  fastify,
  _opts,
) {
  fastify.post(
    '/start',
    {
      schema: {
        body: TSimulationStartBody,
      },
    },
    async function (req, reply) {
      const { chaos, seedPrompt } = req.body;
      return { received: { chaos, seedPrompt } };
    },
  );

  fastify.post(
    '/stop',
    { schema: { body: TSimulationStopBody } },
    async function (req, reply) {
      return {
        received: { stop: req.body.id },
        message: 'stopped all running simulations',
      };
    },
  );

  fastify.post(
    '/stop/:id',
    { schema: { params: TSimulationIdPath } },
    async function (req, reply) {
      const { id } = req.params;
      return `Stopping simulation with id ${id}`;
    },
  );

  fastify.get('/list', async function (req, reply) {
    const simulationList = await fastify.prisma.simulation.findMany();
    return simulationList;
  });

  // fastify.get('/:id/stats', {}, async function)
};

export default simulationRoutes;
