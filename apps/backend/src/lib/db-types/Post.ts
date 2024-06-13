import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const PostPlain = Type.Object(
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
);

export const PostRelations = Type.Object(
  {
    comments: Type.Array(
      Type.Object(
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
      { additionalProperties: false },
    ),
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
    owner: Type.Object(
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
    simulation: Type.Object(
      {
        id: Type.Integer({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        end: Type.Date({ additionalProperties: false }),
        currentTime: Type.Date({ additionalProperties: false }),
        chaos: Type.Integer({ additionalProperties: false }),
        seedPrompt: Type.String({ additionalProperties: false }),
        simulationStatus: Type.Union(
          [
            Type.Literal("CREATED"),
            Type.Literal("QUEUED"),
            Type.Literal("RUNNING"),
            Type.Literal("PAUSED"),
            Type.Literal("FINISHED"),
          ],
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const PostPlainInput = Type.Object(
  {
    created: Type.Date({ additionalProperties: false }),
    content: Type.String({ additionalProperties: false }),
    isRepost: Nullable(Type.Boolean({ additionalProperties: false })),
    repostCount: Nullable(Type.Integer({ additionalProperties: false })),
  },
  { additionalProperties: false },
);

export const PostRelationsInputCreate = Type.Object(
  {
    comments: Type.Optional(
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
    owner: Type.Object(
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
    simulation: Type.Object(
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

export const PostRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      comments: Type.Partial(
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
      owner: Type.Object(
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
      simulation: Type.Object(
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

export const PostWhere = Type.Partial(
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
          isRepost: Type.Boolean({ additionalProperties: false }),
          repostCount: Type.Integer({ additionalProperties: false }),
          ownerId: Type.Integer({ additionalProperties: false }),
          simulationId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "Post" },
  ),
  { additionalProperties: false },
);

export const PostWhereUnique = Type.Recursive(
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
            isRepost: Type.Boolean({ additionalProperties: false }),
            repostCount: Type.Integer({ additionalProperties: false }),
            ownerId: Type.Integer({ additionalProperties: false }),
            simulationId: Type.Integer({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Post" },
);

export const Post = Type.Composite([PostPlain, PostRelations], {
  additionalProperties: false,
});

export const PostInputCreate = Type.Composite(
  [PostPlainInput, PostRelationsInputCreate],
  { additionalProperties: false },
);

export const PostInputUpdate = Type.Composite(
  [PostPlainInput, PostRelationsInputUpdate],
  { additionalProperties: false },
);
