import { Static, Type } from '@fastify/type-provider-typebox';

const TEnv = Type.Object(
  {
    PORT: Type.Number({ default: 3006 }),
    NODE_ENV: Type.Union([
      Type.Literal('production'),
      Type.Literal('development'),
      Type.Literal('test'),
    ]),
    REDIS_PASS: Type.Readonly(Type.String()),
    REDIS_PORT: Type.Readonly(Type.Integer()),
    DEV_OPENAI_API_KEY: Type.String(),
    DEV_ANTHROPIC_API_KEY: Type.String(),
    DEV_OPENROUTER_API_KEY: Type.String(),
  },
  { additionalProperties: false, $id: 'schema:env' },
);

type Env = Static<typeof TEnv>;

export { TEnv, type Env };
