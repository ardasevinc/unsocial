import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const SimulationStatus = Type.Union([
  Type.Literal("CREATED"),
  Type.Literal("QUEUED"),
  Type.Literal("RUNNING"),
  Type.Literal("PAUSED"),
  Type.Literal("FINISHED"),
]);
