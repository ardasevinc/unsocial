import { logger } from './logger.js';
import { Static, Type } from '@sinclair/typebox';
import { TSimulationSubprocessParams } from '../schemas/simulation.js';
import {
  OpenRouter,
  OpenRouterModel,
  OpenRouterError,
} from './llm/open-router.js';
import { Check } from '@sinclair/typebox/value';
import { ValidationError } from '../types.js';

export async function generateAgents({
  chaos,
  seedPrompt,
  id = 1,
}: Static<typeof TSimulationSubprocessParams>) {
  logger.debug({
    msg: 'Generating agents...',
    chaos,
    seedPrompt,
  });
  logger.debug(process.env.DEV_OPENROUTER_API_KEY);
  const openrouter = new OpenRouter({
    apiKey: process.env.DEV_OPENROUTER_API_KEY as string,
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  });

  const TAgents = Type.Array(
    Type.Object({ name: Type.String(), prompt: Type.String() }),
  );

  const seedPromptAgentGeneration = `<description> You're in control of a social network simulation. The simulation simulates Twitter and its users. You can define agents which will act on the simulation. Agents can be people, bots, or organizations. They can have different characteristics, such as political affiliation, interests, and behaviors. You can define the agents' characteristics and behaviors by providing a prompt. </description> 

  <simulation_input_description>
  The Simulation has two inputs: the seed prompt and the chaos level. The seed prompt is a prompt that starts the simulation. You will use the seed prompt define the state the simulation and the characteristics of the agents.
  
  The chaos level is a positive integer from 1 to 100 that determines the level of randomness in the simulation. The higher the chaos level, the more random chaotic and funnier everything gets.
  </simulation_input_description>
  
  Here are the given simulation inputs
  <simulation_input>
  <seed_prompt>${seedPrompt}</seed_prompt>
  <chaos_level>${chaos}</chaos_level>
  </simulation_input>

  <agent_generation_description>
  1. Choose the number of agents you want to generate. The number of agents should be a positive integer from 5 to 15. You can choose this depending on the context.
  2. Define the characteristics of the agents. You can define the agents' political affiliation, interests, and behaviors. You can also define the agents' relationships with other agents. Agents could be historical figures or fictional characters. Make them funny and intriguing.
  3. Write a prompt that describes the agents' characteristics and behaviors. The prompt should be a short text that describes the agents' characteristics and behaviors. The prompt should be clear and concise. Please remember that agents are supposed to write posts.
  </agent_generation_description>

  With this info generate the agents and using the JSON format given below, return the agents generated.
  <agent_generation_format>
  Return a JSON Array of Agent Objects. Each Agent Object should have the following properties:
  - name: The name of the agent. The name should be a string.
  - prompt: The prompt that describes the agent's characteristics and behaviors. The prompt should be a string.

  example:
  [
    {
      "name": "John Doe",
      "prompt": "This agent is a bot that likes to post about politics and sports. The agent is very active on social media and has a lot of followers."
    },
    {
      "name": "Clark Maxwell",
      "prompt": "This agent is a human who is interested in science and technology. The agent is a scientist and likes to post about new discoveries and inventions in the field of electromagnetic theory."
    }
  ]
  </agent_generation_format>
  `;
  try {
    const response = await openrouter.generate({
      messages: [{ role: 'user', content: seedPromptAgentGeneration }],
      temperature: 0.7,
      maxTokens: 4000,
      model: OpenRouterModel.CLAUDE3_HAIKU,
      responseFormat: { type: 'json_object' },
    });
    const parsed = JSON.parse(response.choices[0]);
    if (Check(TAgents, parsed)) {
      return parsed;
    } else {
      throw new OpenRouterError(
        ValidationError.RESPONSE_VALIDATION_ERROR,
        'Response validation error: JSON format validation failed',
      );
    }
  } catch (error) {
    if (error instanceof OpenRouterError) {
      logger.error({
        msg: 'OpenRouter Error: Failed to generate agents',
        error: error.message,
      });
    } else {
      logger.error({
        msg: 'Unknown Error',
        error,
      });
    }
  }
}

await generateAgents({
  chaos: 50,
  seedPrompt: 'hello pals hows it going? #sunnyDayinNevada',
});
