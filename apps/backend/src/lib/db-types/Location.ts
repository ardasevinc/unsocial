import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const LocationPlain = Type.Object(
  {
    id: Type.Integer({ additionalProperties: false }),
    created: Type.Date({ additionalProperties: false }),
    updated: Type.Date({ additionalProperties: false }),
    name: Type.String({ additionalProperties: false }),
    country: Nullable(Type.String({ additionalProperties: false })),
    city: Nullable(Type.String({ additionalProperties: false })),
  },
  { additionalProperties: false },
);

export const LocationRelations = Type.Object(
  {
    events: Type.Array(
      Type.Object(
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
      ),
      { additionalProperties: false },
    ),
    agents: Type.Array(
      Type.Object(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const LocationPlainInput = Type.Object(
  {
    created: Type.Date({ additionalProperties: false }),
    name: Type.String({ additionalProperties: false }),
    country: Nullable(Type.String({ additionalProperties: false })),
    city: Nullable(Type.String({ additionalProperties: false })),
  },
  { additionalProperties: false },
);

export const LocationRelationsInputCreate = Type.Object(
  {
    events: Type.Optional(
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
    agents: Type.Optional(
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
  },
  { additionalProperties: false },
);

export const LocationRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      events: Type.Partial(
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
      agents: Type.Partial(
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
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const LocationWhere = Type.Partial(
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
          country: Type.String({ additionalProperties: false }),
          city: Type.String({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "Location" },
  ),
  { additionalProperties: false },
);

export const LocationWhereUnique = Type.Recursive(
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
            country: Type.String({ additionalProperties: false }),
            city: Type.String({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Location" },
);

export const Location = Type.Composite([LocationPlain, LocationRelations], {
  additionalProperties: false,
});

export const LocationInputCreate = Type.Composite(
  [LocationPlainInput, LocationRelationsInputCreate],
  { additionalProperties: false },
);

export const LocationInputUpdate = Type.Composite(
  [LocationPlainInput, LocationRelationsInputUpdate],
  { additionalProperties: false },
);
