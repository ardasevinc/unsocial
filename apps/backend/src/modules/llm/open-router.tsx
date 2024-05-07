import { Type } from '@sinclair/typebox';
import { LLMProvider } from './base-provider.js';

enum OpenRouterModel {
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

const TOpenRouterMessages = null;

const TOpenRouterResponse = null;

const TOpenRouterErrorResponse = Type.Readonly(
  Type.Object({
    error: Type.Object({
      code: Type.Integer(),
      message: Type.String(),
      metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    }),
  }),
);

enum OpenRouterError {
  BAD_REQUEST_ERROR = 400,
  INVALID_CREDENTIALS_ERROR = 401,
  INSUFFICIENT_CREDITS_ERROR = 402,
  MODERATION_FLAGGED_ERROR = 403,
  REQUEST_TIMED_OUT_ERROR = 408,
  RATE_LIMIT_ERROR = 429,
  MODEL_ERROR = 502,
  PROVIDER_ROUTING_ERROR = 503,
}

const TOpenRouterGenerationParameters = null;

class OpenRouter extends LLMProvider {}

export { OpenRouter, OpenRouterModel as OpenRouterModels };
