import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__.js";

export const AgentPlain = Type.Object({
  id: Type.Integer(),
  created: Type.Date(),
  updated: Type.Date(),
  displayName: Type.String(),
  username: Type.String(),
  timezone: Type.String(),
  prompt: _Nullable(Type.String()),
  engagementProbability: _Nullable(Type.Number()),
  locationId: _Nullable(Type.Integer()),
});

export const AgentRelations = Type.Object({
  type: Type.Union([Type.Literal("AI"), Type.Literal("HUMAN")]),
  followedBy: Type.Array(
    Type.Object({
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
  ),
  following: Type.Array(
    Type.Object({
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
  ),
  posts: Type.Array(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      content: Type.String(),
      isRepost: Type.Boolean(),
      repostCount: Type.Integer(),
      ownerId: Type.Integer(),
    }),
  ),
  replies: Type.Array(
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
      postId: Type.Integer(),
      agentId: Type.Integer(),
      replyId: Type.Integer(),
    }),
  ),
  account: _Nullable(
    Type.Object({
      id: Type.String(),
      created: Type.Date(),
      updated: Type.Date(),
      agentId: Type.Integer(),
    }),
  ),
  location: _Nullable(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      name: Type.String(),
      country: _Nullable(Type.String()),
      city: _Nullable(Type.String()),
    }),
  ),
});

export const Agent = Type.Composite([AgentPlain, AgentRelations], {
  description: `Composition of AgentPlain, AgentRelations`,
  additionalProperties: false,
});

export const AgentWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(AgentPlain, ["id", "username"]),
        ]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(AgentPlain, ["id", "username"]),
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
          Type.Pick(AgentPlain, ["id", "username"]),
        ]),
      ),
      ["username"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(AgentPlain, ["id", "username"]),
        ]),
      ),
      ["username"],
    ),
  ]),
]);

export const AgentDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
  type: Type.Union([Type.Literal("AI"), Type.Literal("HUMAN")]),
  displayName: Type.String(),
  username: Type.String(),
  timezone: Type.String(),
  prompt: Type.Optional(_Nullable(Type.String())),
  engagementProbability: Type.Optional(_Nullable(Type.Number())),
});

export const AgentDataRelations = Type.Object({
  locationId: Type.Optional(_Nullable(Type.Integer())),
});

export const AgentData = Type.Composite([AgentDataPlain, AgentDataRelations], {
  description: `Composition of AgentDataPlain, AgentDataRelations`,
  additionalProperties: false,
});

export const AgentDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
  type: Type.Optional(Type.Union([Type.Literal("AI"), Type.Literal("HUMAN")])),
  displayName: Type.Optional(Type.String()),
  username: Type.Optional(Type.String()),
  timezone: Type.Optional(Type.String()),
  prompt: Type.Optional(_Nullable(Type.String())),
  engagementProbability: Type.Optional(_Nullable(Type.Number())),
});

export const AgentDataRelationsOptional = Type.Object({
  locationId: Type.Optional(_Nullable(Type.Integer())),
});

export const AgentDataOptional = Type.Composite(
  [AgentDataPlainOptional, AgentDataRelationsOptional],
  {
    description: `Composition of AgentDataPlainOptional, AgentDataRelationsOptional`,
    additionalProperties: false,
  },
);
