import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const ReplyPlain = Type.Object({
  id: Type.Integer(),
  created: Type.Date(),
  updated: Type.Date(),
  content: Type.String(),
  repostCount: Type.Integer(),
  postId: Type.Integer(),
  authorId: Type.Integer(),
});

export const ReplyRelations = Type.Object({
  likes: Type.Array(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      postId: Type.Integer(),
      agentId: Type.Integer(),
      replyId: Type.Integer(),
    }),
  ),
  post: Type.Object({
    id: Type.Integer(),
    created: Type.Date(),
    updated: Type.Date(),
    content: Type.String(),
    isRepost: _Nullable(Type.Boolean()),
    repostCount: _Nullable(Type.Integer()),
    ownerId: Type.Integer(),
    simulationId: Type.Integer(),
  }),
  author: Type.Object({
    id: Type.Integer(),
    created: Type.Date(),
    updated: Type.Date(),
    displayName: Type.String(),
    username: Type.String(),
    timezone: Type.String(),
    prompt: _Nullable(Type.String()),
    engagementProbability: _Nullable(Type.Number()),
    simulationId: Type.Integer(),
    locationId: _Nullable(Type.Integer()),
  }),
  generation: _Nullable(
    Type.Object({
      id: Type.String(),
      created: Type.Date(),
      model: Type.String(),
      postId: _Nullable(Type.Integer()),
      replyId: Type.Integer(),
    }),
  ),
});

export const Reply = Type.Composite([ReplyPlain, ReplyRelations], {
  description: `Composition of ReplyPlain, ReplyRelations`,
  additionalProperties: false,
});

export const ReplyWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([Type.Object({}), Type.Pick(ReplyPlain, ["id"])]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([Type.Object({}), Type.Pick(ReplyPlain, ["id"])]),
      ),
      ["id"],
    ),
  ]),
]);

export const ReplyDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
  content: Type.String(),
  repostCount: Type.Integer(),
});

export const ReplyDataRelations = Type.Object({
  postId: Type.Integer(),
  authorId: Type.Integer(),
});

export const ReplyData = Type.Composite([ReplyDataPlain, ReplyDataRelations], {
  description: `Composition of ReplyDataPlain, ReplyDataRelations`,
  additionalProperties: false,
});

export const ReplyDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
  content: Type.Optional(Type.String()),
  repostCount: Type.Optional(Type.Integer()),
});

export const ReplyDataRelationsOptional = Type.Object({
  postId: Type.Optional(Type.Integer()),
  authorId: Type.Optional(Type.Integer()),
});

export const ReplyDataOptional = Type.Composite(
  [ReplyDataPlainOptional, ReplyDataRelationsOptional],
  {
    description: `Composition of ReplyDataPlainOptional, ReplyDataRelationsOptional`,
    additionalProperties: false,
  },
);
