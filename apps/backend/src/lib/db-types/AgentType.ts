import { Type } from '@sinclair/typebox';

import { _Nullable } from './__nullable__.js';

export const AgentType = Type.Union([
  Type.Literal('AI'),
  Type.Literal('HUMAN'),
]);
