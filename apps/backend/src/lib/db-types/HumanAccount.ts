import { Type } from '@sinclair/typebox';

import { _Nullable } from './__nullable__.js';

export const HumanAccountPlain = Type.Object({
  id: Type.String(),
  created: Type.Date(),
  updated: Type.Date(),
  agentId: Type.Integer(),
});

export const HumanAccountRelations = Type.Object({
  sessions: Type.Array(
    Type.Object({
      id: Type.String(),
      accountId: Type.String(),
      expiresAt: Type.Date(),
    }),
  ),
  agent: Type.Object({
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
});

export const HumanAccount = Type.Composite(
  [HumanAccountPlain, HumanAccountRelations],
  {
    description: `Composition of HumanAccountPlain, HumanAccountRelations`,
    additionalProperties: false,
  },
);

export const HumanAccountWhere = Type.Union([
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(HumanAccountPlain, ['id', 'agentId']),
        ]),
      ),
      ['id'],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(HumanAccountPlain, ['id', 'agentId']),
        ]),
      ),
      ['id'],
    ),
  ]),
  Type.Composite([
    Type.Pick(
      Type.Required(
        Type.Composite([
          Type.Object({}),
          Type.Pick(HumanAccountPlain, ['id', 'agentId']),
        ]),
      ),
      ['agentId'],
    ),
    Type.Omit(
      Type.Partial(
        Type.Composite([
          Type.Object({}),
          Type.Pick(HumanAccountPlain, ['id', 'agentId']),
        ]),
      ),
      ['agentId'],
    ),
  ]),
]);

export const HumanAccountDataPlain = Type.Object({
  created: Type.Date(),
  updated: Type.Date(),
});

export const HumanAccountDataRelations = Type.Object({
  agentId: Type.Integer(),
});

export const HumanAccountData = Type.Composite(
  [HumanAccountDataPlain, HumanAccountDataRelations],
  {
    description: `Composition of HumanAccountDataPlain, HumanAccountDataRelations`,
    additionalProperties: false,
  },
);

export const HumanAccountDataPlainOptional = Type.Object({
  created: Type.Optional(Type.Date()),
  updated: Type.Optional(Type.Date()),
});

export const HumanAccountDataRelationsOptional = Type.Object({
  agentId: Type.Optional(Type.Integer()),
});

export const HumanAccountDataOptional = Type.Composite(
  [HumanAccountDataPlainOptional, HumanAccountDataRelationsOptional],
  {
    description: `Composition of HumanAccountDataPlainOptional, HumanAccountDataRelationsOptional`,
    additionalProperties: false,
  },
);
