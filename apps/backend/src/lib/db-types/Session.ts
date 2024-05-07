import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const SessionPlain = Type.Object({
  id: Type.String(),
  accountId: Type.String(),
  expiresAt: Type.Date(),
});

export const SessionRelations = Type.Object({
  account: Type.Object({
    id: Type.String(),
    created: Type.Date(),
    updated: Type.Date(),
    agentId: Type.Integer(),
  }),
});

export const Session = Type.Composite([SessionPlain, SessionRelations], {
  description: `Composition of SessionPlain, SessionRelations`,
  additionalProperties: false,
});

export const SessionWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([Type.Object({}), Type.Pick(SessionPlain, ["id"])]),
      ),
      ["id"],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([Type.Object({}), Type.Pick(SessionPlain, ["id"])]),
      ),
      ["id"],
    ),
  ]),
]);

export const SessionDataPlain = Type.Object({ expiresAt: Type.Date() });

export const SessionDataRelations = Type.Object({ accountId: Type.String() });

export const SessionData = Type.Composite(
  [SessionDataPlain, SessionDataRelations],
  {
    description: `Composition of SessionDataPlain, SessionDataRelations`,
    additionalProperties: false,
  },
);

export const SessionDataPlainOptional = Type.Object({
  expiresAt: Type.Optional(Type.Date()),
});

export const SessionDataRelationsOptional = Type.Object({
  accountId: Type.Optional(Type.String()),
});

export const SessionDataOptional = Type.Composite(
  [SessionDataPlainOptional, SessionDataRelationsOptional],
  {
    description: `Composition of SessionDataPlainOptional, SessionDataRelationsOptional`,
    additionalProperties: false,
  },
);
