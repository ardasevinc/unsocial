import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const SimulationPlain = Type.Object(
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
);

export const SimulationRelations = Type.Object(
  {
    generations: Type.Array(
      Type.Object(
        {
          id: Type.String({ additionalProperties: false }),
          created: Type.Date({ additionalProperties: false }),
          model: Type.String({ additionalProperties: false }),
          simulationId: Type.Integer({ additionalProperties: false }),
          postId: Nullable(Type.Integer({ additionalProperties: false })),
          replyId: Type.Integer({ additionalProperties: false }),
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
  },
  { additionalProperties: false },
);

export const SimulationPlainInput = Type.Object(
  {
    created: Type.Date({ additionalProperties: false }),
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
);

export const SimulationRelationsInputCreate = Type.Object(
  {
    generations: Type.Optional(
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
  },
  { additionalProperties: false },
);

export const SimulationRelationsInputUpdate = Type.Partial(
  Type.Object(
    {
      generations: Type.Partial(
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
    },
    { additionalProperties: false },
  ),
  { additionalProperties: false },
);

export const SimulationWhere = Type.Partial(
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
    { $id: "Simulation" },
  ),
  { additionalProperties: false },
);

export const SimulationWhereUnique = Type.Recursive(
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
          }),
          { additionalProperties: false },
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Simulation" },
);

export const Simulation = Type.Composite(
  [SimulationPlain, SimulationRelations],
  { additionalProperties: false },
);

export const SimulationInputCreate = Type.Composite(
  [SimulationPlainInput, SimulationRelationsInputCreate],
  { additionalProperties: false },
);

export const SimulationInputUpdate = Type.Composite(
  [SimulationPlainInput, SimulationRelationsInputUpdate],
  { additionalProperties: false },
);
