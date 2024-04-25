import type { FastifyInstance } from 'fastify';
import start from './start.js';
import list from './list.js';

async function SimulationRoute(fastify: FastifyInstance) {
  fastify.get('/simulation', async () => {
    return 'Unsocial: The LLM Social Network Simulation Experiment\n';
  });

  fastify.post('/simulation/start', start.opts, start.handler);

  fastify.get('/simulation/list', {}, async (request, reply) => {
    const simulations = await fastify.prisma.simulation.findMany();
    if (simulations.length === 0) {
      reply.status(404);
      return {
        error: true,
        message: 'no simulation records found',
      };
    }

    return simulations;
  });

  fastify.post('/simulation/delete', {}, async (request, reply) => {
    const simulationId = request.body?.id;

    try {
      const deletedSimulation = await fastify.prisma.simulation.delete({
        where: { id: simulationId },
      });
      if (deletedSimulation) {
        return { error: false, deleted: deletedSimulation };
      } else {
        return { error: false, deleted: null };
      }
    } catch (error) {
      request.log.error(
        `Simulation record with id: ${simulationId} not found.`,
      );
      reply.status(404);
      return { error: true, message: JSON.stringify(error, null, 2) };
    }
  });
}

export default SimulationRoute;
