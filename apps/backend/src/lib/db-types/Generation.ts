import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const GenerationPlain = Type.Object({
  id: Type.String(),
  created: Type.Date(),
  model: Type.String(),
  postId: _Nullable(Type.Integer()),
  replyId: Type.Integer(),
});

export const GenerationRelations = Type.Object({
  usage: _Nullable(
    Type.Object({
      id: Type.Integer(),
      completionTokens: Type.Integer(),
      promptTokens: Type.Integer(),
      totalTokens: Type.Integer(),
      totalCost: Type.Number(),
      generationId: Type.String(),
    }),
  ),
  post: _Nullable(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      content: Type.String(),
      isRepost: _Nullable(Type.Boolean()),
      repostCount: _Nullable(Type.Integer()),
      ownerId: Type.Integer(),
      simulationId: Type.Integer(),
    }),
  ),
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

export const Generation = Type.Composite(
  [GenerationPlain, GenerationRelations],
  {
    description: `Composition of GenerationPlain, GenerationRelations`,
    additionalProperties: false,
  },
);

export const GenerationWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(GenerationPlain, ["id", "postId", "replyId"]),
        ]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(GenerationPlain, ["id", "postId", "replyId"]),
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
          Type.Pick(GenerationPlain, ["id", "postId", "replyId"]),
        ]),
      ),
      ["postId"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(GenerationPlain, ["id", "postId", "replyId"]),
        ]),
      ),
      ["postId"],
    ),
  ]),
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(GenerationPlain, ["id", "postId", "replyId"]),
        ]),
      ),
      ["replyId"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(GenerationPlain, ["id", "postId", "replyId"]),
        ]),
      ),
      ["replyId"],
    ),
  ]),
]);

export const GenerationDataPlain = Type.Object({
  created: Type.Date(),
  model: Type.String(),
});

export const GenerationDataRelations = Type.Object({
  postId: Type.Optional(_Nullable(Type.Integer())),
  replyId: Type.Integer(),
});

export const GenerationData = Type.Composite(
  [GenerationDataPlain, GenerationDataRelations],
  {
    description: `Composition of GenerationDataPlain, GenerationDataRelations`,
    additionalProperties: false,
  },
);

export const GenerationDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  model: Type.Optional(Type.String()),
});

export const GenerationDataRelationsOptional = Type.Object({
  postId: Type.Optional(_Nullable(Type.Integer())),
  replyId: Type.Optional(Type.Integer()),
});

export const GenerationDataOptional = Type.Composite(
  [GenerationDataPlainOptional, GenerationDataRelationsOptional],
  {
    description: `Composition of GenerationDataPlainOptional, GenerationDataRelationsOptional`,
    additionalProperties: false,
  },
);
