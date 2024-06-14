import { logger } from '@/lib/modules/logger.js';
import { SubprocessErrors } from '@/lib/types.js';

// remove additional values from the environment not present in the schema

logger.debug('Simulation subprocess starting...');
logger.debug('checking if parent process is available...');
if (!process.send) {
  logger.error('FATAL: No parent process found! Exiting...');
  process.exit(1);
}
// logger.debug('Checking environment variables...');
// if (!Check(TEnv, process.env)) {
//   // this is a subprocess
//   logger.error({
//     msg: 'Environment variables are not valid',
//     env: process.env,
//   });
//   // send message to parent web process
//   process.send({
//     type: 'error',
//     code: SubprocessErrors.ENV_NOT_VALID,
//     message: 'Environment variables are not valid',
//   });

//   process.exit(1);
// }

import { PrismaClient } from '@prisma/client';
import { Check } from '@sinclair/typebox/value';
import { Redis } from 'ioredis';
import { TSimulationSubprocessParams } from '../schemas/simulation.js';
import { Static } from '@sinclair/typebox';

try {
  const simulationParameters = process.argv[2]
    ? JSON.parse(process.argv[2])
    : {};
  if (!Check(TSimulationSubprocessParams, simulationParameters)) {
    logger.error({
      msg: 'Simulation parameters are not valid',
      simulationParameters,
    });
    process.send({
      type: 'error',
      code: SubprocessErrors.INVALID_PARAMETERS,
      message: 'Simulation parameters are not valid',
    });
    process.exit(1);
  }
  const prisma = new PrismaClient();
  const redis = new Redis({
    host: '0.0.0.0',
    password: process.env.REDIS_PASS,
    port: process.env.REDIS_PORT,
  });
  logger.debug('Connection to postgres and redis established');

  async function shutdown() {
    logger.info('Shutting down simulation subprocess...');
    await prisma.$disconnect();
    await redis.quit();
    process.exit(0);
  }

  process.on('SIGTERM', async function () {
    logger.info('subprocess SIGTERM received, terminating simulation...');
    await prisma.$disconnect();
    await redis.quit();

    process.exit(0);
  });

  setInterval(checkSimulationActive, 500);

  async function checkSimulationActive() {
    const activeSimulation = await redis.get('currentSimulation');
    if (activeSimulation) {
      return true;
    } else {
      await shutdown();
    }
  }

  logger.debug({ msg: 'beginning simulation...', simulationParameters });
} catch (error) {
  logger.error({
    msg: 'Error in simulation subprocess',
    error,
  });

  process.send({
    type: 'error',
    code: SubprocessErrors.GENERAL_ERROR,
    message: 'Error in simulation subprocess',
  });
  process.exit(1);
}
