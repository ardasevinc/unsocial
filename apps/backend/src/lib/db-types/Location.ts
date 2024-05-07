import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const LocationPlain = Type.Object({
  id: Type.Integer(),
  created: Type.Date(),
  updated: Type.Date(),
  name: Type.String(),
  country: _Nullable(Type.String()),
  city: _Nullable(Type.String()),
});

export const LocationRelations = Type.Object({
  events: Type.Array(
    Type.Object({
      id: Type.Integer(),
      created: Type.Date(),
      updated: Type.Date(),
      name: Type.String(),
      time: Type.Date(),
      globalImportanceScore: Type.Integer(),
      localImportanceScore: Type.Integer(),
      simulationId: Type.Integer(),
      isGlobal: Type.Boolean(),
      locationId: _Nullable(Type.Integer()),
    }),
  ),
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
      locationId: _Nullable(Type.Integer()),
    }),
  ),
});

export const Location = Type.Composite([LocationPlain, LocationRelations], {
  description: `Composition of LocationPlain, LocationRelations`,
  additionalProperties: false,
});

export const LocationWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([Type.Object({}), Type.Pick(LocationPlain, ["id"])]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([Type.Object({}), Type.Pick(LocationPlain, ["id"])]),
      ),
      ["id"],
    ),
  ]),
]);

export const LocationDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
  name: Type.String(),
  country: Type.Optional(_Nullable(Type.String())),
  city: Type.Optional(_Nullable(Type.String())),
});

export const LocationDataRelations = Type.Object({});

export const LocationData = Type.Composite(
  [LocationDataPlain, LocationDataRelations],
  {
    description: `Composition of LocationDataPlain, LocationDataRelations`,
    additionalProperties: false,
  },
);

export const LocationDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
  name: Type.Optional(Type.String()),
  country: Type.Optional(_Nullable(Type.String())),
  city: Type.Optional(_Nullable(Type.String())),
});

export const LocationDataRelationsOptional = Type.Object({});

export const LocationDataOptional = Type.Composite(
  [LocationDataPlainOptional, LocationDataRelationsOptional],
  {
    description: `Composition of LocationDataPlainOptional, LocationDataRelationsOptional`,
    additionalProperties: false,
  },
);
