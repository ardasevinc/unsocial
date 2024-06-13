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
    '/:id/stop',
    { schema: { params: TSimulationIdPath } },
    async function (req, reply) {
      const { id } = req.params;
      return `Stopping simulation with id ${id}`;
    },
  );

  fastify.delete(
    '/:id/remove',
    { schema: { params: TSimulationIdPath } },
    async function (req, reply) {
      const { id } = req.params;
      return `Removing simulation with id ${id}`;
    },
  );

  fastify.get('/list', async function (req, reply) {
    const simulationList = await fastify.prisma.simulation.findMany();
    return simulationList;
  });

  fastify.get(
    '/:id/stats',
    { schema: { params: TSimulationIdPath } },
    async function (req, reply) {
      const { id } = req.params;
      return `Stats for simulation with id ${id}`;
    },
  );

  fastify.get(
    '/:id/debug',
    { schema: { params: TSimulationIdPath } },
    async function (req, reply) {
      const { id } = req.params;
      return `DEBUG INFO for simulation with id ${id}`;
    },
  );
};

export default simulationRoutes;
