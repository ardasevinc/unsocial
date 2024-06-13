import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const SimulationEventPlain = Type.Object(
  {
    id: Type.Integer({ additionalProperties: false }),
    created: Type.Date({ additionalProperties: false }),
    updated: Type.Date({ additionalProperties: false }),
    name: Type.String({ additionalProperties: false }),
    type: Type.Union(
      [
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
      ],
      { additionalProperties: false },
    ),
    time: Type.Date({ additionalProperties: false }),
    importanceScore: Type.Integer({ additionalProperties: false }),
    simulationId: Type.Integer({ additionalProperties: false }),
    locationId: Nullable(Type.Integer({ additionalProperties: false })),
  },
  { additionalProperties: false },
);

export const SimulationEventRelations = Type.Object(
  {
    simulation: Type.Object(
      {
        id: Type.Integer({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        end: Type.Date({ additionalProperties: false }),
        currentTime: Type.Date({ additionalProperties: false }),
        chaos: Type.Integer({ additionalProperties: false }),
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
    location: Nullable(
      Type.Object(
        {
          id: Type.Integer({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          updated: Type.Date({ additionalProperties: false }),
          name: Type.String({ additionalProperties: false }),
          country: Nullable(Type.String({ additionalProperties: false })),
          city: Nullable(Type.String({ additionalProperties: false })),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const SimulationEventPlainInput = Type.Object(
  {
    created: Type.Date({ additionalProperties: false }),
    name: Type.String({ additionalProperties: false }),
    type: Type.Union(
      [
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
      ],
      { additionalProperties: false },
    ),
    time: Type.Date({ additionalProperties: false }),
    importanceScore: Type.Integer({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const SimulationEventRelationsInputCreate = Type.Object(
  {
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
    location: Type.Optional(
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

export const SimulationEventRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
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
      location: Type.Partial(
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

export const SimulationEventWhere = Type.Partial(
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
          name: Type.String({ additionalProperties: false }),
          type: Type.Union(
            [
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
            ],
            { additionalProperties: false },
          ),
          time: Type.Date({ additionalProperties: false }),
          importanceScore: Type.Integer({ additionalProperties: false }),
          simulationId: Type.Integer({ additionalProperties: false }),
          locationId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "SimulationEvent" },
  ),
  { additionalProperties: false },
);

export const SimulationEventWhereUnique = Type.Recursive(
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
            name: Type.String({ additionalProperties: false }),
            type: Type.Union(
              [
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
              ],
              { additionalProperties: false },
            ),
            time: Type.Date({ additionalProperties: false }),
            importanceScore: Type.Integer({ additionalProperties: false }),
            simulationId: Type.Integer({ additionalProperties: false }),
            locationId: Type.Integer({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "SimulationEvent" },
);

export const SimulationEvent = Type.Composite(
  [SimulationEventPlain, SimulationEventRelations],
  { additionalProperties: false },
);

export const SimulationEventInputCreate = Type.Composite(
  [SimulationEventPlainInput, SimulationEventRelationsInputCreate],
  { additionalProperties: false },
);

export const SimulationEventInputUpdate = Type.Composite(
  [SimulationEventPlainInput, SimulationEventRelationsInputUpdate],
  { additionalProperties: false },
);
