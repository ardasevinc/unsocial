import { LLMProvider } from './base-provider.js';

enum OpenRouterModels {
  LLAMA3_8B = 'meta-llama/llama-3-8b-instruct',
  MISTRAL_7B = 'mistralai/mistral-7b-instruct',
  MIXTRAL_8X7B_NITRO = 'mistralai/mixtral-8x7b-instruct:nitro',
  LLAMA3_70B = 'meta-llama/llama-3-70b-instruct',
  MIXTRAL_8x7B = 'mistralai/mixtral-8x7b-instruct',
  MYTHOMAX_13B = 'gryphe/mythomax-l2-13b:nitro',
  CLAUDE3_HAIKU = 'anthropic/claude-3-haiku',
  WIZARDLM2_8x22B = 'microsoft/wizardlm-2-8x22b',
  SOLILOQUY_8B = 'lynn/soliloquy-l3',
}

class OpenRouter extends LLMProvider {}

export { OpenRouter, OpenRouterModels };
