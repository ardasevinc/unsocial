import { PrismaClient } from '@prisma/client';
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export type PrismaPluginOptions = {
  config: ConstructorParameters<typeof PrismaClient>[0];
};

const PrismaPlugin: FastifyPluginAsync<PrismaPluginOptions> = async (
  fastify,
  opts,
) => {
  if (!fastify.hasDecorator('prisma')) {
    const prisma = new PrismaClient(opts.config);
    await prisma.$connect();

    fastify.decorate('prisma', prisma);

    fastify.addHook('onClose', async (app) => {
      await app.prisma.$disconnect();
    });
  } else {
    throw new Error('A `prisma` plugin have already been registered.');
  }
};

export default fp<PrismaPluginOptions>(PrismaPlugin, {
  name: 'fastify-prisma',
  fastify: '4.x',
});
