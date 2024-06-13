import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  TSimulationInputParameters,
  TSimulationStopParameters,
} from '@/lib/schemas/simulation.js';

const simulationRoutes: FastifyPluginAsyncTypebox = async function (
  fastify,
  _opts,
) {
  fastify.post(
    '/start',
    {
      schema: {
        body: TSimulationInputParameters,
      },
    },
    async (req, reply) => {
      const { chaos, seedPrompt } = req.body;
      return { received: { chaos, seedPrompt } };
    },
  );

  fastify.post(
    '/stop',
    { schema: { body: TSimulationStopParameters } },
    async (req, reply) => {
      return { received: { stop: req.body.id } };
    },
  );

  fastify.get('/list', async (req, reply) => {
    const simulationList = await fastify.prisma.simulation.findMany();
    return simulationList;
  });
};

export default simulationRoutes;
