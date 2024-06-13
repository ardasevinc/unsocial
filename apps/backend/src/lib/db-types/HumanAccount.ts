import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const HumanAccountPlain = Type.Object(
  {
    id: Type.String({ additionalProperties: false }),
    created: Type.Date({ additionalProperties: false }),
    updated: Type.Date({ additionalProperties: false }),
    agentId: Type.Integer({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const HumanAccountRelations = Type.Object(
  {
    sessions: Type.Array(
      Type.Object(
        {
          id: Type.String({ additionalProperties: false }),
          accountId: Type.String({ additionalProperties: false }),
          expiresAt: Type.Date({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    agent: Type.Object(
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
  },
  { additionalProperties: false },
);

export const HumanAccountPlainInput = Type.Object(
  { created: Type.Date({ additionalProperties: false }) },
  { additionalProperties: false },
);

export const HumanAccountRelationsInputCreate = Type.Object(
  {
    sessions: Type.Optional(
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
    agent: Type.Object(
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

export const HumanAccountRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      sessions: Type.Partial(
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
      agent: Type.Object(
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

export const HumanAccountWhere = Type.Partial(
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
          updated: Type.Date({ additionalProperties: false }),
          agentId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "HumanAccount" },
  ),
  { additionalProperties: false },
);

export const HumanAccountWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.String({ additionalProperties: false }),
              agentId: Type.Integer({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.String({ additionalProperties: false }) }),
            Type.Object({
              agentId: Type.Integer({ additionalProperties: false }),
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
            updated: Type.Date({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "HumanAccount" },
);

export const HumanAccount = Type.Composite(
  [HumanAccountPlain, HumanAccountRelations],
  { additionalProperties: false },
);

export const HumanAccountInputCreate = Type.Composite(
  [HumanAccountPlainInput, HumanAccountRelationsInputCreate],
  { additionalProperties: false },
);

export const HumanAccountInputUpdate = Type.Composite(
  [HumanAccountPlainInput, HumanAccountRelationsInputUpdate],
  { additionalProperties: false },
);
