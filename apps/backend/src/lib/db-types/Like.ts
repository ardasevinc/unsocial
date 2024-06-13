import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const LikePlain = Type.Object(
  {
    id: Type.Integer({ additionalProperties: false }),
    created: Type.Date({ additionalProperties: false }),
    updated: Type.Date({ additionalProperties: false }),
    postId: Type.Integer({ additionalProperties: false }),
    agentId: Type.Integer({ additionalProperties: false }),
    replyId: Type.Integer({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const LikeRelations = Type.Object(
  {
    post: Type.Object(
      {
        id: Type.Integer({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        content: Type.String({ additionalProperties: false }),
        isRepost: Nullable(Type.Boolean({ additionalProperties: false })),
        repostCount: Nullable(Type.Integer({ additionalProperties: false })),
        ownerId: Type.Integer({ additionalProperties: false }),
        simulationId: Type.Integer({ additionalProperties: false }),
      },
      { additionalProperties: false },
    ),
    agent: Type.Object(
      {
        id: Type.Integer({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        type: Type.Union([Type.Literal("AI"), Type.Literal("HUMAN")], {
          additionalProperties: false,
        }),
        displayName: Type.String({ additionalProperties: false }),
        username: Type.String({ additionalProperties: false }),
        timezone: Type.String({ additionalProperties: false }),
        prompt: Nullable(Type.String({ additionalProperties: false })),
        engagementProbability: Nullable(
          Type.Number({ additionalProperties: false }),
        ),
        simulationId: Type.Integer({ additionalProperties: false }),
        locationId: Nullable(Type.Integer({ additionalProperties: false })),
      },
      { additionalProperties: false },
    ),
    reply: Type.Object(
      {
        id: Type.Integer({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        content: Type.String({ additionalProperties: false }),
        repostCount: Type.Integer({ additionalProperties: false }),
        postId: Type.Integer({ additionalProperties: false }),
        authorId: Type.Integer({ additionalProperties: false }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const LikePlainInput = Type.Object(
  { created: Type.Date({ additionalProperties: false }) },
  { additionalProperties: false },
);

export const LikeRelationsInputCreate = Type.Object(
  {
    post: Type.Object(
      {
        connect: Type.Object(
          {
            id: Type.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    agent: Type.Object(
      {
        connect: Type.Object(
          {
            id: Type.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    reply: Type.Object(
      {
        connect: Type.Object(
          {
            id: Type.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const LikeRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      post: Type.Object(
        {
          connect: Type.Object(
            {
              id: Type.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      agent: Type.Object(
        {
          connect: Type.Object(
            {
              id: Type.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      reply: Type.Object(
        {
          connect: Type.Object(
            {
              id: Type.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const LikeWhere = Type.Partial(
  Type.Recursive(
    (Self) =>
      Type.Object(
        {
          AND: Type.Union([
            Self,
            Type.Array(Self, { additionalProperties: false }),
          ]),
          NOT: Type.Union([
            Self,
            Type.Array(Self, { additionalProperties: false }),
          ]),
          OR: Type.Array(Self, { additionalProperties: false }),
          id: Type.Integer({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          updated: Type.Date({ additionalProperties: false }),
          postId: Type.Integer({ additionalProperties: false }),
          agentId: Type.Integer({ additionalProperties: false }),
          replyId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "Like" },
  ),
  { additionalProperties: false },
);

export const LikeWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            { id: Type.Integer({ additionalProperties: false }) },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        Type.Union(
          [Type.Object({ id: Type.Integer({ additionalProperties: false }) })],
          { additionalProperties: false },
        ),
        Type.Partial(
          Type.Object({
            AND: Type.Union([
              Self,
              Type.Array(Self, { additionalProperties: false }),
            ]),
            NOT: Type.Union([
              Self,
              Type.Array(Self, { additionalProperties: false }),
            ]),
            OR: Type.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        Type.Partial(
          Type.Object({
            created: Type.Date({ additionalProperties: false }),
            updated: Type.Date({ additionalProperties: false }),
            postId: Type.Integer({ additionalProperties: false }),
            agentId: Type.Integer({ additionalProperties: false }),
            replyId: Type.Integer({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Like" },
);

export const Like = Type.Composite([LikePlain, LikeRelations], {
  additionalProperties: false,
});

export const LikeInputCreate = Type.Composite(
  [LikePlainInput, LikeRelationsInputCreate],
  { additionalProperties: false },
);

export const LikeInputUpdate = Type.Composite(
  [LikePlainInput, LikeRelationsInputUpdate],
  { additionalProperties: false },
);
