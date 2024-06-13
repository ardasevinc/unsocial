import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const ReplyPlain = Type.Object(
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
);

export const ReplyRelations = Type.Object(
  {
    likes: Type.Array(
      Type.Object(
        {
          id: Type.Integer({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          updated: Type.Date({ additionalProperties: false }),
          postId: Type.Integer({ additionalProperties: false }),
          agentId: Type.Integer({ additionalProperties: false }),
          replyId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
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
    author: Type.Object(
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
    generation: Nullable(
      Type.Object(
        {
          id: Type.String({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          model: Type.String({ additionalProperties: false }),
          simulationId: Type.Integer({ additionalProperties: false }),
          postId: Nullable(Type.Integer({ additionalProperties: false })),
          replyId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const ReplyPlainInput = Type.Object(
  {
    created: Type.Date({ additionalProperties: false }),
    content: Type.String({ additionalProperties: false }),
    repostCount: Type.Integer({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const ReplyRelationsInputCreate = Type.Object(
  {
    likes: Type.Optional(
      Type.Object(
        {
          connect: Type.Array(
            Type.Object(
              {
                id: Type.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
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
    author: Type.Object(
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
    generation: Type.Optional(
      Type.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const ReplyRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      likes: Type.Partial(
        Type.Object(
          {
            connect: Type.Array(
              Type.Object(
                {
                  id: Type.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: Type.Array(
              Type.Object(
                {
                  id: Type.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
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
      author: Type.Object(
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
      generation: Type.Partial(
        Type.Object(
          {
            connect: Type.Object(
              {
                id: Type.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: Type.Boolean(),
          },
          { additionalProperties: false },
        ),
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const ReplyWhere = Type.Partial(
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
          content: Type.String({ additionalProperties: false }),
          repostCount: Type.Integer({ additionalProperties: false }),
          postId: Type.Integer({ additionalProperties: false }),
          authorId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "Reply" },
  ),
  { additionalProperties: false },
);

export const ReplyWhereUnique = Type.Recursive(
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
            content: Type.String({ additionalProperties: false }),
            repostCount: Type.Integer({ additionalProperties: false }),
            postId: Type.Integer({ additionalProperties: false }),
            authorId: Type.Integer({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Reply" },
);

export const Reply = Type.Composite([ReplyPlain, ReplyRelations], {
  additionalProperties: false,
});

export const ReplyInputCreate = Type.Composite(
  [ReplyPlainInput, ReplyRelationsInputCreate],
  { additionalProperties: false },
);

export const ReplyInputUpdate = Type.Composite(
  [ReplyPlainInput, ReplyRelationsInputUpdate],
  { additionalProperties: false },
);
