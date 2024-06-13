import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const SimulationPlain = Type.Object({
  id: Type.Integer(),
  created: Type.Date(),
  updated: Type.Date(),
  end: Type.Date(),
  currentTime: Type.Date(),
  chaos: Type.Integer(),
});

export const SimulationRelations = Type.Object({
  simulationStatus: Type.Union([
    Type.Literal("CREATED"),
    Type.Literal("QUEUED"),
    Type.Literal("RUNNING"),
    Type.Literal("PAUSED"),
    Type.Literal("FINISHED"),
  ]),
  agents: Type.Array(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      displayName: Type.String(),
      username: Type.String(),
      timezone: Type.String(),
      prompt: _Nullable(Type.String()),
      engagementProbability: _Nullable(Type.Number()),
      simulationId: Type.Integer(),
      locationId: _Nullable(Type.Integer()),
    }),
  ),
  posts: Type.Array(
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
  events: Type.Array(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      name: Type.String(),
      time: Type.Date(),
      importanceScore: Type.Integer(),
      simulationId: Type.Integer(),
      locationId: _Nullable(Type.Integer()),
    }),
  ),
});

export const Simulation = Type.Composite(
  [SimulationPlain, SimulationRelations],
  {
    description: `Composition of SimulationPlain, SimulationRelations`,
    additionalProperties: false,
  },
);

export const SimulationWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([Type.Object({}), Type.Pick(SimulationPlain, ["id"])]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([Type.Object({}), Type.Pick(SimulationPlain, ["id"])]),
      ),
      ["id"],
    ),
  ]),
]);

export const SimulationDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
  end: Type.Date(),
  currentTime: Type.Date(),
  chaos: Type.Integer(),
  simulationStatus: Type.Union([
    Type.Literal("CREATED"),
    Type.Literal("QUEUED"),
    Type.Literal("RUNNING"),
    Type.Literal("PAUSED"),
    Type.Literal("FINISHED"),
  ]),
});

export const SimulationDataRelations = Type.Object({});

export const SimulationData = Type.Composite(
  [SimulationDataPlain, SimulationDataRelations],
  {
    description: `Composition of SimulationDataPlain, SimulationDataRelations`,
    additionalProperties: false,
  },
);

export const SimulationDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
  end: Type.Optional(Type.Date()),
  currentTime: Type.Optional(Type.Date()),
  chaos: Type.Optional(Type.Integer()),
  simulationStatus: Type.Optional(
    Type.Union([
      Type.Literal("CREATED"),
      Type.Literal("QUEUED"),
      Type.Literal("RUNNING"),
      Type.Literal("PAUSED"),
      Type.Literal("FINISHED"),
    ]),
  ),
});

export const SimulationDataRelationsOptional = Type.Object({});

export const SimulationDataOptional = Type.Composite(
  [SimulationDataPlainOptional, SimulationDataRelationsOptional],
  {
    description: `Composition of SimulationDataPlainOptional, SimulationDataRelationsOptional`,
    additionalProperties: false,
  },
);
