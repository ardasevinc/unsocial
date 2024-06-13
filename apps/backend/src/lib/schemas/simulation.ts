import { Type } from '@fastify/type-provider-typebox';

export const TSimulationInputParameters = Type.Object({
  chaos: Type.Integer(),
  seedPrompt: Type.String({ minLength: 1 }),
});

export const TSimulationStopParameters = Type.Object({ id: Type.Integer() });
