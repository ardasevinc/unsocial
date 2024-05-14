import { Type, Static } from '@sinclair/typebox';
import { LLMProvider, LLMProviderConfig } from './base-provider.js';
import { Nullable, ValidationError } from '@/lib/types.js';
import { Check } from '@sinclair/typebox/value';

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
  GPT4o = 'openai/gpt-4o',
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

const TOpenRouterTool = Type.Object({
  type: Type.Literal('function'),
  function: Type.Object({
    description: Type.Optional(Type.String()),
    name: Type.String(),
    parameters: Type.Any(),
  }),
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
  tools: Type.Optional(Type.Array(TOpenRouterTool)),
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
  logitBias: Type.Optional(Type.Record(Type.Number(), Type.Number())),
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

enum OpenRouterApiError {
  BAD_REQUEST_ERROR = 400,
  INVALID_CREDENTIALS_ERROR = 401,
  INSUFFICIENT_CREDITS_ERROR = 402,
  MODERATION_FLAGGED_ERROR = 403,
  REQUEST_TIMED_OUT_ERROR = 408,
  RATE_LIMIT_ERROR = 429,
  MODEL_ERROR = 502,
  PROVIDER_ROUTING_ERROR = 503,
}

class OpenRouterError extends Error {
  readonly type;
  constructor(
    type: OpenRouterApiError | ValidationError,
    ...params: Array<string>
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OpenRouterError);
    }
    this.name = 'OpenRouterError';
    this.type = type;
  }
}

class OpenRouter extends LLMProvider<
  typeof OpenRouterModel,
  Static<typeof TOpenRouterGenerationParameters>,
  Static<typeof TOpenRouterResponse>
> {
  readonly models = OpenRouterModel;
  private _tools: Map<string, Static<typeof TOpenRouterTool>> = new Map();

  get tools() {
    return this._tools;
  }

  set tools(value) {
    this._tools = value;
  }

  constructor({ apiKey, endpoint }: LLMProviderConfig) {
    super({ apiKey, endpoint });
  }

  async generate({
    messages,
    model,
    prompt,
    responseFormat,
    stop,
    stream,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    repetitionPenalty,
    seed,
    tools,
    toolChoice,
    logitBias,
    transforms,
    models,
    route,
    provider,
  }: Static<typeof TOpenRouterGenerationParameters>) {
    const endpoint = new URL(this.config.endpoint);
    const headers = new Headers();
    headers.set('HTTP-Referer', 'https://x.com/ardasevinc_4');
    headers.set('X-Title', 'Unsocial Development');
    headers.set('Content-Type', 'application/json');

    const body = JSON.stringify({
      messages,
      prompt: messages ? undefined : prompt,
      model,
      response_format: responseFormat,
      stop,
      stream,
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      top_k: topK,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      repetition_penalty: repetitionPenalty,
      seed,
      tools,
      tool_choice: toolChoice,
      logit_bias: logitBias,
      transforms,
      models,
      route,
      provider,
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const isOpenRouterErrorResponse = Check(
        TOpenRouterErrorResponse,
        responseData,
      );

      if (isOpenRouterErrorResponse) {
        const { error } = responseData;
        throw new OpenRouterError(error.code);
      } else {
        throw new OpenRouterError(
          ValidationError.ERROR_RESPONSE_VALIDATION_ERROR,
          `Error Response Validation Failed. statusCode: ${response.status}, statusText: ${response.statusText}`,
        );
      }
    } else if (Check(TOpenRouterResponse, responseData)) {
      return responseData;
    } else {
      throw new OpenRouterError(
        ValidationError.RESPONSE_VALIDATION_ERROR,
        `Response Validation Failed statusCode: ${response.status}, statusText: ${response.statusText}`,
      );
    }
  }
}

export { OpenRouter, OpenRouterModel };
