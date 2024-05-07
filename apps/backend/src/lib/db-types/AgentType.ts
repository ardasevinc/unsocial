import { Type } from "@sinclair/typebox";

import { _Nullable } from "./__nullable__";

export const AgentType = Type.Union([
  Type.Literal("AI"),
  Type.Literal("HUMAN"),
]);
