import type { FastifyInstance } from 'fastify';

async function SimulationRoute(fastify: FastifyInstance) {
  fastify.get('/simulation', async () => {
    return 'Unsocial: The LLM Social Network Simulation Experiment\n';
  });
}

export default SimulationRoute;
