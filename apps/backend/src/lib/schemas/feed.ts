import { Type } from '@fastify/type-provider-typebox';

export const TFeedQueryString = Type.Object({
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 10 })),
  agent_type: Type.Optional(
    Type.Union([Type.Literal('human'), Type.Literal('ai')]),
  ),
  sort: Type.Optional(Type.Union([Type.Literal('new'), Type.Literal('viral')])),
});
