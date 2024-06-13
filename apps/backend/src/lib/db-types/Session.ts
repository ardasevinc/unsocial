import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const SessionPlain = Type.Object(
  {
    id: Type.String({ additionalProperties: false }),
    accountId: Type.String({ additionalProperties: false }),
    expiresAt: Type.Date({ additionalProperties: false }),
  },
  { additionalProperties: false },
);

export const SessionRelations = Type.Object(
  {
    account: Type.Object(
      {
        id: Type.String({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        agentId: Type.Integer({ additionalProperties: false }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const SessionPlainInput = Type.Object(
  { expiresAt: Type.Date({ additionalProperties: false }) },
  { additionalProperties: false },
);

export const SessionRelationsInputCreate = Type.Object(
  {
    account: Type.Object(
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

export const SessionRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      account: Type.Object(
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

export const SessionWhere = Type.Partial(
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
          accountId: Type.String({ additionalProperties: false }),
          expiresAt: Type.Date({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "Session" },
  ),
  { additionalProperties: false },
);

export const SessionWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            { id: Type.String({ additionalProperties: false }) },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        Type.Union(
          [Type.Object({ id: Type.String({ additionalProperties: false }) })],
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
            accountId: Type.String({ additionalProperties: false }),
            expiresAt: Type.Date({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Session" },
);

export const Session = Type.Composite([SessionPlain, SessionRelations], {
  additionalProperties: false,
});

export const SessionInputCreate = Type.Composite(
  [SessionPlainInput, SessionRelationsInputCreate],
  { additionalProperties: false },
);

export const SessionInputUpdate = Type.Composite(
  [SessionPlainInput, SessionRelationsInputUpdate],
  { additionalProperties: false },
);
