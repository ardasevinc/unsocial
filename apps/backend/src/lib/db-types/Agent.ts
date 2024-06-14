import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const AgentPlain = Type.Object(
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
);

export const AgentRelations = Type.Object(
  {
    simulation: Type.Object(
      {
        id: Type.Integer({ additionalProperties: false }),
        created: Type.Date({ additionalProperties: false }),
        updated: Type.Date({ additionalProperties: false }),
        end: Nullable(Type.Date({ additionalProperties: false })),
        currentTime: Nullable(Type.Date({ additionalProperties: false })),
        chaos: Type.Integer({ additionalProperties: false }),
        seedPrompt: Type.String({ additionalProperties: false }),
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
    posts: Type.Array(
      Type.Object(
        {
          id: Type.Integer({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          updated: Type.Date({ additionalProperties: false }),
          content: Type.String({ additionalProperties: false }),
          isRepost: Nullable(Type.Boolean({ additionalProperties: false })),
          repostCount: Nullable(Type.Integer({ additionalProperties: false })),
          ownerId: Type.Integer({ additionalProperties: false }),
          simulationId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    replies: Type.Array(
      Type.Object(
        {
          id: Type.Integer({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          updated: Type.Date({ additionalProperties: false }),
          content: Type.String({ additionalProperties: false }),
          repostCount: Type.Integer({ additionalProperties: false }),
          postId: Type.Integer({ additionalProperties: false }),
          authorId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    likes: Type.Array(
      Type.Object(
        {
          id: Type.Integer({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          updated: Type.Date({ additionalProperties: false }),
          postId: Type.Integer({ additionalProperties: false }),
          agentId: Type.Integer({ additionalProperties: false }),
          replyId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    account: Nullable(
      Type.Object(
        {
          id: Type.String({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          updated: Type.Date({ additionalProperties: false }),
          agentId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
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

export const AgentPlainInput = Type.Object(
  {
    created: Type.Date({ additionalProperties: false }),
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
  },
  { additionalProperties: false },
);

export const AgentRelationsInputCreate = Type.Object(
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
    posts: Type.Optional(
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
    replies: Type.Optional(
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
    likes: Type.Optional(
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
    account: Type.Optional(
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

export const AgentRelationsInputUpdate = Type.Partial(
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
      posts: Type.Partial(
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
      replies: Type.Partial(
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
      likes: Type.Partial(
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
      account: Type.Partial(
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

export const AgentWhere = Type.Partial(
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
          type: Type.Union([Type.Literal("AI"), Type.Literal("HUMAN")], {
            additionalProperties: false,
          }),
          displayName: Type.String({ additionalProperties: false }),
          username: Type.String({ additionalProperties: false }),
          timezone: Type.String({ additionalProperties: false }),
          prompt: Type.String({ additionalProperties: false }),
          engagementProbability: Type.Number({ additionalProperties: false }),
          simulationId: Type.Integer({ additionalProperties: false }),
          locationId: Type.Integer({ additionalProperties: false }),
        },
        { additionalProperties: false },
      ),
    { $id: "Agent" },
  ),
  { additionalProperties: false },
);

export const AgentWhereUnique = Type.Recursive(
  (Self) =>
    Type.Intersect(
      [
        Type.Partial(
          Type.Object(
            {
              id: Type.Integer({ additionalProperties: false }),
              username: Type.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        Type.Union(
          [
            Type.Object({ id: Type.Integer({ additionalProperties: false }) }),
            Type.Object({
              username: Type.String({ additionalProperties: false }),
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
            type: Type.Union([Type.Literal("AI"), Type.Literal("HUMAN")], {
              additionalProperties: false,
            }),
            displayName: Type.String({ additionalProperties: false }),
            timezone: Type.String({ additionalProperties: false }),
            prompt: Type.String({ additionalProperties: false }),
            engagementProbability: Type.Number({ additionalProperties: false }),
            simulationId: Type.Integer({ additionalProperties: false }),
            locationId: Type.Integer({ additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Agent" },
);

export const Agent = Type.Composite([AgentPlain, AgentRelations], {
  additionalProperties: false,
});

export const AgentInputCreate = Type.Composite(
  [AgentPlainInput, AgentRelationsInputCreate],
  { additionalProperties: false },
);

export const AgentInputUpdate = Type.Composite(
  [AgentPlainInput, AgentRelationsInputUpdate],
  { additionalProperties: false },
);
