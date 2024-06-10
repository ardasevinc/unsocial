import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { fastifyEnv, type FastifyEnvOptions } from '@fastify/env';
import prismaPlugin from '@/lib/plugins/prisma.js';
import fastifySensible from '@fastify/sensible';
import fastifyGracefulShutdown from 'fastify-graceful-shutdown';
import { type Env, TEnv } from '@/lib/types.js';
import SimulationRoute from '@/routes/simulation/index.js';

// TODO: Create a configuration loader function page: 26 in fastify book
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

// TODO: Improve server startup and shutdown.
const bootApp = async () => {
  /* Recommended booting order:
   * external plugins
   * our plugins
   * decorators
   * hooks
   * services - routes etc
   */
  try {
    await fastify.register(fastifyEnv, fastifyEnvOptions);
    fastify.log.debug(`MODE: ${fastify.env.NODE_ENV}`);
    await fastify.register(prismaPlugin, { config: {} });
    fastify.register(fastifySensible);
    fastify.register(fastifyGracefulShutdown).after(() => {
      fastify.gracefulShutdown((signal, next) => {
        fastify.log.info('Received signal to shutdown: %s', signal);
        next();
      });
    });
    fastify.register(SimulationRoute);

    fastify.log.debug(`PID: ${process.pid}`);
    await fastify.listen({ host: '0.0.0.0', port: fastify.env.PORT });
  } catch (error) {
    fastify.log.error({ msg: 'Error during server startup', error });
    process.exit(1);
  }
};
bootApp();
