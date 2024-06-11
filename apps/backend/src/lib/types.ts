import { type TSchema, Type } from '@fastify/type-provider-typebox';

const Nullable = <T extends TSchema>(schema: T) =>
  Type.Union([schema, Type.Null()]);

enum ValidationError {
  RESPONSE_VALIDATION_ERROR = 'response_validation_error',
  ERROR_RESPONSE_VALIDATION_ERROR = 'error_response_validation_error',
}

export { Nullable, ValidationError };
