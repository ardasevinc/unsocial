import { type Static, type TSchema, Type } from '@sinclair/typebox';

const TEnv = Type.Object(
  {
    PORT: Type.Number({ default: 3006 }),
    DEV_OPENAI_API_KEY: Type.String(),
    DEV_ANTHROPIC_API_KEY: Type.String(),
    DEV_OPENROUTER_API_KEY: Type.String(),
  },
  { additionalProperties: false },
);

type Env = Static<typeof TEnv>;

const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

enum ValidationError {
  RESPONSE_VALIDATION_ERROR = 'response_validation_error',
  ERROR_RESPONSE_VALIDATION_ERROR = 'error_response_validation_error',
}

export { TEnv, type Env, Nullable, ValidationError };
