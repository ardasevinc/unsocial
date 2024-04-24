import Fastify from 'fastify';
import { fastifyEnv, type FastifyEnvOptions } from '@fastify/env';
import prismaPlugin from '@/lib/plugins/prisma.js';
import { JSONSchemaType } from 'env-schema';
import type { Env } from '@/lib/types.js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import SimulationRoute from '@/routes/simulation/index.js';

const fastify = Fastify({
  logger: true,
});

declare module 'fastify' {
  interface FastifyInstance {
    config: Env;
  }
}

const isProduction = process.env.NODE_ENV === 'production';
const envSchema: JSONSchemaType<Env> = JSON.parse(
  await readFile(
    `${path.resolve(
      process.cwd(),
      isProduction ? 'dist' : 'src',
      'config',
      'env-schema.json',
    )}`,
    'utf-8',
  ),
);

const options = {
  schema: envSchema,
  dotenv: true,
} satisfies FastifyEnvOptions;

await fastify.register(fastifyEnv, options);
await fastify.register(prismaPlugin, { config: {} });
fastify.register(SimulationRoute);

const app = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: fastify.config.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
app();
