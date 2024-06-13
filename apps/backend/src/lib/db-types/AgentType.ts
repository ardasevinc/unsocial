import { Type } from "@sinclair/typebox";

import { Nullable } from "./Nullable";

export const AgentType = Type.Union(
  [Type.Literal("AI"), Type.Literal("HUMAN")],
  { additionalProperties: false },
);
