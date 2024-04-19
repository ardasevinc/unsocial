import Fastify from 'fastify';
import SimulationRoute from './routes/simulation.js';
const fastify = Fastify({
  logger: true,
});

fastify.register(SimulationRoute);

const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 3006 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
