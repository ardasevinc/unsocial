import { Type, Static } from '@sinclair/typebox';
import { LLMProvider } from './base-provider.js';
import { Nullable } from '@/lib/types.js';

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

const TChatRole = Type.Union([
  Type.Literal('user'),
  Type.Literal('assistant'),
  Type.Literal('system'),
  Type.Literal('tool'),
]);

const TContentPart = Type.Union([
  Type.Object({ type: Type.Literal('text'), text: Type.String() }),
  Type.Object({
    type: Type.Literal('image_url'),
    image_url: Type.Object({
      url: Type.String(),
      detail: Type.Optional(Type.String()),
    }),
  }),
]);

const TOpenRouterMessage = Type.Object({
  role: TChatRole,
  content: Type.Union([Type.String(), Type.Array(TContentPart)]),
  name: Type.Optional(Type.String()),
});

const TOpenRouterGenerationParameters = Type.Object({
  messages: Type.Array(TOpenRouterMessage),
  prompt: Type.Optional(Type.String()),
  model: Type.Enum(OpenRouterModel),
  responseFormat: Type.Optional(
    Type.Object({ type: Type.Literal('json_object') }),
  ),
  stop: Type.Optional(Type.Union([Type.String(), Type.Array(Type.String())])),
  stream: Type.Optional(Type.Boolean()),
  maxTokens: Type.Optional(Type.Integer()),
  temperature: Type.Optional(Type.Number({ minimum: 0, maximum: 2 })),
  topP: Type.Optional(Type.Number({ exclusiveMinimum: 0, maximum: 1 })),
  topK: Type.Optional(
    Type.Number({
      minimum: 1,
      exclusiveMaximum: Infinity,
      description: 'not available for OpenAI',
    }),
  ),
  frequencyPenalty: Type.Optional(Type.Number({ minimum: -2, maximum: 2 })),
  presencePenalty: Type.Optional(Type.Number({ minimum: -2, maximum: 2 })),
  repetitionPenalty: Type.Optional(
    Type.Number({ exclusiveMinimum: 0, maximum: 2 }),
  ),
  seed: Type.Optional(Type.Integer({ description: 'only for OpenAI' })),
  tools: Type.Optional(
    Type.Array(
      Type.Object({
        type: Type.Literal('function'),
        function: Type.Object({
          description: Type.Optional(Type.String()),
          name: Type.String(),
          parameters: Type.Any(),
        }),
      }),
    ),
  ),
  toolChoice: Type.Optional(
    Type.Union([
      Type.Literal('none'),
      Type.Literal('auto'),
      Type.Object({
        type: Type.Literal('function'),
        function: Type.Object({ name: Type.String() }),
      }),
    ]),
  ),
  logit_bias: Type.Optional(Type.Record(Type.Number(), Type.Number())),
  transforms: Type.Optional(Type.Array(Type.String())),
  models: Type.Optional(Type.Array(Type.Enum(OpenRouterModel))),
  route: Type.Optional(Type.Literal('fallback')),
  provider: Type.Optional(
    Type.Object({
      order: Type.Array(Type.String()),
      require_parameters: Type.Boolean(),
    }),
  ),
});

const TNonChatChoice = Type.Object({
  finish_reason: Nullable(Type.String()),
  text: Type.String(),
});

const TFunctionCall = Type.Object({
  name: Type.String(),
  arguments: Type.String({ description: 'json format arguments' }),
});

const TToolCall = Type.Object({
  id: Type.String(),
  type: Type.Literal('function'),
  function: TFunctionCall,
});

const TStreamingChoice = Type.Object({
  finish_reason: Nullable(Type.String()),
  delta: Type.Object({
    content: Nullable(Type.String()),
    role: Type.Optional(Type.String()),
    tool_calls: Type.Optional(Type.Array(TToolCall)),
    function_call: Type.Optional(TFunctionCall),
  }),
});

const TNonStreamingChoice = Type.Object({
  finish_reason: Nullable(Type.String()),
  message: Type.Object({
    content: Nullable(Type.String()),
    role: TChatRole,
    tool_calls: Type.Optional(Type.Array(TToolCall)),
    function_call: Type.Optional(TFunctionCall),
  }),
});

const TOpenRouterErrorResponse = Type.Readonly(
  Type.Object({
    error: Type.Object({
      code: Type.Integer(),
      message: Type.String(),
      metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    }),
  }),
);

const TOpenRouterResponse = Type.Readonly(
  Type.Object({
    id: Type.String(),
    model: Type.String(),
    created: Type.Number({ description: 'unix timestamp' }),
    object: Type.Union([
      Type.Literal('chat.completion'),
      Type.Literal('chat.completion.chunk'),
    ]),
    choices: Type.Union([
      Type.Array(TNonStreamingChoice),
      Type.Array(TStreamingChoice),
      Type.Array(TNonChatChoice),
      Type.Array(Type.Index(TOpenRouterErrorResponse, ['error'])),
    ]),
    usage: Type.Optional(
      Type.Object({
        prompt_tokens: Type.Integer(),
        completion_tokens: Type.Integer(),
        total_tokens: Type.Integer(),
        total_cost: Type.Number(),
      }),
    ),
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

class OpenRouter extends LLMProvider {}

export { OpenRouter, OpenRouterModel };
