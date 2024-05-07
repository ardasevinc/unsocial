import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const LLMUsagePlain = Type.Object({
  id: Type.Integer(),
  completionTokens: Type.Integer(),
  promptTokens: Type.Integer(),
  totalTokens: Type.Integer(),
  totalCost: Type.Number(),
  generationId: Type.String(),
});

export const LLMUsageRelations = Type.Object({
  generation: Type.Object({
    id: Type.String(),
    created: Type.Date(),
    model: Type.String(),
    postId: _Nullable(Type.Integer()),
    replyId: Type.Integer(),
  }),
});

export const LLMUsage = Type.Composite([LLMUsagePlain, LLMUsageRelations], {
  description: `Composition of LLMUsagePlain, LLMUsageRelations`,
  additionalProperties: false,
});

export const LLMUsageWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(LLMUsagePlain, ["id", "generationId"]),
        ]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(LLMUsagePlain, ["id", "generationId"]),
        ]),
      ),
      ["id"],
    ),
  ]),
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(LLMUsagePlain, ["id", "generationId"]),
        ]),
      ),
      ["generationId"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(LLMUsagePlain, ["id", "generationId"]),
        ]),
      ),
      ["generationId"],
    ),
  ]),
]);

export const LLMUsageDataPlain = Type.Object({
  completionTokens: Type.Integer(),
  promptTokens: Type.Integer(),
  totalTokens: Type.Integer(),
  totalCost: Type.Number(),
});

export const LLMUsageDataRelations = Type.Object({
  generationId: Type.String(),
});

export const LLMUsageData = Type.Composite(
  [LLMUsageDataPlain, LLMUsageDataRelations],
  {
    description: `Composition of LLMUsageDataPlain, LLMUsageDataRelations`,
    additionalProperties: false,
  },
);

export const LLMUsageDataPlainOptional = Type.Object({
  completionTokens: Type.Optional(Type.Integer()),
  promptTokens: Type.Optional(Type.Integer()),
  totalTokens: Type.Optional(Type.Integer()),
  totalCost: Type.Optional(Type.Number()),
});

export const LLMUsageDataRelationsOptional = Type.Object({
  generationId: Type.Optional(Type.String()),
});

export const LLMUsageDataOptional = Type.Composite(
  [LLMUsageDataPlainOptional, LLMUsageDataRelationsOptional],
  {
    description: `Composition of LLMUsageDataPlainOptional, LLMUsageDataRelationsOptional`,
    additionalProperties: false,
  },
);
