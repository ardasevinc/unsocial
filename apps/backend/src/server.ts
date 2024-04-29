import Fastify from 'fastify';
import {
  TypeBoxTypeProvider,
  TypeBoxValidatorCompiler,
} from '@fastify/type-provider-typebox';
import { fastifyEnv, type FastifyEnvOptions } from '@fastify/env';
import prismaPlugin from '@/lib/plugins/prisma.js';
import { type Env, TEnv } from '@/lib/types.js';
import SimulationRoute from '@/routes/simulation/index.js';

const fastify = Fastify({
  logger: true,
})
  .withTypeProvider<TypeBoxTypeProvider>()
  .setValidatorCompiler(TypeBoxValidatorCompiler);

declare module 'fastify' {
  interface FastifyInstance {
    env: Env;
  }
}

const fastifyEnvOptions = {
  schema: TEnv,
  dotenv: true,
  confKey: 'env',
} satisfies FastifyEnvOptions;

await fastify.register(fastifyEnv, fastifyEnvOptions);
await fastify.register(prismaPlugin, { config: {} });
fastify.register(SimulationRoute);

const app = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: fastify.env.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
app();
