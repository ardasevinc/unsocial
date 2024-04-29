import { Type } from '@sinclair/typebox';

import { _Nullable } from './__nullable__.js';

export const PostPlain = Type.Object({
  id: Type.Integer(),
  created: Type.Date(),
  updated: Type.Date(),
  content: Type.String(),
  isRepost: Type.Boolean(),
  repostCount: Type.Integer(),
  ownerId: Type.Integer(),
});

export const PostRelations = Type.Object({
  comments: Type.Array(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      content: Type.String(),
      repostCount: Type.Integer(),
      postId: Type.Integer(),
      authorId: Type.Integer(),
    }),
  ),
  likes: Type.Array(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      post_id: Type.Integer(),
      agentId: Type.Integer(),
      replyId: Type.Integer(),
    }),
  ),
  owner: Type.Object({
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
});

export const Post = Type.Composite([PostPlain, PostRelations], {
  description: `Composition of PostPlain, PostRelations`,
  additionalProperties: false,
});

export const PostWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([Type.Object({}), Type.Pick(PostPlain, ['id'])]),
      ),
      ['id'],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([Type.Object({}), Type.Pick(PostPlain, ['id'])]),
      ),
      ['id'],
    ),
  ]),
]);

export const PostDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
  content: Type.String(),
  isRepost: Type.Boolean(),
  repostCount: Type.Integer(),
});

export const PostDataRelations = Type.Object({ ownerId: Type.Integer() });

export const PostData = Type.Composite([PostDataPlain, PostDataRelations], {
  description: `Composition of PostDataPlain, PostDataRelations`,
  additionalProperties: false,
});

export const PostDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
  content: Type.Optional(Type.String()),
  isRepost: Type.Optional(Type.Boolean()),
  repostCount: Type.Optional(Type.Integer()),
});

export const PostDataRelationsOptional = Type.Object({
  ownerId: Type.Optional(Type.Integer()),
});

export const PostDataOptional = Type.Composite(
  [PostDataPlainOptional, PostDataRelationsOptional],
  {
    description: `Composition of PostDataPlainOptional, PostDataRelationsOptional`,
    additionalProperties: false,
  },
);
