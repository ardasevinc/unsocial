import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const SimulationEventPlain = Type.Object({
  id: Type.Integer(),
  created: Type.Date(),
  updated: Type.Date(),
  name: Type.String(),
  time: Type.Date(),
  importanceScore: Type.Integer(),
  simulationId: Type.Integer(),
  locationId: _Nullable(Type.Integer()),
});

export const SimulationEventRelations = Type.Object({
  type: Type.Union([
    Type.Literal("POLITICAL"),
    Type.Literal("ECONOMIC"),
    Type.Literal("SOCIAL"),
    Type.Literal("TECHNOLOGICAL"),
    Type.Literal("ENVIRONMENTAL"),
    Type.Literal("ENTERTAINMENT"),
    Type.Literal("LEGAL"),
    Type.Literal("GLOBAL"),
    Type.Literal("SPORTS"),
    Type.Literal("SCIENCE"),
  ]),
  simulation: Type.Object({
    id: Type.Integer(),
    created: Type.Date(),
    updated: Type.Date(),
    end: Type.Date(),
    currentTime: Type.Date(),
    chaos: Type.Integer(),
  }),
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

export const SimulationEvent = Type.Composite(
  [SimulationEventPlain, SimulationEventRelations],
  {
    description: `Composition of SimulationEventPlain, SimulationEventRelations`,
    additionalProperties: false,
  },
);

export const SimulationEventWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(SimulationEventPlain, ["id"]),
        ]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(SimulationEventPlain, ["id"]),
        ]),
      ),
      ["id"],
    ),
  ]),
]);

export const SimulationEventDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
  name: Type.String(),
  type: Type.Union([
    Type.Literal("POLITICAL"),
    Type.Literal("ECONOMIC"),
    Type.Literal("SOCIAL"),
    Type.Literal("TECHNOLOGICAL"),
    Type.Literal("ENVIRONMENTAL"),
    Type.Literal("ENTERTAINMENT"),
    Type.Literal("LEGAL"),
    Type.Literal("GLOBAL"),
    Type.Literal("SPORTS"),
    Type.Literal("SCIENCE"),
  ]),
  time: Type.Date(),
  importanceScore: Type.Integer(),
});

export const SimulationEventDataRelations = Type.Object({
  simulationId: Type.Integer(),
  locationId: Type.Optional(_Nullable(Type.Integer())),
});

export const SimulationEventData = Type.Composite(
  [SimulationEventDataPlain, SimulationEventDataRelations],
  {
    description: `Composition of SimulationEventDataPlain, SimulationEventDataRelations`,
    additionalProperties: false,
  },
);

export const SimulationEventDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
  name: Type.Optional(Type.String()),
  type: Type.Optional(
    Type.Union([
      Type.Literal("POLITICAL"),
      Type.Literal("ECONOMIC"),
      Type.Literal("SOCIAL"),
      Type.Literal("TECHNOLOGICAL"),
      Type.Literal("ENVIRONMENTAL"),
      Type.Literal("ENTERTAINMENT"),
      Type.Literal("LEGAL"),
      Type.Literal("GLOBAL"),
      Type.Literal("SPORTS"),
      Type.Literal("SCIENCE"),
    ]),
  ),
  time: Type.Optional(Type.Date()),
  importanceScore: Type.Optional(Type.Integer()),
});

export const SimulationEventDataRelationsOptional = Type.Object({
  simulationId: Type.Optional(Type.Integer()),
  locationId: Type.Optional(_Nullable(Type.Integer())),
});

export const SimulationEventDataOptional = Type.Composite(
  [SimulationEventDataPlainOptional, SimulationEventDataRelationsOptional],
  {
    description: `Composition of SimulationEventDataPlainOptional, SimulationEventDataRelationsOptional`,
    additionalProperties: false,
  },
);
