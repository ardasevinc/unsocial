import {
  FastifyPluginAsyncTypebox,
  Type,
  Static,
} from '@fastify/type-provider-typebox';

// define schema
const SimulationStartSchema = Type.Object({
  id: Type.String(),
});
type SimulationStartType = Static<typeof SimulationStartSchema>;

const simulationRoutes: FastifyPluginAsyncTypebox = async function (
  fastify,
  _opts,
) {
  fastify.post<{ Body: SimulationStartType }>(
    '/start',
    {
      schema: {
        body: SimulationStartSchema,
      },
    },
    async (req, reply) => {
      const { id } = req.body;
      // start simulation logic
      reply.send({ message: `simulation ${id} started` });
    },
  );

  fastify.post('/stop', async (req, reply) => {
    // stop simulation logic
    reply.send({ message: 'simulation stopped' });
  });

  fastify.get('/list', async (req, reply) => {
    // list simulations logic
    reply.send({ simulations: [] });
  });
};

export default simulationRoutes;
