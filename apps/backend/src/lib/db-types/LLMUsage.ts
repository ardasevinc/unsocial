import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const LLMUsagePlain = Type.Object(
  {
    id: Type.Integer({ additionalProperties: false }),
    completionTokens: Type.Integer({ additionalProperties: false }),
    promptTokens: Type.Integer({ additionalProperties: false }),
    totalTokens: Type.Integer({ additionalProperties: false }),
    totalCost: Type.Number({ additionalProperties: false }),
    generationId: Type.String({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const LLMUsageRelations = Type.Object(
  {
    generation: Type.Object(
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
  },
  { additionalProperties: false },
);

export const LLMUsagePlainInput = Type.Object(
  {
    completionTokens: Type.Integer({ additionalProperties: false }),
    promptTokens: Type.Integer({ additionalProperties: false }),
    totalTokens: Type.Integer({ additionalProperties: false }),
    totalCost: Type.Number({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const LLMUsageRelationsInputCreate = Type.Object(
  {
    generation: Type.Object(
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

export const LLMUsageRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      generation: Type.Object(
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

export const LLMUsageWhere = Type.Partial(
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
          completionTokens: Type.Integer({ additionalProperties: false }),
          promptTokens: Type.Integer({ additionalProperties: false }),
          totalTokens: Type.Integer({ additionalProperties: false }),
          totalCost: Type.Number({ additionalProperties: false }),
          generationId: Type.String({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "LLMUsage" },
  ),
  { additionalProperties: false },
);

export const LLMUsageWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer({ additionalProperties: false }),
              generationId: Type.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.Integer({ additionalProperties: false }) }),
            Type.Object({
              generationId: Type.String({ additionalProperties: false }),
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
            completionTokens: Type.Integer({ additionalProperties: false }),
            promptTokens: Type.Integer({ additionalProperties: false }),
            totalTokens: Type.Integer({ additionalProperties: false }),
            totalCost: Type.Number({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "LLMUsage" },
);

export const LLMUsage = Type.Composite([LLMUsagePlain, LLMUsageRelations], {
  additionalProperties: false,
});

export const LLMUsageInputCreate = Type.Composite(
  [LLMUsagePlainInput, LLMUsageRelationsInputCreate],
  { additionalProperties: false },
);

export const LLMUsageInputUpdate = Type.Composite(
  [LLMUsagePlainInput, LLMUsageRelationsInputUpdate],
  { additionalProperties: false },
);
