import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const GenerationPlain = Type.Object(
  {
    id: Type.String({ additionalProperties: false }),
    created: Type.Date({ additionalProperties: false }),
    model: Type.String({ additionalProperties: false }),
    simulationId: Type.Integer({ additionalProperties: false }),
    postId: Nullable(Type.Integer({ additionalProperties: false })),
    replyId: Type.Integer({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const GenerationRelations = Type.Object(
  {
    usage: Nullable(
      Type.Object(
        {
          id: Type.Integer({ additionalProperties: false }),
          completionTokens: Type.Integer({ additionalProperties: false }),
          promptTokens: Type.Integer({ additionalProperties: false }),
          totalTokens: Type.Integer({ additionalProperties: false }),
          totalCost: Type.Number({ additionalProperties: false }),
          generationId: Type.String({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    ),
    simulation: Type.Object(
      {
        id: Type.Integer({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        end: Nullable(Type.Date({ additionalProperties: false })),
        currentTime: Nullable(Type.Date({ additionalProperties: false })),
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
    post: Nullable(
      Type.Object(
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

export const GenerationPlainInput = Type.Object(
  {
    created: Type.Date({ additionalProperties: false }),
    model: Type.String({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const GenerationRelationsInputCreate = Type.Object(
  {
    usage: Type.Optional(
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
    post: Type.Optional(
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

export const GenerationRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      usage: Type.Partial(
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
      post: Type.Partial(
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

export const GenerationWhere = Type.Partial(
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
          id: Type.String({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          model: Type.String({ additionalProperties: false }),
          simulationId: Type.Integer({ additionalProperties: false }),
          postId: Type.Integer({ additionalProperties: false }),
          replyId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "Generation" },
  ),
  { additionalProperties: false },
);

export const GenerationWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.String({ additionalProperties: false }),
              postId: Type.Integer({ additionalProperties: false }),
              replyId: Type.Integer({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.String({ additionalProperties: false }) }),
            Type.Object({
              postId: Type.Integer({ additionalProperties: false }),
            }),
            Type.Object({
              replyId: Type.Integer({ additionalProperties: false }),
            }),
          ],
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
            model: Type.String({ additionalProperties: false }),
            simulationId: Type.Integer({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Generation" },
);

export const Generation = Type.Composite(
  [GenerationPlain, GenerationRelations],
  { additionalProperties: false },
);

export const GenerationInputCreate = Type.Composite(
  [GenerationPlainInput, GenerationRelationsInputCreate],
  { additionalProperties: false },
);

export const GenerationInputUpdate = Type.Composite(
  [GenerationPlainInput, GenerationRelationsInputUpdate],
  { additionalProperties: false },
);
