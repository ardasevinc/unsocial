import { Type } from '@sinclair/typebox';

import { _Nullable } from './__nullable__.js';

export const LikePlain = Type.Object({
  id: Type.Integer(),
  created: Type.Date(),
  updated: Type.Date(),
  post_id: Type.Integer(),
  agentId: Type.Integer(),
  replyId: Type.Integer(),
});

export const LikeRelations = Type.Object({
  post: Type.Object({
    id: Type.Integer(),
    created: Type.Date(),
    updated: Type.Date(),
    content: Type.String(),
    isRepost: Type.Boolean(),
    repostCount: Type.Integer(),
    ownerId: Type.Integer(),
  }),
  agent: Type.Object({
    id: Type.Integer(),
    created: Type.Date(),
    updated: Type.Date(),
    displayName: Type.String(),
    username: Type.String(),
    timezone: Type.String(),
    prompt: _Nullable(Type.String()),
    engagementProbability: _Nullable(Type.Number()),
    locationId: _Nullable(Type.Integer()),
  }),
  reply: Type.Object({
    id: Type.Integer(),
    created: Type.Date(),
    updated: Type.Date(),
    content: Type.String(),
    repostCount: Type.Integer(),
    postId: Type.Integer(),
    authorId: Type.Integer(),
  }),
});

export const Like = Type.Composite([LikePlain, LikeRelations], {
  description: `Composition of LikePlain, LikeRelations`,
  additionalProperties: false,
});

export const LikeWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([Type.Object({}), Type.Pick(LikePlain, ['id'])]),
      ),
      ['id'],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([Type.Object({}), Type.Pick(LikePlain, ['id'])]),
      ),
      ['id'],
    ),
  ]),
]);

export const LikeDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
  post_id: Type.Integer(),
});

export const LikeDataRelations = Type.Object({
  agentId: Type.Integer(),
  replyId: Type.Integer(),
});

export const LikeData = Type.Composite([LikeDataPlain, LikeDataRelations], {
  description: `Composition of LikeDataPlain, LikeDataRelations`,
  additionalProperties: false,
});

export const LikeDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
  post_id: Type.Optional(Type.Integer()),
});

export const LikeDataRelationsOptional = Type.Object({
  agentId: Type.Optional(Type.Integer()),
  replyId: Type.Optional(Type.Integer()),
});

export const LikeDataOptional = Type.Composite(
  [LikeDataPlainOptional, LikeDataRelationsOptional],
  {
    description: `Composition of LikeDataPlainOptional, LikeDataRelationsOptional`,
    additionalProperties: false,
  },
);
