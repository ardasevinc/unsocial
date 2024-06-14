import { Type } from '@fastify/type-provider-typebox';

export const TSimulationStartBody = Type.Object({
  chaos: Type.Integer(),
  seedPrompt: Type.String({ minLength: 1 }),
});

export const TSimulationSubprocessParams = Type.Object({
  id: Type.Integer(),
  chaos: Type.Integer(),
  seedPrompt: Type.String({ minLength: 1 }),
});

export const TSimulationStopBody = Type.Object({ id: Type.Integer() });

export const TSimulationIdPath = Type.Object({ id: Type.Integer() });
