import { type Static, type TSchema, Type } from '@sinclair/typebox';

const TEnv = Type.Object(
  {
    PORT: Type.Number({ default: 3006 }),
    OPENAI_API_KEY: Type.String(),
    ANTHROPIC_API_KEY: Type.String(),
  },
  { additionalProperties: false },
);

type Env = Static<typeof TEnv>;

const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

export { TEnv, Env, Nullable };
