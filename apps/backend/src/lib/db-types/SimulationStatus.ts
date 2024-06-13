import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const SimulationStatus = Type.Union(
  [
    Type.Literal("CREATED"),
    Type.Literal("QUEUED"),
    Type.Literal("RUNNING"),
    Type.Literal("PAUSED"),
    Type.Literal("FINISHED"),
  ],
  { additionalProperties: false },
);
