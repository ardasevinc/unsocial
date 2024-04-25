import { Static, Type } from '@sinclair/typebox';

const EnvSchema = Type.Object(
  {
    PORT: Type.Number({ default: 3006 }),
    OPENAI_API_KEY: Type.String(),
    ANTHROPIC_API_KEY: Type.String(),
  },
  { additionalProperties: false },
);

type Env = Static<typeof EnvSchema>;

export { EnvSchema, Env };
