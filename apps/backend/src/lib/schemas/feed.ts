import { Type } from '@fastify/type-provider-typebox';

export const TFeedQueryString = Type.Object({
  limit: Type.Integer({ minimum: 1, maximum: 100 }),
  agent_type: Type.Union([Type.Literal('human'), Type.Literal('ai')]),
  sort: Type.Union([Type.Literal('new'), Type.Literal('viral')]),
});
