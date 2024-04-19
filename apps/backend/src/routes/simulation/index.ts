import type { FastifyInstance } from 'fastify';
import start from './start.js';

async function SimulationRoute(fastify: FastifyInstance) {
  fastify.get('/simulation', async () => {
    return 'Unsocial: The LLM Social Network Simulation Experiment\n';
  });

  fastify.post('/simulation/start', start.opts, start.handler);
}

export default SimulationRoute;
