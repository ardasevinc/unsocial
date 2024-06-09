import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { fastifyEnv, type FastifyEnvOptions } from '@fastify/env';
import prismaPlugin from '@/lib/plugins/prisma.js';
import { type Env, TEnv } from '@/lib/types.js';
import SimulationRoute from '@/routes/simulation/index.js';

const envToLogger: Record<Env['NODE_ENV'], any> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: 'debug',
  },
  production: true,
  test: false,
};

const nodeEnv = process.env.NODE_ENV as Env['NODE_ENV'];

const fastify = Fastify({
  logger: envToLogger[nodeEnv] ?? true,
}).withTypeProvider<TypeBoxTypeProvider>();

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

const app = async () => {
  try {
    await fastify.register(fastifyEnv, fastifyEnvOptions);
    fastify.log.debug(`MODE: ${fastify.env.NODE_ENV}`);
    await fastify.register(prismaPlugin, { config: {} });
    fastify.register(SimulationRoute);

    await fastify.listen({ host: '0.0.0.0', port: fastify.env.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
app();
