import { Type } from '@sinclair/typebox';

import { _Nullable } from './__nullable__.js';

export const EventType = Type.Union([
  Type.Literal('POLITICAL'),
  Type.Literal('ECONOMIC'),
  Type.Literal('SOCIAL'),
  Type.Literal('TECHNOLOGICAL'),
  Type.Literal('ENVIRONMENTAL'),
  Type.Literal('ENTERTAINMENT'),
  Type.Literal('LEGAL'),
  Type.Literal('GLOBAL'),
  Type.Literal('SPORTS'),
  Type.Literal('SCIENCE'),
]);
